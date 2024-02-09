import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();
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
    location,
    price,
  } = body;
  console.log(body)

  const listing = await prisma.listing.create({
    data: {
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
      title,
      description,
      imagesrc,
      category,
      roomcount: roomCount,
      bathroomCount,
      guestCount,
    }

  })
  
  return NextResponse.json(listing)
}