import { prisma } from "@/libs/prisma";

import { compare, hash } from "bcrypt";
import { NextResponse } from "next/server";

import { generateJWT } from "@/app/api/utils/generateJWT";
import { sendEmail } from "@/app/api/utils/sendEmial";
import fs from "fs/promises";
import Handlebars from "handlebars";

interface Params {
  params: { id: string; permissions: boolean; shifts: boolean };
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  const { password, newpassword } = await request.json();
  if (!password || !newpassword) {
    return NextResponse.json(
      { message: "password and newpassword are mandatory" },
      { status: 400 }
    );
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
      active: true,
    },
  });
  if (!existingUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const isPsswordCorrect = await compare(
    password,
    existingUser.password as string
  );
  if (!isPsswordCorrect) {
    return NextResponse.json(
      { message: "invalid credentials" },
      { status: 403 }
    );
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: params.id,
      active: true,
    },
    data: {
      password: await hash(newpassword, 10),
    },
  });

  return NextResponse.json({ message: updatedUser });
}

export async function POST(request: Request, { params }: Params) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id,
      active: true,
    },
  });
  if (!user) {
    return NextResponse.json(
      { message: "usuario no encontrado" },
      { status: 404 }
    );
  }
  const { createAt, updatedAt, password, ...payload } = user;
  const recovertoken = generateJWT(payload);
  //(recovertoken);
  const url = `http://localhost:3000/${recovertoken}`;

  const template = await fs.readFile("plantillas/recoverPassword.hbs", "utf8");
  const compiledTemplate = Handlebars.compile(template);
  const data = {
    subject: "RECUPERACION DE CONTRASEÑA TURNEX",
    title: "RECUPERACION DE CONTRASEÑA TURNEX",
    message: `hola ${user} este es tu correo para recuperar tu contraseña`,
    url,
  };
  const html = compiledTemplate(data);

  sendEmail({
    user: user.email as string,
    html,
  });

  return NextResponse.json({ message: "revisar correo" });
}
