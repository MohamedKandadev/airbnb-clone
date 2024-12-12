import { User } from "@prisma/client";
import React, { FC } from "react";

import ListingCategory from "./ListingCategory";
import { IconType } from "react-icons";
import Map from "../ui/Map";
import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/app/types";

interface ListingInfoProps {
  currentUser?: SafeUser | null;
  guestCount: number;
  roomCount: number;
  bathRoomCount: number;
  description: string;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  country: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
  currentUser,
  bathRoomCount,
  guestCount,
  roomCount,
  category,
  description,
  country,
}) => {
  const { getByValue } = useCountries();
  const coord = getByValue(country);

  return (
    <div className="mt-10 flex flex-col gap-4 col-span-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row">
          <div className="font-bold text-xl">Hosted by {currentUser?.name}</div>
        </div>
        <div className="flex items-center gap-3 font-light text-sm text-neutral-500">
          <div className="">{guestCount} Guests</div>
          <div className="">{roomCount} Rooms</div>
          <div className="">{bathRoomCount} Bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          description={category.description}
          label={category.label}
          icon={category.icon}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coord?.latIng} />
    </div>
  );
};

export default ListingInfo;
