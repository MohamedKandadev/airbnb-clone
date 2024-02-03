'use client';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Image from 'next/image'
import React, { useState } from 'react'
import { BsList } from 'react-icons/bs'

type Props = {}

const UserMenu = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {onOpen} = useRegisterModal();
  const toggleOpen =  () => {
    setIsOpen((value: boolean) => !value);
  }

  return (
    <div className='relative flex items-center gap-3' >
      <h3 className='text-[14px] font-[700] max-sm:hidden' >
        Airbnb Your Home
      </h3>
      <div onClick={toggleOpen} className="relative border-[1px] shadow-sm py-1 px-2 justify-between items-center gap-3 w-fit rounded-full flex cursor-pointer hover:shadow-md">
        <BsList size={20} />
        <Image src='/images/user.jpg' width={35} height={35} alt='user icon' className='rounded-full' />
      </div>
      {
        isOpen && <div className="w-[200px] py-3 px-4 bg-white shadow-xl absolute top-[50px] right-0 rounded-md">
          <ul className='list-none p-0 m-0' >
            <li className='mb-4 cursor-pointer'>Login</li>
            <li className='cursor-pointer' onClick={onOpen}>Sign Up</li>
          </ul>
        </div>
      }
    </div>
  )
}

export default UserMenu