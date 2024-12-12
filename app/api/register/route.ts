import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const useExiste = await prisma.user.findUnique({
      where: { email },
    });
    if (useExiste)
      return NextResponse.json(
        { error: "User already existe" },
        { status: 404 }
      );
    const hashedPass = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPass,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
