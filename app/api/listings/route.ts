import { NextResponse } from 'next/server';
import Prisma from '../../lib/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser = getCurrentUser();
  if(!currentUser) return NextResponse.error();
  const body = await req.json();
  const {
    title,
    description,
    imagesrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    price,
    location
  } = body;

  // const listing = await Prisma.listing.create({
  //   data: {
  //     title,
  //     description,
  //     imagesrc,
  //     category,
  //     roomcount: roomCount,
  //     bathroomCount,
  //     guestCount,
  //     locationValue: location.value,
  //     userId: currentUser.id,
  //     price: price.parseInt(price, 10)
  //   }
  // })
  
  // return NextResponse.json(listing)
}