import { prisma } from "@/libs/prisma";
import { hash } from "bcrypt";
import { JwtPayload, decode } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url as string);
  const recoverToken = searchParams.get("recoverToken");
  const newPassword = searchParams.get("newPassword");

  if (!recoverToken) {
    return NextResponse.json(
      { message: "revover token is mandatory" },
      { status: 400 }
    );
  }

  const payload = decode(recoverToken) as JwtPayload;

  if (typeof payload != "string" && !payload) {
    return NextResponse.json({ message: "JWT malformed" }, { status: 400 });
  }
  const fechaEvento = new Date(payload.exp * 1000);
  const fechaActual = Date.now();

  if (fechaActual > fechaEvento.getTime()) {
    return NextResponse.json({ message: "JWT expired" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
      active: true,
    },
    include: {
      accounts: {
        include: {
          user: false,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  if (user.accounts[0]?.provider) {
    return NextResponse.json(
      { message: "user with provider session" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
      active: true,
    },
    data: {
      password: await hash(newPassword, 10),
    },
  });

  return NextResponse.json({ message: "password recovered" });
}
