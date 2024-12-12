'use client'

import React, { FC } from 'react'
import Heading from './Heading';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface emptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<emptyStateProps> = ({
  title = 'No exact matches',
  subTitle = 'Try changing or removing some of your filters',
  showReset
}) => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col justify-center items-center gap-4 h-[60vh] w-full">
      <Heading title={title} subTitle={subTitle} center />
      <div className="mt-4 w-48">
        {
          showReset && <Button outline label='Remove all filters' onClick={() => router.push('/')} />
        }
      </div>
    </div>
  )
}

export default EmptyState