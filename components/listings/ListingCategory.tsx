import React, { FC } from 'react'
import { IconType } from 'react-icons';

interface ListingCategoryProps {
  description: string;
  label: string;
  icon: IconType
}

const ListingCategory: FC<ListingCategoryProps> = ({
  description,
  label,
  icon: Icon
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className='text-neutral-600' />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            {label}
          </div>
          <div className="font-light text-neutral-500">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory