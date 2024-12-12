import React, { FC } from 'react'
import { DateRange, Range } from 'react-date-range'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  value: Range;
  disabledDates?: Date[];
  onChangeDate: (value: any) => void
}


const Calendar: FC<CalendarProps> = ({
  value,
  disabledDates,
  onChangeDate
}) => {
  return (
    <DateRange 
      rangeColors={['#262626']}
      ranges={[value]}
      date={new Date()}
      onChange={onChangeDate}
      direction='vertical'
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />
  )
}

export default Calendar