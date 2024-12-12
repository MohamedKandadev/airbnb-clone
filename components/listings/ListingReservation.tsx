'use client'

import React, { FC } from 'react';
import { Range } from 'react-date-range'
import Calendar from '../ui/inputs/Calendar';
import Button from '../ui/Button';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: any) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[]
}

const ListingReservation: FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          ${price}
        </div>
        <div className="text-neutral-600 font-light">
          night
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChangeDate={(value: any) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button label='Reserve' disabled={disabled} onClick={() => onSubmit()} />
      </div>
      <hr />
      <div className="flex flex-row justify-between items-center font-semibold text-lg p-4">
        <div className="">Total</div>
        <div className="">$ {totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation