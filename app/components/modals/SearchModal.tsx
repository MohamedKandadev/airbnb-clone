'use client'
import React, { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatISO } from 'date-fns';
import { Range } from 'react-date-range';
import qs from 'query-string';

import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import CountrySelect, { CountrySelectValue } from '../ui/inputs/CountrySelect';
import Heading from '../ui/Heading';
import Map from '../ui/Map';
import Calendar from '../ui/inputs/Calendar';
import CounterInput from '../ui/inputs/CounterInput';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION)
  const [country, setCountry] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  
  const onNext = () => setStep(value => value + 1)
  const onBack = () => setStep(value => value - 1)
  
  const onSubmit = useCallback(() => {
    if(step !== STEPS.INFO) return onNext();

    let currentQuery = {};
    if(params) currentQuery = qs.parse(params.toString())

    const updateQuery: any = {
      ...currentQuery,
      locationValue: country?.value,
      guestCount,
      roomCount,
      bathroomCount
    }

    if(dateRange.startDate) updateQuery.startDate = formatISO(dateRange.startDate)
    if(dateRange.endDate) updateQuery.endDate = formatISO(dateRange.endDate)

    const url = qs.stringifyUrl({
      url: '/',
      query: updateQuery
    }, {skipNull: true})

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    params,
    country,   
    guestCount,   
    roomCount,    
    bathroomCount, 
    dateRange,
    router,
    onNext   
  ])
  
  const actionLabel = useMemo(() => {
    if(step === STEPS.INFO) return 'Search';
    return 'Next'
  }, [step])
  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.LOCATION) return undefined;
    return 'Back';
  }, [step])
  
  
  let bodyContent = <div className="flex flex-col gap-8">
    <Heading title='Where do you wanna go?' subTitle='Find the perfect location!' />
    <CountrySelect value={country} onChange={(value) => setCountry(value as CountrySelectValue)} />
    <Map center={country?.latIng} />
  </div>
  if(step === STEPS.DATE) bodyContent = <div className="flex flex-col gap-8">
    <Heading title='When do plan to go?' subTitle='Make sure everone is free!' />
    <Calendar onChangeDate={(value) => setDateRange(value.selection)} value={dateRange} />
  </div>
  if(step === STEPS.INFO) bodyContent = <div className="flex flex-col gap-8">
    <Heading title='More information' subTitle='Find your perfect place!' />
    <CounterInput onClick={(value) => setGuestCount(value)} title='Guests' subTitle='How many guests are coming?' value={guestCount} />
    <CounterInput onClick={(value) => setRoomCount(value)} title='Room' subTitle='How many rooms do you need?' value={roomCount} />
    <CounterInput onClick={(value) => setBathroomCount(value)} title='Bathroom' subTitle='How many bathrooms do you need?' value={bathroomCount} />
  </div>
  
  return (
    <Modal 
      onClose={searchModal.onClose} 
      isOpen={searchModal.isOpen} 
      onSubmit={onSubmit} 
      actionLabel={actionLabel} 
      secondaryAction={onBack}
      secondaryLabel={secondaryActionLabel}
      title='Filters' 
      body={bodyContent}
      // disabled={isLoading}
    />
  )
}

export default SearchModal