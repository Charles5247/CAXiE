import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'jobs.json');

function readJobs() {
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf-8')); } catch { return []; }
}
function writeJobs(jobs) {
  writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const jobs = readJobs();
    const idx = jobs.findIndex((j) => j.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    jobs[idx] = { ...jobs[idx], ...body };
    writeJobs(jobs);
    return NextResponse.json(jobs[idx]);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const jobs = readJobs();
    const filtered = jobs.filter((j) => j.id !== params.id);
    if (filtered.length === jobs.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    writeJobs(filtered);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
