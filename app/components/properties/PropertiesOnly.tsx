'use client'

import { Listing, User } from '@prisma/client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useCallback, useState } from 'react'
import toast from 'react-hot-toast';
import Container from '../ui/Container';
import Heading from '../ui/Heading';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingCard from '../listings/ListingCard';
import { SafeListing, SafeUser } from '@/app/types';

interface ProprtiesOnlyProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const ProprtiesOnly: FC<ProprtiesOnlyProps> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [deletetingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    console.log('-------')

    axios.delete(`/api/listings/${id}`)
      .then(() => {
        toast.success('Listing deleted');
        router.refresh()
      }).catch((err) => {
        toast.error('Something went wrong')
        console.log(err)
      }).finally(() => {
        setDeletingId('')
      })
    
  }, [router])
  
  return <Container>
    <Heading title='Properties' subTitle="List of your properties" />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings.map(listing => (
        <ListingCard 
          key={listing.id}
          data={listing}
          actionId={listing.id}
          onAction={onCancel}
          actionLabel='Delete properties'
          disabled={deletetingId === listing.id}
          currentUser={currentUser}
        />
      ))}
    </div>
  </Container>
}

export default ProprtiesOnly