import React, { FC } from 'react'

import Heading from '../ui/Heading'
import Input from '../ui/inputs/Input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface descriptionProps {
  errors: FieldErrors
  register: UseFormRegister<FieldValues>
}

const Description: FC<descriptionProps> = ({
  errors,
  register
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title='How would you describe your place?' subTitle='Short and sweet works bests!' />
      <Input id='title' label='Title' placeholder='Title' required errors={errors} register={register} />
      <hr />
      <Input id='description' label='Description' placeholder='Description' required errors={errors} register={register} />
    </div>
  )
}

export default Description