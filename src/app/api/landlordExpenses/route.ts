export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const landlordID = searchParams.get("landlordID");

  if (!landlordID) {
    return NextResponse.json(
      { error: "landlordID is required" },
      { status: 400 }
    );
  }

  const landlordExpense = await prisma.landlordExpense.findMany({
    where: {
      landlordID: landlordID,
    },
  });
  return NextResponse.json(landlordExpense);
}

export async function POST(request: Request) {
  const body = await request.json();
  const landlordExpense = await prisma.landlordExpense.create({
    data: {
      landlordID: body.landlordID,
      tenantID: body.tenantID,
      //@ts-ignore
      tenantName: body.tenantName,
      propertyLocation: body.propertyLocation,
      propertyType: body.propertyType,
      items: body.items,
      totalAmount: body.totalAmount,
      amountPaid: body.amountPaid,
      amountDue: body.amountDue,
      date: body.date,
      //@ts-ignore
      status: body.status,
    },
  });
  return NextResponse.json(landlordExpense);
}
