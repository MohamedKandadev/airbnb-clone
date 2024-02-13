import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export const getProprties = async () => {
  try{
    const currentUser = await getCurrentUser()
    if(!currentUser) return NextResponse.error();
    
    const listing = await prisma.listing.findMany({
      where: {
        userId: currentUser.id
      },
    })
    
    return listing
    
  }catch(err: any){
    throw new Error(err);
  }
}