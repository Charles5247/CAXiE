import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'jobs.json');

function readJobs() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeJobs(jobs) {
  writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
}

export async function GET() {
  const jobs = readJobs();
  return NextResponse.json({ jobs, count: jobs.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const jobs = readJobs();
    const newJob = { ...body, id: body.id || `job-${Date.now()}`, postedDate: body.postedDate || new Date().toISOString().slice(0, 10) };
    jobs.push(newJob);
    writeJobs(jobs);
    return NextResponse.json(newJob, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
