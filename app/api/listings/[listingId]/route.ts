import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export const DELETE = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    if (!listingId || typeof listingId !== "string")
      throw new Error("Invalid Id");

    const listing = await prisma.listing.deleteMany({
      where: {
        userId: currentUser.id,
        id: params.listingId,
      },
    });

    return NextResponse.json(listing);
  } catch (err: any) {
    throw new Error(err);
  }
};
