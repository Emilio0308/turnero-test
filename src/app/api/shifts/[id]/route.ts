import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
interface Params {
  params: {id:string}
}
export async function GET(request: Request, {params}: Params){
  const shift = await prisma.shift.findFirst({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(shift);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  const updatedShift = await prisma.shift.update({
    where:{
      id: Number(params.id)
    },
    data    
  })
  return NextResponse.json(updatedShift);
}

export async function DELETE(request: Request, { params }: Params) {
  const shift = await prisma.shift.delete({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(shift);
}