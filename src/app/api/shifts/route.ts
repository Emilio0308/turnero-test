import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET() {
  const shift = await prisma.shift.findMany();
  return NextResponse.json(shift);
}

export async  function POST(request: Request) {
  const data = await request.json();
  const newShift = await prisma.shift.create({data});  
  return NextResponse.json(newShift);
}