
import prisma from '@/app/lib/prismadb';

interface IParams {
  listingId?: string;
}

export const getListingById = async ( params: IParams ) => {
  try{
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId
      }
    })
  
    if(!listing) return null;
  
    return listing;
  }catch(err: any){
    throw new Error(err);
  }

}