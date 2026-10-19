import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { db } from "../../../../lib/db";
const schema = z.object({ email: z.email().max(254), password: z.string().min(12).max(128) });
export async function POST(req: Request) {
  const input = schema.safeParse(await req.json().catch(() => null));
  if (!input.success) return NextResponse.json({ error: "Invalid registration" }, { status: 400 });
  const email = input.data.email.toLowerCase();
  const passwordHash = await hash(input.data.password, 12);
  try {
    await db.user.create({ data: { email, passwordHash, role: "BUYER" } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Registration failed" }, { status: 409 });
  }
}
