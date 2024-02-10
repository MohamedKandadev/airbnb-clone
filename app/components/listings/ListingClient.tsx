'use client'

import { Listing, User } from '@prisma/client'
import React, { FC, useMemo } from 'react'

import { categories } from '@/app/components/navbar/Categories'
import Container from '@/app/components/ui/Container'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'

interface ListingClientProps {
  listing: Listing,
  currentUser?: User
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])
  
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-2">
          <ListingHead 
            title={listing.title}
            imagesrc={listing.imagesrc} 
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <ListingInfo 
            currentUser={currentUser} 
            guestCount={listing.guestCount} 
            roomCount={listing.roomcount} 
            bathRoomCount={listing.bathroomCount} 
            category={category}
            description={listing.description}
          />
        </div>
      </div>
    </Container>
  )
}

export default ListingClient