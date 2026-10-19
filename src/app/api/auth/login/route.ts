import { NextResponse } from "next/server";
import { z } from "zod";
import { compare } from "bcryptjs";
import { db } from "../../../../lib/db";
import { issueSession } from "../../../../lib/auth";
const schema = z.object({ email: z.email(), password: z.string() });
export async function POST(req: Request) {
  const input = schema.safeParse(await req.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const user = await db.user.findUnique({ where: { email: input.data.email.toLowerCase() } });
  if (!user || !(await compare(input.data.password, user.passwordHash)))
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("th_session", await issueSession(user.id), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 43200
  });
  return response;
}
