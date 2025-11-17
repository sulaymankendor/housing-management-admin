export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateID } from "@/lib/generateID";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const landlordID = searchParams.get("landlordID");

  if (!landlordID) {
    return NextResponse.json(
      { error: "landlordID is required" },
      { status: 400 }
    );
  }

  const tenants = await prisma.tenant.findMany({
    where: {
      landlordID: landlordID,
    },
  });

  return NextResponse.json(tenants);
}

export async function POST(request: Request) {
  const body = await request.json();
  const tenants = await prisma.tenant.create({
    data: {
      //@ts-ignore
      tenantID: generateID(),
      landlordID: body.landlordID,
      name: body.name,
      phoneNumber: body.phoneNumber,
      propertyLocation: body.propertyLocation,
      propertyType: body.propertyType,
      moveInDate: body.moveInDate,
      rentFee: body.rentFee,
      status: body.status,
    },
  });
  return NextResponse.json(tenants);
}
