'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
      setHasMounted(true);
  }, [])

  if (!hasMounted) return <div className="bg-white flex justify-center items-center absolute w-[100vw] h-[100vh] top-0 left-0">
    <Image src='/images/logo.png' alt='logo' width='100' height='100' className='animate-bounce' />
  </div>;

  return (
    <>
      {children}
    </>
  );
};

export default ClientOnly;