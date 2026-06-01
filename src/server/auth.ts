// Server-only authentication: static admin password + encrypted session cookie.
// The password is a plain static value (ADMIN_PASSWORD, default "111111") and is
// checked WITHOUT any database access, so login works regardless of D1.
import { useSession } from "@tanstack/react-start/server";
import { getEnv } from "./env";

const SESSION_NAME = "jgb_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours
const DEFAULT_PASSWORD = "111111";

interface SessionData {
  authenticated?: boolean;
}

function sessionPassword(): string {
  const secret = getEnv().SESSION_SECRET || "jgb-dev-fallback-secret-please-set-SESSION_SECRET";
  // SessionConfig requires a key of at least 32 chars.
  return secret.length >= 32 ? secret : secret.padEnd(32, "_jgbrasio_session_padding_value_");
}

function sessionConfig() {
  return {
    password: sessionPassword(),
    name: SESSION_NAME,
    maxAge: SESSION_MAX_AGE,
    cookie: {
      httpOnly: true,
      secure: true, // accepted on http://localhost (treated as a secure context)
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await useSession<SessionData>(sessionConfig());
  return session.data.authenticated === true;
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw Object.assign(new Error("Não autorizado."), { statusCode: 401 });
  }
}

export async function startSession(): Promise<void> {
  const session = await useSession<SessionData>(sessionConfig());
  await session.update({ authenticated: true });
}

export async function endSession(): Promise<void> {
  const session = await useSession<SessionData>(sessionConfig());
  await session.clear();
}

// Static password check — no database. Compares against ADMIN_PASSWORD
// (default "111111") in constant time.
export function checkPassword(password: string): boolean {
  const expected = getEnv().ADMIN_PASSWORD || DEFAULT_PASSWORD;
  if (password.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < password.length; i++) diff |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}
