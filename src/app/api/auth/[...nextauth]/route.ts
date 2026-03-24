import { handlers } from "@/auth";

// next-auth v5 handlers — cast to satisfy Next.js 16 strict route type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = handlers.GET as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = handlers.POST as any;
