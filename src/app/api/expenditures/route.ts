export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const expenditures = await prisma.expenditure.findMany();
  return NextResponse.json(expenditures);
}

export async function POST(request: Request) {
  const body = await request.json();
  const expenditures = await prisma.expenditure.create({
    data: {
      items: body.items,
      amount: body.amount,
      paymentMethod: body.paymentMethod,
      expenseBy: body.expenseBy,
      expenseType: body.expenseType,
      date: body.date,
    },
  });
  return NextResponse.json(expenditures);
}
