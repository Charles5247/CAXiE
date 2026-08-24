import { NextResponse } from 'next/server';

/**
 * CAXiE Technologies Ltd — Admin authentication
 *
 * Credentials are validated ONLY against environment variables
 * (ADMIN_EMAIL + ADMIN_PASSWORD). No hardcoded fallback credentials exist —
 * if the env vars are not set, authentication always fails.
 *
 * This is critical for the separately-deployed admin service
 * (admin.caxietechnologies.com): a hardcoded credential in source code would
 * be a permanent backdoor that survives every deploy.
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    const envAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD?.trim();

    const matchesEnv =
      Boolean(envAdminEmail && envAdminPassword) &&
      normalizedEmail === envAdminEmail &&
      normalizedPassword === envAdminPassword;

    if (!matchesEnv) {
      // Constant-time-ish delay to slow down brute-force attempts
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      email: normalizedEmail,
      role: 'administrator',
    });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
