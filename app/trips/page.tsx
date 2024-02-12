import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import { getReservations } from '../actions/getReservations';
import ClientOnly from '../components/ui/ClientOnly';
import EmptyState from '../components/ui/EmptyState';
import TripsClient from '../components/trips/TripsClient';


type Props = {}

const Page = async (props: Props) => {
  
  const currentUser = await getCurrentUser();
  if(!currentUser) return <ClientOnly>
    <EmptyState title='Unauthorized' subTitle='Please login' />
  </ClientOnly>
  
  const reservations = await getReservations({userId: currentUser?.id});
  if(reservations.length === 0)return <ClientOnly>
    <EmptyState 
      title='No trips found' 
      subTitle='Looks like you havent reserved any trips.' 
    />
  </ClientOnly>
  
  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default Page