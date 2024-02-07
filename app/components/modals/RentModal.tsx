'use client'
import React, { useMemo, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form'; 

import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../ui/Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../ui/inputs/CategoryInput';
import Category from '../listingSteps/Category';
import Location from '../listingSteps/Location';

type Props = {}
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = (props: Props) => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      imagesrc: '',
      category: '',
      roomcount: 1,
      bathroomCount: 1,
      guestCount: 1,
      location: null,
    }
  })

  const onBack = () => setStep((value) => value - 1);
  const onNext = () => setStep((value) => value + 1);

  const actionLabel = useMemo(() => {
    if(step === STEPS.PRICE) return 'Create';
    return 'Next'
  }, [step])
  const secondaryActionLabel = useMemo(() => {
    if(step === STEPS.CATEGORY) return undefined;
    return 'Back'
  }, [step])
  
  const category = watch('category');
  const location = watch('location');
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true
    })
  }
  
  let bodyContent = <Category category={category} setCustomValue={setCustomValue} />
  if(step === STEPS.LOCATION) bodyContent = <Location onChange={setCustomValue} value={location} />
  
  return (
    <Modal 
      onClose={rentModal.onClose} 
      isOpen={rentModal.isOpen} 
      onSubmit={onNext} 
      actionLabel={actionLabel} 
      secondaryAction={onBack}
      secondaryLabel={secondaryActionLabel}
      title='Airbnb your home' 
      body={bodyContent}
    />
  )
}

export default RentModal