import { prisma } from "@/libs/prisma";

import { NextResponse } from "next/server";
interface Params {
  params: { id: string; permissions: boolean; shifts: boolean };
}

export async function GET(request: Request, context: any) {
  const { params } = context;

  const user = await prisma.user.findFirst({
    where: {
      id: params.id,
      active: true,
    },
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
      shifts: {
        include: {
          shift: true,
        },
      },
      packs: {
        include: {
          pack: true,
        },
      },
      accounts: {
        include: {
          user: false,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }
  return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  const existingUser = await prisma.user.findUnique({
    where: { 
      id,
      active: true
    },
    include: {
      permissions: true,
      packs: true,
      shifts: true,
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  const data = await request.json();

  const updatedUser = await prisma.user.update({
    where: {
      id: params.id,
      active: true,
    },
    data: {
      name: data.name || existingUser.name,
      email: data.email || existingUser.email,
      image: data.image,
      lastName: data.lastName || existingUser.lastName,
      active :true,
    },
  });
  return NextResponse.json({
    message: "Usuario actualizado correctamente",
    user: updatedUser,
  });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
      active: true,
    },
  });

  if (!existingUser) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: { id },
    data: {
      active: false,
    },
  });

  return NextResponse.json({ message: "usuario eliminado con exito" });
}
