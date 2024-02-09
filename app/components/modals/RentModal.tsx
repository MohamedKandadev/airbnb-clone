'use client'
import React, { useMemo, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'; 

import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Category from '../listingSteps/Category';
import Location from '../listingSteps/Location';
import Info from '../listingSteps/Info';
import Images from '../listingSteps/Images';
import Description from '../listingSteps/Description';
import Price from '../listingSteps/Price';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState:{
      errors
    },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      imagesrc: '',
      category: '',
      roomCount: 1,
      bathroomCount: 1,
      guestCount: 1,
      location: null,
      price: 1
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
  const guestCount = watch('guestCount');
  const roomcount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imagesrc = watch('imagesrc');
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(step !== STEPS.PRICE) return onNext();

    setIsLoading(true)

    axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created!');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      }).catch((err) => {
        toast.error('Something went wrong!');
        console.log(err)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  
  let bodyContent = <Category category={category} setCustomValue={setCustomValue} />
  if(step === STEPS.LOCATION) 
    bodyContent = <Location onChange={setCustomValue} value={location} />
  if(step === STEPS.INFO) 
    bodyContent = <Info guestCount={guestCount} roomCount={roomcount} bathroomCount={bathroomCount} setCustomValue={setCustomValue}  />
  if(step === STEPS.IMAGES) 
    bodyContent = <Images imagesrc={imagesrc} setCustomValue={setCustomValue} />
  if(step === STEPS.DESCRIPTION)
    bodyContent = <Description errors={errors} register={register}  />
  if(step === STEPS.PRICE)
    bodyContent = <Price errors={errors} register={register}  />
  
  return (
    <Modal 
      onClose={rentModal.onClose} 
      isOpen={rentModal.isOpen} 
      onSubmit={handleSubmit(onSubmit)} 
      actionLabel={actionLabel} 
      secondaryAction={onBack}
      secondaryLabel={secondaryActionLabel}
      title='Airbnb your home' 
      body={bodyContent}
      disabled={isLoading}
    />
  )
}

export default RentModal