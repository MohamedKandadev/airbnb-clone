import React from 'react'
import { IconType } from 'react-icons';

interface categoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<categoryInputProps> = ({
  label,
  icon: Icon,
  selected,
  onClick
}) => {
  return (
    <div 
      onClick={() => onClick(label)} 
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected && 'border-black'}`} >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
    </div>
  )
}

export default CategoryInput