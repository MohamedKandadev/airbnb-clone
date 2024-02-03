import React, { FC } from 'react'
import { IconType } from 'react-icons';

interface buttonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: FC<buttonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-89
        w-full
        transition
        ${outline ? 'border-black text-black bg-white' : 'bg-rose-500 text-white border-red-500'}
        ${small ? 'py-2 border-[1px] text-sm font-[600]' : 'py-3 border-[2px] text-lg font-[700]'}
      `}
    >
      {
        Icon && <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      }
      {label}
    </button>
  )
}

export default Button