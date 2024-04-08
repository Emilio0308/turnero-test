import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET() {
  const registration = await prisma.permission.findMany();
  return NextResponse.json(registration);
}

export async  function POST(request: Request) {
  const data = await request.json();
  const newRegistration = await prisma.permission.create({data});  
  return NextResponse.json(newRegistration);
}