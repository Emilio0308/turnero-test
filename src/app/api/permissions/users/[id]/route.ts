import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
interface Params {
  params: {id:string}
}
export async function GET(request: Request, {params}: Params){
  const permission = await prisma.permission.findUnique({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(permission);
}

export async function PUT(request: Request, { params }: Params) {
  const data = await request.json();
  const updatedPermission = await prisma.permission.update({
    where:{
      id: Number(params.id)
    },
    data    
  })
  return NextResponse.json(updatedPermission);
}

export async function DELETE(request: Request, { params }: Params) {
  const permission = await prisma.permission.delete({
    where: {
      id: Number(params.id)
    }
  });
  return NextResponse.json(permission);
}