'use client'

import { User } from '@prisma/client';
import React, { FC } from 'react'

import useCountries from '@/app/hooks/useCountries';
import Heading from '@/app/components/ui/Heading';
import Image from 'next/image';
import HeartButton from '../ui/Buttons/HeartButton';
import { SafeUser } from '@/app/types';

interface ListingHeadProps {
  title: string;
  imagesrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  imagesrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries()
  const country = getByValue(locationValue)
  
  return (
    <>
      <Heading title={title} subTitle={`${country?.region}, ${country?.label}`} />
      <div className="relative overflow-hidden h-[60vh] rounded-xl">
        <Image src={imagesrc} alt='listing image' fill className='object-cover aspect-square' />
        <div className="absolute top-3 right-3">
          <HeartButton currentUser={currentUser} listingId={id} />
        </div>
      </div>
    </>
  )
}

export default ListingHead