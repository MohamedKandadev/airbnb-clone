import React from 'react'

import Heading from '../ui/Heading';
import ImageUpload from '../ui/inputs/ImageUpload';

interface ImageProps {
  setCustomValue: (id: string, value: string) => void;
  imagesrc: string;
}

const Images: React.FC<ImageProps> = ({
  setCustomValue,
  imagesrc
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title='Add photo of your place' subTitle='Show guests what your place look like!' />
      <ImageUpload value={imagesrc} onChange={(value: string) => setCustomValue('imagesrc', value)} />
    </div>
  )
}

export default Images