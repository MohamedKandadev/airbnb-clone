import React from 'react'

interface HeadingProps {
  title: string;
  subTitle: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subTitle,
  center
}) => {
  return (
    <div className={` w-full ${center ? 'text-center' : 'text-start'}`}>
      <div className="text-bold text-black font-[600] text-[25px]">
        {title}
      </div>
      <div className="text-gray-700">
        {subTitle}
      </div>
    </div>
  )
}

export default Heading