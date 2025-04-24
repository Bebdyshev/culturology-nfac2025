// app/api/cultures/[key]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    // Валидация параметра key
    if (!params.key || typeof params.key !== 'string') {
      return NextResponse.json(
        { error: "Invalid culture key" },
        { status: 400 }
      );
    }

    const culture = await prisma.culture.findUnique({
      where: { 
        key: params.key // Используем key как уникальный идентификатор
      },
      select: {
        id: true,
        key: true,
        name: true,
        region: true,
        population: true,
        language: true,
        location: true,
        description: true,
        traditions: true,
        lifestyle: true,
        images: true
      }
    });

    if (!culture) {
      return NextResponse.json(
        { error: "Culture not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(culture);

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}