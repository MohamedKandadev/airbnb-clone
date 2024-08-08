'use client'
import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons'
import qs from 'query-string';
import { useGSAP } from '@gsap/react';

interface CategorieBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  timeline: any
}

const CategorieBox: React.FC<CategorieBoxProps> = ({
  icon: Icon, 
  label,  
  selected, 
  timeline
}) => {
  const router = useRouter()
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if(params){
      currentQuery = qs.parse(params.toString());
    }

    const updateQuery: any = {
      ...currentQuery,
      category:label
    }

    if(params?.get('category') === label){
      delete updateQuery.category;
    }
    
    const url = qs.stringifyUrl({
      url: '/',
      query: updateQuery
    }, {skipNull: true})

    router.push(url)
  }, [label, router, params])
  

  return (
    <div className={`categorie flex flex-col justify-center items-center border-b-2 gap-2 p-3 hover:text-neutral-800 transition cursor-pointer 
    ${selected ? 'text-neutral-800 border-neutral-800' : 'text-neutral-500 border-transparent'}`} onClick={handleClick}>
      <Icon size={26} />
      <div className="text-sm font-medium">
        {label}
      </div>
    </div>
  )
}

export default CategorieBox