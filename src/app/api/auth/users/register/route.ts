import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";
import { UserData } from "../../../interfaces";
export async function GET() {
  const registration = await prisma.user.findMany();
  return NextResponse.json(registration);
}

export async function POST(request: Request) {
  try {
    const { name, lastName, email, password } = await request.json();

    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userFound) {
      return NextResponse.json(
        { message: "Usuario existente" },
        { status: 400 }
      );
    }
    const userData: UserData = {
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    // if (permissions && Array.isArray(permissions)) {
    //   userData.permissions = {
    //     create: permissions.map((id) => (
    //       { permission: { connect: { id } },})),
    //   };
    // }

    // if (packs && Array.isArray(packs)) {
    //   userData.packs = {
    //     create: packs.map((id) => ({
    //       pack: { connect: { id } },
    //     })),
    //   };
    // }

    // if (shifts && Array.isArray(shifts)) {
    //   userData.shifts = {
    //     create: shifts.map((id) => ({
    //       shift: { connect: { id } },
    //     })),
    //   };
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = { ...userData, password: hashedPassword };
    const createdUser = await prisma.user.create({
      data,
    });
    // Devuelvo todos los datos menos el password
    const { password: _, ...user } = createdUser;
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
