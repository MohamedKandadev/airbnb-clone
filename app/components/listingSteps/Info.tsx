import React from 'react'
import Heading from '../ui/Heading';
import Counter from '../ui/inputs/CounterInput';

interface infoProps {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (id: string, value: any) => void;
}

const Info: React.FC<infoProps> = ({
  guestCount,
  roomCount,
  bathroomCount,
  setCustomValue,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title='Share some basics about your place' subTitle='what amenties do you have?' />
      <Counter value={guestCount} title='Guests' subTitle='How many guests do you allow?' onClick={(value: number) => setCustomValue('guestCount', value)}  />
      <hr />
      <Counter value={roomCount} title='Rooms' subTitle='How many rooms do you have?' onClick={(value: number) => setCustomValue('roomCount', value)}  />
      <hr />
      <Counter value={bathroomCount} title='Bathrooms' subTitle='How many bathrooms do you have?' onClick={(value: number) => setCustomValue('bathroomCount', value)}  />
    </div>
  )
}

export default Info