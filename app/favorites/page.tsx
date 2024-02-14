
import React from 'react';

import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ui/ClientOnly';
import EmptyState from '../components/ui/EmptyState';
import { getFavorites } from '../actions/getFavorites';
import Heading from '../components/ui/Heading';
import FavoritesListings from '../components/favorites/FavoritesListing';
import { SafeUser } from '../types';

type Props = {}

const Page = async (props: Props) => {
  const favoritesListings: any = await getFavorites()
  const currentUser = await getCurrentUser()

  if(favoritesListings.length === 0) return <ClientOnly>
    <EmptyState 
      title='No favorites found' 
      subTitle='Look like you have no favorites listing'
    />
  </ClientOnly>
  
  return <ClientOnly>
    <FavoritesListings 
      currentUser={currentUser}
      listings={favoritesListings}
    />
  </ClientOnly>
}

export default Page