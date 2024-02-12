import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export const POST = async (res: NextResponse) => {
  const currentUser = await getCurrentUser();
  if(!currentUser) 
    return NextResponse.error();

  const body = await res.json();
  const { 
    startDate, 
    endDate, 
    listingId, 
    totalPrice 
  } = body;
  console.log(totalPrice)

  if(!startDate || !endDate || !totalPrice || !listingId)
    return NextResponse.error();

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totlaPrice: totalPrice
        }
      }
    }
  })

  return NextResponse.json(listingAndReservation)
}