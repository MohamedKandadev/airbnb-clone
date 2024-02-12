'use client'

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Listing, Reservation, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays , eachDayOfInterval } from 'date-fns'

import { categories } from '@/app/components/navbar/Categories'
import Container from '@/app/components/ui/Container'
import ListingHead from './ListingHead'
import ListingInfo from './ListingInfo'
import ListingReservation from './ListingReservation'
import useLoginModal from '@/app/hooks/useLoginModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Range } from 'react-date-range'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
} 

interface ListingClientProps {
  listing: Listing,
  currentUser?: User,
  reservations?: Reservation[]
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = []
}) => {
  const { onOpen } = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })
    return dates;
  }, [reservations])
  
  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if(!currentUser) return onOpen();

    setIsLoading(true)

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    }).then(() => {
      toast.success('Listing reserved!')
      setDateRange(initialDateRange)
      router.refresh()
    }).catch((err) => {
      toast.error('Something went wrong')
    }).finally(() => {
      setIsLoading(false)
    })
    
  }, [
    currentUser,
    dateRange,
    listing?.id,
    router
  ])
  
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category)
  }, [listing.category])
  
  useEffect(() => {
    if(dateRange.startDate && dateRange.endDate){
      const dayCount = differenceInCalendarDays (
        dateRange.endDate,
        dateRange.startDate 
      )
      console.log(dayCount, listing.price)

      if(dayCount && listing.price){
        setTotalPrice(dayCount * listing.price)
      }else{
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])
  
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
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-4">
            <ListingInfo 
              currentUser={currentUser} 
              guestCount={listing.guestCount} 
              roomCount={listing.roomcount} 
              bathRoomCount={listing.bathroomCount} 
              category={category}
              description={listing.description}
              country={listing.locationValue}
            />
            <div className="md:col-span-3 mb-10 mt-10">
              <ListingReservation 
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: any) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient