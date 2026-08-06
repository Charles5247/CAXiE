import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_PATH = join(process.cwd(), 'data', 'team.json');

function readTeam() {
  try {
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeTeam(data) {
  writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  return NextResponse.json(readTeam());
}

export async function POST(request) {
  try {
    const body = await request.json();
    const team = readTeam();

    const newMember = {
      id: body.id || `member-${Date.now()}`,
      name: body.name || '',
      shortName: body.shortName || '',
      title: body.title || '',
      bio: body.bio || '',
      photo: body.photo || null,
      social: {
        twitter: body.social?.twitter || '',
        linkedin: body.social?.linkedin || '',
        github: body.social?.github || '',
        instagram: body.social?.instagram || '',
      },
      specialties: Array.isArray(body.specialties)
        ? body.specialties
        : (body.specialties || '').split(',').map((s) => s.trim()).filter(Boolean),
    };

    team.push(newMember);
    writeTeam(team);
    return NextResponse.json(newMember, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
