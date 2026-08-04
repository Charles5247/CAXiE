import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'data', 'products.json');

function readProducts() {
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf-8')); } catch { return []; }
}
function writeProducts(products) {
  writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const products = readProducts();
    const idx = products.findIndex((p) => p.id === params.id);
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    products[idx] = { ...products[idx], ...body };
    writeProducts(products);
    return NextResponse.json(products[idx]);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const products = readProducts();
    const filtered = products.filter((p) => p.id !== params.id);
    if (filtered.length === products.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    writeProducts(filtered);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
