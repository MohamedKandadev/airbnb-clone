import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prismadb';
import getCurrentUser from './getCurrentUser';

export const getFavorites = async () => {
  try{
    const currentUser = await getCurrentUser()
    if(!currentUser) return [];
    
    const favorites = await prisma.listing.findMany({
      where: {
        id: { 
          in: [...(currentUser.favoriteIds || [])]
        }
      },
    })
    
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt?.toString(),
    }));

    return safeFavorites;
    
  }catch(err: any){
    throw new Error(err);
  }
}