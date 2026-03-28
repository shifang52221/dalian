import type { APIRoute } from "astro";
import { getPocketBaseUrl } from "../../../../../lib/pocketbase";

function buildUpstreamFileUrl(
  collection: string,
  recordId: string,
  filename: string,
) {
  const baseUrl = getPocketBaseUrl().replace(/\/+$/u, "");
  return `${baseUrl}/api/files/${encodeURIComponent(collection)}/${encodeURIComponent(recordId)}/${encodeURIComponent(filename)}`;
}

export const GET: APIRoute = async ({ params }) => {
  const collection = String(params.collection ?? "").trim();
  const recordId = String(params.recordId ?? "").trim();
  const filename = String(params.filename ?? "").trim();

  if (!collection || !recordId || !filename) {
    return new Response("Not Found", { status: 404 });
  }

  const upstream = await fetch(buildUpstreamFileUrl(collection, recordId, filename));

  if (!upstream.ok) {
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      },
    });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("Content-Type");
  const cacheControl = upstream.headers.get("Cache-Control");
  const contentLength = upstream.headers.get("Content-Length");
  const etag = upstream.headers.get("ETag");
  const lastModified = upstream.headers.get("Last-Modified");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }
  if (cacheControl) {
    headers.set("Cache-Control", cacheControl);
  }
  if (contentLength) {
    headers.set("Content-Length", contentLength);
  }
  if (etag) {
    headers.set("ETag", etag);
  }
  if (lastModified) {
    headers.set("Last-Modified", lastModified);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
};
