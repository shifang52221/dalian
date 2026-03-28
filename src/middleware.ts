import { defineMiddleware } from "astro:middleware";

const securityHeaders = {
  "content-security-policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://api.map.baidu.com https://map.baidu.com https://www.amap.com",
    "font-src 'self' data:",
    "connect-src 'self'",
  ].join("; "),
  "permissions-policy": "geolocation=(), camera=(), microphone=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
  "x-frame-options": "SAMEORIGIN",
} as const;

function withUtf8Charset(contentType: string | null) {
  if (!contentType) {
    return null;
  }

  if (/;\s*charset=/i.test(contentType)) {
    return contentType;
  }

  if (contentType === "text/html" || contentType === "application/json") {
    return `${contentType}; charset=utf-8`;
  }

  return contentType;
}

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  const contentType = response.headers.get("content-type");
  const normalized = withUtf8Charset(contentType);

  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(securityHeaders)) {
    headers.set(name, value);
  }

  if (normalized && normalized !== contentType) {
    headers.set("content-type", normalized);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
});
