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

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const caseStudies = readCaseStudies();
    const index = caseStudies.findIndex((item) => item.id === params.id || item.slug === params.id);
    if (index === -1) return NextResponse.json({ error: 'Case study not found' }, { status: 404 });

    caseStudies[index] = {
      ...caseStudies[index],
      ...body,
      id: body.id || caseStudies[index].id,
      slug: body.slug || caseStudies[index].slug,
      href: body.href || caseStudies[index].href || `/case-studies/${body.slug || caseStudies[index].slug}`,
    };
    writeCaseStudies(caseStudies);
    return NextResponse.json(caseStudies[index]);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const caseStudies = readCaseStudies();
    const next = caseStudies.filter((item) => item.id !== params.id && item.slug !== params.id);
    writeCaseStudies(next);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
