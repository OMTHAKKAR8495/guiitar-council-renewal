import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { STUDENT_ACHIEVEMENTS, INCUBATED_STARTUPS_GALLERY } from "./lib/data";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function applySecurityHeaders(res: Response): Response {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "SAMEORIGIN");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
  );
  res.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  return res;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Backend API endpoint: serve student achievements and incubated startups
      if (url.pathname === "/api/gallery" || url.pathname === "/api/gallery/") {
        const payload = JSON.stringify({
          status: "success",
          timestamp: Date.now(),
          achievements: STUDENT_ACHIEVEMENTS,
          incubated: INCUBATED_STARTUPS_GALLERY,
        });
        const res = new Response(payload, {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          },
        });
        return applySecurityHeaders(res);
      }

      if (url.pathname === "/api/gallery/achievements") {
        const payload = JSON.stringify({
          status: "success",
          timestamp: Date.now(),
          items: STUDENT_ACHIEVEMENTS,
        });
        const res = new Response(payload, {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            "Access-Control-Allow-Origin": "*",
          },
        });
        return applySecurityHeaders(res);
      }

      if (url.pathname === "/api/gallery/incubated") {
        const payload = JSON.stringify({
          status: "success",
          timestamp: Date.now(),
          items: INCUBATED_STARTUPS_GALLERY,
        });
        const res = new Response(payload, {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
            "Access-Control-Allow-Origin": "*",
          },
        });
        return applySecurityHeaders(res);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return applySecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      const errRes = new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
      return applySecurityHeaders(errRes);
    }
  },
};
