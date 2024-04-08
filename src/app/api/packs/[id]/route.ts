import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
interface Params {
  params: {id:string}
}
export async function GET(request: Request, {params}: Params){
  const pack = await prisma.pack.findFirst({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(pack);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  const updatedPack = await prisma.pack.update({
    where:{
      id: Number(params.id)
    },
    data    
  })
  return NextResponse.json(updatedPack);
}

export async function DELETE(request: Request, { params }: Params) {
  const pack = await prisma.pack.delete({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(pack);
}