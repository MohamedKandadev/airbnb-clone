'use client'

import React, { useCallback, useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";


import Modal from './Modal';
import useRegisterModal from '@/app/hooks/useRegisterModal'
import Heading from '../ui/Heading';
import Input from '../ui/inputs/Input';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

type Props = {}

const RegisterModal = (props: Props) => {
  const {isOpen, onClose} = useRegisterModal();
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    axios.post('/api/register', data)
      .then(() => {
        onClose();
      })
      .catch((err) => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsloading(false);
      })
  }

  const bodyContent = (
    <div className='flex flex-col gap-4 w-full'>
      <Heading title='Welcome to Airbnb' subTitle='Create an account!' />
      <Input id='name' errors={errors} label='Name' register={register} placeholder='Name' required />
      <Input id='email' type='email' errors={errors} label='Email' register={register} placeholder='Email' required />
      <Input id='password' type='password' errors={errors} label='password' register={register} placeholder='Password' required />
    </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-4">
      <hr />
      <div className="flex max-md:flex-col gap-4">
        <Button label='Continue with GitHub' icon={AiFillGithub} outline onClick={onSubmit} />
        <Button label='Continue with google' icon={FcGoogle} outline onClick={onSubmit} />
      </div>
      <div className="text-center mt-3">
        <div className="text-gray-500 ">
          Already have an account?
          <div className="text-black inline ml-1">Log in</div>
        </div>
      </div>
    </div>
  )
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title='Register' 
      disabled={isLoading} 
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
    />
  )
}

export default RegisterModal