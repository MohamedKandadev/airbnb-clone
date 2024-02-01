import React from 'react'

type cotainerProps = {
  children: React.ReactNode
}

function Container({ children }: cotainerProps) {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
      { children }
    </div>
  )
}

export default Container