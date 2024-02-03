'use client'

import { FaSearch } from 'react-icons/fa'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className='border-[1px] shadow-sm rounded-full pl-6 pr-2 py-2 flex cursor-pointer items-center overflow-hidden '>
      <div className='pr-6 text-[13px] font-[700] border-r-[1px]'>Anywhere</div>
      <div className='px-6 text-[13px] font-[700] border-r-[1px]'>Any week</div>
      <div className='pl-6 text-[13px] font-[700] text-gray-500 flex items-center gap-2'>
        Add Guests
        <div className='w-[30px] h-[30px] rounded-full bg-red-500 text-white flex justify-center items-center '>
          <FaSearch />
        </div>
      </div>
    </div>
  )
}

export default Search