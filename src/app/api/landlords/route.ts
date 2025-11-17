import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const landlord = await prisma.landlord.findMany();
  return NextResponse.json(landlord);
}

export async function POST(request: Request) {
  const body = await request.json();
  const landlord = await prisma.landlord.create({
    data: body,
  });
  return NextResponse.json(landlord);
}
