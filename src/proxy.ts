import { NextResponse } from "next/server";

export default function proxy() {
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    "default-src 'self'",
    // In dev, React needs eval() for error overlays and debugging
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://media.licdn.com https://lh3.googleusercontent.com",
    "font-src 'self'",
    "connect-src 'self' https://api.linkedin.com https://huggingface.co",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "frame-ancestors 'none'",
  ].join("; ");

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
