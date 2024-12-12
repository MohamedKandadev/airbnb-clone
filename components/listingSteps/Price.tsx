import React, { FC } from 'react'

import Heading from '../ui/Heading'
import Input from '../ui/inputs/Input'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface PriceProps {
  errors: FieldErrors
  register: UseFormRegister<FieldValues>
}

const Price: FC<PriceProps> = ({
  errors,
  register
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title='Now, set your price.' subTitle='How much do you charge per night?' />
      <Input formatPrice id='price' type='number' label='Price' placeholder='Price' required errors={errors} register={register} />
    </div>
  )
}

export default Price