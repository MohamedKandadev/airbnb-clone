'use client'

import React from 'react'
import Select from 'react-select';

import useCountries from '@/app/hooks/useCountries'

export type CountrySelectValue = {
  flag: string;
  label: string;
  latIng: number[],
  region: string;
  value: string
}

interface CountrySelectProps {
  value: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value, 
  onChange
}) => {
const {getAll, getByValue} = useCountries();
  
  return (
    <div className='z-3'>
      <Select 
        placeholder="Anywhere"
        options={getAll}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3' >
            <div className="">{option.flag}</div>
            <div className="text-[14px]">
              <span className='font-bold'>
                {option.label},
              </span>
              <span className="text-neutral-800 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default CountrySelect