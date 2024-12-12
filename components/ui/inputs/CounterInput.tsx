import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface counterProps {
  title: string;
  subTitle: string;
  value: number;
  onClick: (value: number) => void;
}

const CounterInput: React.FC<counterProps> = ({
  title,  
  subTitle, 
  value,  
  onClick,  
}) => {
  const onAdd =useCallback(() => {
    if(value < 5)
      onClick(value + 1);
  }, [value, onClick])
  const onReduce =useCallback(() => {
    if(value > 1)
      onClick(value - 1);
  }, [value, onClick])
  
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col">
        <h3 className="font-bold">
          {title}
        </h3>
        <p className="font-light text-neutral-600">
          {subTitle}
        </p>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <div onClick={onAdd} className="w-10 h-10 rounded-full border-[1px] border-neutral-800 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
          <AiOutlinePlus />
        </div>
        <div className="font-light text-xl text-neutral-600">
          {value}
        </div>
        <div onClick={onReduce} className="w-10 h-10 rounded-full border-[1px] border-neutral-800 flex justify-center items-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
          <AiOutlineMinus />
        </div>
      </div>
    </div>
  )
}

export default CounterInput