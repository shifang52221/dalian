import type { APIRoute } from "astro";
import { ZodError } from "zod";
import { submitContactMessage } from "../../actions/contact";
import { getPocketBaseMessageWriter } from "../../lib/pocketbase";
import { contactSchema } from "../../lib/validation/contact";

const messages = {
  zh: {
    success: "留言已提交，我们会尽快与您联系。",
    error: "提交失败，请稍后重试。",
  },
  ja: {
    success: "お問い合わせを受け付けました。追ってご連絡いたします。",
    error: "送信に失敗しました。しばらくしてから再度お試しください。",
  },
  en: {
    success: "Your inquiry has been submitted. We will contact you soon.",
    error: "Submission failed. Please try again later.",
  },
} as const;

type ContactLocale = keyof typeof messages;

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;
const rateLimitStore = new Map<string, number[]>();

function buildJsonResponse(
  body: Record<string, unknown>,
  status: number,
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function getRequestedLocale(formData: FormData): ContactLocale {
  const requestedLocale = formData.get("locale");
  return requestedLocale === "ja" || requestedLocale === "en" ? requestedLocale : "zh";
}

async function getSubmissionData(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType.includes("application/json")) {
    const payload = await request.json().catch(() => ({}));
    const formData = new FormData();

    if (payload && typeof payload === "object") {
      for (const [key, value] of Object.entries(payload)) {
        formData.set(key, typeof value === "string" ? value : String(value ?? ""));
      }
    }

    return formData;
  }

  return request.formData();
}

function getClientAddress(request: Request) {
  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) {
    return realIp.trim();
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const entries = forwardedFor
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
    const last = entries.at(-1);

    if (last) {
      return last;
    }
  }

  const userAgent = request.headers.get("user-agent")?.trim();
  return userAgent ? `ua:${userAgent.slice(0, 120)}` : "unknown";
}

function isAllowedOrigin(request: Request) {
  const requestOrigin = new URL(request.url).origin;
  const originHeader = request.headers.get("origin")?.trim();

  if (originHeader) {
    return originHeader === requestOrigin;
  }

  const refererHeader = request.headers.get("referer")?.trim();
  if (!refererHeader) {
    return true;
  }

  try {
    return new URL(refererHeader).origin === requestOrigin;
  } catch {
    return false;
  }
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const key = getClientAddress(request);
  const recentEntries = (rateLimitStore.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentEntries.length >= RATE_LIMIT_MAX_SUBMISSIONS) {
    rateLimitStore.set(key, recentEntries);
    return true;
  }

  recentEntries.push(now);
  rateLimitStore.set(key, recentEntries);
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  let locale: ContactLocale = "zh";

  try {
    const formData = await getSubmissionData(request);
    locale = getRequestedLocale(formData);

    if (!isAllowedOrigin(request)) {
      return buildJsonResponse(
        {
          ok: false,
          message: messages[locale].error,
        },
        403,
      );
    }

    if (String(formData.get("website") ?? "").trim()) {
      return buildJsonResponse(
        {
          ok: false,
          message: messages[locale].error,
        },
        400,
      );
    }

    if (isRateLimited(request)) {
      return buildJsonResponse(
        {
          ok: false,
          message: messages[locale].error,
        },
        429,
      );
    }

    const parsed = contactSchema.parse({
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      locale: formData.get("locale"),
      message: formData.get("message"),
    });

    try {
      const messageWriter = await getPocketBaseMessageWriter();
      await submitContactMessage(messageWriter, parsed);
    } catch {
      return buildJsonResponse(
        {
          ok: false,
          message: messages[locale].error,
        },
        500,
      );
    }

    return buildJsonResponse(
      {
        ok: true,
        message: messages[parsed.locale].success,
      },
      200,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return buildJsonResponse(
        {
          ok: false,
          message: messages[locale].error,
        },
        400,
      );
    }

    return buildJsonResponse(
      {
        ok: false,
        message: messages[locale].error,
      },
      500,
    );
  }
};
