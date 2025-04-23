// app/api/cultures/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cultures = await prisma.culture.findMany();
    return NextResponse.json(cultures);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch cultures' }, { status: 500 });
  }
}
