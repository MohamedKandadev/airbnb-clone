import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export const getFavorites = async () => {
  try{
    const currentUser = await getCurrentUser()
    if(!currentUser) return NextResponse.error();
    
    const favorites = await prisma.listing.findMany({
      where: {
        id: { 
          in: [...(currentUser.favoriteIds || [])]
        }
      },
    })
    
    return favorites
    
  }catch(err: any){
    throw new Error(err);
  }
}