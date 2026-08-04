import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate against env vars — never hardcode credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Admin credentials not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD env vars.' },
        { status: 500 }
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      // Constant-time comparison not strictly needed here since both are env vars,
      // but we delay slightly to deter brute force
      await new Promise((r) => setTimeout(r, 300));
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      email: adminEmail,
      role: 'administrator',
    });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
