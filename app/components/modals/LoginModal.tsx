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
import Heading from '../ui/Heading';
import Input from '../ui/inputs/Input';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';

type Props = {}

const LoginModal = (props: Props) => {
  const {isOpen, onClose} = useLoginModal();
  const {onOpen} = useRegisterModal();
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    signIn('credentials',{...data, redirect: false})
      .then((callback) => {
        if(callback?.ok){
          toast.success('login with success')
        }
        if(callback?.error){
          toast.error(callback?.error)
        }
      })  
  }
  const toggleOpen = () => {
    onClose();
    onOpen();
  }

  const bodyContent = (
    <div className='flex flex-col gap-4 w-full'>
      <Heading title='Welcome back' subTitle='Login to your account' />
      <Input id='email' type='email' errors={errors} label='Email' register={register} placeholder='Email' required />
      <Input id='password' type='password' errors={errors} label='password' register={register} placeholder='Password' required />
    </div>
  )
  const footerContent = (
    <div className="flex flex-col gap-4 mt-4">
      <hr />
      <div className="flex max-md:flex-col gap-4">
        <Button label='Continue with GitHub' icon={AiFillGithub} outline onClick={onSubmit} />
        <Button label='Continue with google' icon={FcGoogle} outline onClick={() => signIn('google')} />
      </div>
      <div className="text-center mt-3">
        <div className="text-gray-500 ">
          You don't have an account?
          <div className="text-black inline ml-1 cursor-pointer" onClick={toggleOpen}>Register</div>
        </div>
      </div>
    </div>
  )
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title='Login' 
      disabled={isLoading} 
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      actionLabel='Continue'
    />
  )
}

export default LoginModal