import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
const key = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters");
  return new TextEncoder().encode(secret);
};
export async function issueSession(userId: string) {
  return new SignJWT({}).setProtectedHeader({ alg: "HS256" }).setSubject(userId).setIssuedAt().setExpirationTime("12h").sign(key());
}
export async function currentUser() {
  const token = (await cookies()).get("th_session")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    if (!payload.sub) return null;
    return await db.user.findUnique({ where: { id: payload.sub }, select: { id: true, email: true, role: true } });
  } catch { return null; }
}
export async function requireAdmin() {
  const user = await currentUser();
  if (user?.role !== "ADMIN") throw new Error("Forbidden");
  return user;
}
export async function requireStoreOwner(storeId: string) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  const store = await db.store.findUnique({ where: { id: storeId }, select: { ownerId: true } });
  if (!store || (store.ownerId !== user.id && user.role !== "ADMIN")) throw new Error("Forbidden");
  return user;
}
