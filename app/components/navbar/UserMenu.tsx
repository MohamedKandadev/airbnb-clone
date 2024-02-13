'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useRentModal from '@/app/hooks/useRentModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { BsList } from 'react-icons/bs'

interface userMenuProps {
  currentUser?: User | null
}

const UserMenu: React.FC<userMenuProps> = ({
  currentUser
}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const rentModal = useRentModal();
  const {onOpen} = useRegisterModal();
  const loginModel = useLoginModal();

  const toggleOpen =  () => {
    setIsOpen((value: boolean) => !value);
  }
  const onRent = useCallback(() => {
    if(!currentUser) return loginModel.onOpen();
    rentModal.onOpen()
  }, [rentModal, currentUser, loginModel ])
  
  return (
    <div className='relative flex items-center gap-3' >
      <h3 onClick={onRent} className='text-[14px] font-[700] max-sm:hidden py-3 px-4 rounded-full hover:bg-neutral-100 duration-150 cursor-pointer' >
        Airbnb Your Home
      </h3>
      <div onClick={toggleOpen} className="relative border-[1px] shadow-sm py-1 px-2 justify-between items-center gap-3 w-fit rounded-full flex cursor-pointer hover:shadow-md">
        <BsList size={20} />
        <Image src='/images/user.jpg' width={35} height={35} alt='user icon' className='rounded-full' />
      </div>
      {
        isOpen && <div className="w-[200px] overflow-hidden bg-white shadow-xl absolute top-[50px] right-0 rounded-md">
          <ul className='list-none p-0 m-0'>
            {currentUser ?  (
              <>
                <li 
                  className='cursor-pointer font-[600] px-4 py-2 mb-2 hover:bg-gray-200 duration-200'
                  onClick={() => router.push('/trips')}
                >My trips</li>
                <li 
                  className='cursor-pointer font-[600] px-4 py-2 mb-2 hover:bg-gray-200 duration-200'
                  onClick={() => router.push('/favorites')}>My favorites</li>
                <li className='cursor-pointer font-[600] px-4 py-2 mb-2 hover:bg-gray-200 duration-200'>My reservations</li>
                <li 
                  className='cursor-pointer font-[600] px-4 py-2 mb-2 hover:bg-gray-200 duration-200'
                  onClick={() => router.push('/properties')}>My properties</li>
                <li className='cursor-pointer font-[600] px-4 py-2 hover:bg-gray-200 duration-200'>Airbnb my home</li>
                <hr />
                <li className='cursor-pointer font-[600] px-4 py-2 hover:bg-gray-200 duration-200' onClick={()=>signOut()}>Logout</li>
              </>
            ) : (<>
              <li className='cursor-pointer font-[600] px-4 py-2 mb-2 hover:bg-gray-200 duration-200' onClick={loginModel.onOpen}>Login</li>
              <li className='cursor-pointer font-[600] px-4 py-2 hover:bg-gray-200 duration-200' onClick={onOpen}>Sign Up</li>
            </>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default UserMenu