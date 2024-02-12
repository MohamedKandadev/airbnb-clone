import React from 'react'

import Heading from '../ui/Heading'
import CountrySelect from '../ui/inputs/CountrySelect'
import Map from '../ui/Map'

interface LocationProps {
  onChange: (id: string, value: any) => void
  value: any
}

const Location: React.FC<LocationProps> = ({
  onChange,
  value
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading subTitle='Help Guests find you' title='Where your place located?' />
      <CountrySelect value={value} onChange={(value)=> onChange('location', value)} />
      <Map center={value?.latlng} />
    </div>
  )
}

export default Location