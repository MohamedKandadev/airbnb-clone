import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: FieldErrors
  register: UseFormRegister<FieldValues>
}

const Input: React.FC<InputProps> = ({
  id, 
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  errors,
  register,
  placeholder
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      <input 
        type={type} 
        disabled={disabled} 
        id={id} 
        {...register(id, {required})} 
        placeholder={placeholder} 
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-black'} ${formatPrice && 'pl-8'}`}
      />
    </div>
  )
}

export default Input