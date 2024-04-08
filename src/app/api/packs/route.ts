import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
export async function GET() {
  const packs = await prisma.pack.findMany();
  return NextResponse.json(packs);
}

export async  function POST(request: Request) {
  const data = await request.json();
  const newPack = await prisma.pack.create({data});  
  return NextResponse.json(newPack);
}