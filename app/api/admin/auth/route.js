import { NextResponse } from 'next/server';

const primaryAdminEmail = 'johneme2022@gmail.com';
const primaryAdminPassword = 'Johneme2022$';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const normalizedEmail = (email || '').trim().toLowerCase();
    const normalizedPassword = (password || '').trim();

    const envAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD?.trim();

    const matchesPrimary =
      normalizedEmail === primaryAdminEmail.toLowerCase() && normalizedPassword === primaryAdminPassword;

    const matchesEnv =
      Boolean(envAdminEmail && envAdminPassword) &&
      normalizedEmail === envAdminEmail &&
      normalizedPassword === envAdminPassword;

    if (!matchesPrimary && !matchesEnv) {
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
