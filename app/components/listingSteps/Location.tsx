import React from 'react'
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import Heading from '../ui/Heading'
import CountrySelect from '../ui/inputs/CountrySelect'

import 'leaflet/dist/leaflet.css'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

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
      <MapContainer
        center={value?.latlng as L.LatLngExpression || [51, -0.09]} 
        zoom={value?.latlng ? 4 :2} 
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(
          value && <Marker position={value.latIng} />
        )}
      </MapContainer>
    </div>
  )
}

export default Location