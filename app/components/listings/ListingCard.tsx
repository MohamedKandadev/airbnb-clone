'use client'

import React, { FC, useCallback, useMemo } from 'react'
import { Listing, Reservation, User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useCountries from '@/app/hooks/useCountries';
import HeartButton from '../../components/ui/Buttons/HeartButton';

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser
}) => {
  const router = useRouter()
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if(disabled) return ;
    onAction?.(actionId)
  }, [disabled, onAction, actionId])
  const price = useMemo(() => {
    if(reservation) return reservation.totlaPrice;
    return data.price;
  }, [reservation, data.price])
  
  return (
    <div 
      className="group col-span-1 cursor-pointer" 
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="w-full relative overflow-hidden rounded-xl aspect-square">
          <Image alt='listing' src={data.imagesrc} fill className='object-cover w-full h-full group-hover:scale-110 transition' />
          <div className="absolute top-3 right-3">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser} 
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {location?.region}, {location?.label}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && <div className='font-light'>night</div>}
        </div>
      </div>
    </div>
  )
}

export default ListingCard