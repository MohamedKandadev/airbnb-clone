'use client'
import React from 'react'
import Container from '../ui/Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'
import CategorieBox from './CategorieBox'
import { usePathname, useSearchParams } from 'next/navigation'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {}
export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!'
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  }
]

const Categories = (props: Props) => {
  const params = useSearchParams();
  const category = params?.get('category');

  const tl = gsap.timeline({});
  
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }
  
  
  // useGSAP(() => {
  
  //   tl.from(".categories", {
  //     delay: .5,
  //     opacity: 0,
  //     x: -20,
  //     duration: 1,
  //     ease: "expoScale(0.5,7,none)",
  //     stagger: 0.08 
  //   })

  // }, []);

  return (
    <Container>
      <div className="pt-2 flex justify-between items-center overflow-x-auto categories">
        {
          categories.map((item, index) => (
            <CategorieBox icon={item.icon} label={item.label} key={index} selected={category === item.label} timeline={tl} />
          ))
        }
      </div>
    </Container>
  )
}

export default Categories