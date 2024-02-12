
import prisma from '@/app/lib/prismadb';

interface IParams {
  listingId?: string;
}

export const getListingById = async ( params: IParams ) => {
  try{
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId
      },
      include: {
        user: true
      }
    })
  
    if(!listing) return null;
  
    return listing;
  }catch(error: any){
    throw new Error(error);
  }

}