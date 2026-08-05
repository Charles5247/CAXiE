import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'case-studies.json');

function readCaseStudies() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeCaseStudies(caseStudies) {
  writeFileSync(DATA_FILE, JSON.stringify(caseStudies, null, 2), 'utf-8');
}

export async function GET() {
  const caseStudies = readCaseStudies();
  return NextResponse.json({ caseStudies, count: caseStudies.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const caseStudies = readCaseStudies();
    const newCaseStudy = {
      id: body.id || body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `case-study-${Date.now()}`,
      title: body.title || 'Untitled case study',
      slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `case-study-${Date.now()}`,
      category: body.category || 'General',
      summary: body.summary || '',
      description: body.description || '',
      status: body.status || 'Draft',
      href: body.href || `/case-studies/${body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new'}`,
    };
    caseStudies.push(newCaseStudy);
    writeCaseStudies(caseStudies);
    return NextResponse.json(newCaseStudy, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
