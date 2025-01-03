import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

interface IParams {
  userId?: string;
  authorId?: string;
  listingId?: string;
}

export const getReservations = async (params: IParams) => {
  try {
    const { authorId, listingId, userId } = params;
    const query: any = {};

    if (authorId) query.authorId = { userId: authorId };
    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (err: any) {
    throw new Error(err);
  }
};
