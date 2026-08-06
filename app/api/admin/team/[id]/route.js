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

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const team = readTeam();
    const idx = team.findIndex((m) => m.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Member not found' }, { status: 404 });

    team[idx] = {
      ...team[idx],
      ...body,
      id,
      social: {
        twitter: body.social?.twitter ?? team[idx].social?.twitter ?? '',
        linkedin: body.social?.linkedin ?? team[idx].social?.linkedin ?? '',
        github: body.social?.github ?? team[idx].social?.github ?? '',
        instagram: body.social?.instagram ?? team[idx].social?.instagram ?? '',
      },
      specialties: Array.isArray(body.specialties)
        ? body.specialties
        : (body.specialties || '').split(',').map((s) => s.trim()).filter(Boolean),
    };

    writeTeam(team);
    return NextResponse.json(team[idx]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const team = readTeam();
    const filtered = team.filter((m) => m.id !== id);
    if (filtered.length === team.length) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }
    writeTeam(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
