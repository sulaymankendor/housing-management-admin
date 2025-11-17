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
  const depositeExpense = await prisma.depositeExpense.findMany({
    where: {
      landlordID: landlordID,
    },
  });
  return NextResponse.json(depositeExpense);
}

export async function POST(request: Request) {
  const body = await request.json();
  const depositeExpense = await prisma.depositeExpense.create({
    data: {
      landlordID: body.landlordID,
      tenantID: body.tenantID,
      //@ts-ignore
      tenantName: body.tenantName,
      propertyLocation: body.propertyLocation,
      propertyType: body.propertyType,
      items: body.items,
      depositedAmount: body.depositedAmount,
      expendedAmount: body.expendedAmount,
      depositedDate: body.depositedDate,
    },
  });
  return NextResponse.json(depositeExpense);
}
