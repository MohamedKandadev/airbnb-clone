import React from 'react'

import { getListingById } from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ui/ClientOnly';
import EmptyState from '@/app/components/ui/EmptyState';
import ListingClient from '../../components/listings/ListingClient'

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  
  if(!listing) <ClientOnly >
    <EmptyState />
  </ClientOnly>
  
  return (
    <ClientOnly >
      <ListingClient listing={listing} />
    </ClientOnly>
  )
}

export default ListingPage