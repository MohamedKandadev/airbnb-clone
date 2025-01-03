"use client";

import { FaSearch } from "react-icons/fa";
import React, { useMemo } from "react";
import useSearchModal from "@/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { differenceInDays } from "date-fns";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {};

const Search = (props: Props) => {
  const { onOpen } = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValue(locationValue)?.label;
    return "Anywhere";
  }, [getByValue, locationValue]);
  const guestCountLabel = useMemo(() => {
    if (guestCount) return `${guestCount} Guests`;
    return "Add Guests";
  }, [guestCount]);
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      let diff = differenceInDays(
        new Date(endDate as string),
        new Date(startDate as string)
      );
      if (diff === 0) diff = 1;
      return `${diff} days`;
    }
    return "Any week";
  }, [getByValue, locationValue, startDate, endDate]);

  useGSAP(() => {
    gsap.from(".nav-search", {
      delay: 0.2,
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: "expo.inOut",
    });
  });

  return (
    <div
      className="border-[1px] shadow-sm rounded-full pl-6 pr-2 py-2 flex cursor-pointer items-center overflow-hidden nav-search"
      onClick={() => onOpen()}
    >
      <div className="pr-6 text-[13px] font-[700] border-r-[1px]">
        {locationLabel}
      </div>
      <div className="px-6 text-[13px] font-[700] border-r-[1px]">
        {durationLabel}
      </div>
      <div className="pl-6 text-[13px] font-[700] text-gray-500 flex items-center gap-2">
        {guestCountLabel}
        <div className="w-[30px] h-[30px] rounded-full bg-red-500 text-white flex justify-center items-center ">
          <FaSearch />
        </div>
      </div>
    </div>
  );
};

export default Search;
