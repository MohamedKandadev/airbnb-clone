'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useRef } from 'react'

import gsap from "gsap";
import { useGSAP } from "@gsap/react";


interface LogoProps {
  ease: any;
  timeline: any;
}

const Logo = ({
  ease,
  timeline
}: LogoProps) => {
  const router = useRouter();
  const logo = useRef(null);
  
  useGSAP(() => {
    timeline.from('.nav-logo', {
      duration: .5,
      opacity: 0,
      x: -100  
    })
  });

  return (
    <Image 
      src='/images/logo.png' 
      alt='logo' 
      onClick={() => router.push('/')} 
      className='hidden md:block cursor-pointer nav-logo' 
      width='100' 
      height='100' 
      ref={logo}
    />
  )
}

export default Logo