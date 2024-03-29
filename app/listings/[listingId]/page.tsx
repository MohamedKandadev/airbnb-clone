
import React from 'react'

import { getListingById } from '@/app/actions/getListingById'
import ClientOnly from '@/app/components/ui/ClientOnly';
import EmptyState from '@/app/components/ui/EmptyState';
import ListingClient from '../../components/listings/ListingClient'
import { getReservations } from '@/app/actions/getReservations';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  
  if(!listing) <ClientOnly >
    <EmptyState />
  </ClientOnly>
  
  return (
    <ClientOnly >
      <ListingClient listing={listing} reservations={reservations} currentUser={currentUser}  />
    </ClientOnly>
  )
}

export default ListingPage