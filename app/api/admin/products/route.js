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

export async function GET() {
  const products = readProducts();
  return NextResponse.json({ products, count: products.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const products = readProducts();
    const newProduct = { ...body, id: body.id || body.name?.toLowerCase().replace(/\s+/g, '-') || `product-${Date.now()}` };
    products.push(newProduct);
    writeProducts(products);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
