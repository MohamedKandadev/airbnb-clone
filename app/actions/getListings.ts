import prisma from '@/app/lib/prismadb';
import { User } from '@prisma/client';
import { Range } from 'react-date-range';

export interface IParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export const getListings = async (params:IParams) => {
  try{
    const {
      locationValue,
      guestCount,
      roomCount,
      bathroomCount,
      category,
      endDate,
      startDate,
      userId
    } = params;
    console.log(params)
    
    let query: any = {};
    if(userId) query.userId = userId;
    if(locationValue) query.locationValue = locationValue;
    if(guestCount) query.guestCount = +guestCount;
    if(roomCount) query.roomcount = +roomCount;
    if(bathroomCount) query.bathroomCount = +bathroomCount;
    if(category) query.category = category;
    if(endDate && startDate){
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                endDate: { gte: endDate },
                startDate: { lte: endDate },
              },
            ]
          }
        }
      }
    }
    
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    })
    return listings;
  }catch(err: any){
    throw new Error(err)
  }
}