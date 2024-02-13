import React from 'react'
import { getProprties } from '../actions/getProprties'
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ui/ClientOnly';
import EmptyState from '../components/ui/EmptyState';
import ProprtiesOnly from '../components/properties/PropertiesOnly';


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if(!currentUser) return <ClientOnly>
    <EmptyState title='Unauthorized' subTitle='Please login' />
  </ClientOnly>
  
  const listing: any = await getProprties();
  if(listing.length === 0)return <ClientOnly>
    <EmptyState 
      title='No Proprties found' 
      subTitle='Looks like you havent any Proprties.' 
    />
  </ClientOnly>
  
  return (
    <ClientOnly>
      <ProprtiesOnly currentUser={currentUser} listings={listing} />
      {/* <EmptyState 
        title='No Proprties found' 
        subTitle='Looks like you havent any Proprties.' 
      /> */}
    </ClientOnly>
  )
}

export default PropertiesPage