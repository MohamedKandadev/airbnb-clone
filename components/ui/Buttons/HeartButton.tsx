import useFavorite from "@/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";
import React, { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HearButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}

const HeartButton: FC<HearButtonProps> = ({ currentUser, listingId }) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      className="relative hover:opacity-70 transition cursor-pointer"
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px] "
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
