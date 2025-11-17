export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tenantID = searchParams.get("tenantID");

  if (!tenantID) {
    return NextResponse.json(
      { error: "tenantID is required" },
      { status: 400 }
    );
  }

  const receipts = await prisma.receipt.findMany({
    where: {
      tenantID: tenantID,
    },
  });
  return NextResponse.json(receipts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const receipts = await prisma.receipt.create({
    data: {
      tenantID: body.tenantID,
      receiptNumber: body.receiptNumber,
      receivedFrom: body.receivedFrom,
      propertyType: body.propertyType,
      paidTo: body.paidTo,
      amount: body.amount,
      monthPaidFor: body.monthPaidFor,
      paymentDate: body.paymentDate,
      paymentMethod: body.paymentMethod,
      receivedFromPhoneNumber: body.receivedFromPhoneNumber,
    },
  });
  return NextResponse.json(receipts);
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const deletedReceipt = await prisma.receipt.delete({
      where: { id },
    });

    return NextResponse.json(deletedReceipt);
  } catch (error) {
    return NextResponse.json(
      { error: "Receipt not found or could not be deleted" },
      { status: 404 }
    );
  }
}
