import React from 'react'
import Heading from '../ui/Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../ui/inputs/CategoryInput'

interface CategoryProps {
  setCustomValue: (id: string, label: string) => void;
  category: string;
}

const Category: React.FC<CategoryProps> = ({
  setCustomValue,
  category
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading subTitle='Pick a category' title='Which of these best describes your place?' />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
        {categories.map((item)=>(
          <CategoryInput 
            label={item.label} 
            icon={item.icon} 
            key={item.label} 
            onClick={(category: string) => setCustomValue('category', category)} 
            selected={category === item.label}
          />
        ))}
      </div>
    </div>
  )
}

export default Category