import { User } from "@prisma/client";
import { MouseEvent, useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SafeUser } from "../types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ currentUser, listingId }: IUseFavorite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();

  const hasFavorite = useMemo(() => {
    const listFavorites = currentUser?.favoriteIds || [];
    return listFavorites.includes(listingId);
  }, [listingId, currentUser])

  const toggleFavorite = useCallback( async(
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    if(!currentUser) return onOpen;

    try{
      let request;
      if(hasFavorite){
        request = () => axios.delete(`/api/favorites/${listingId}`)
      }else{
        request = () => axios.post(`/api/favorites/${listingId}`)
      }
      await request();
      router.refresh();
      toast.success('Success');
    }catch(err) {
      toast.error('Something went wrong');
      console.log(err)
    }

  }, [
    currentUser,
    hasFavorite,
    router,
    listingId,
    onOpen
  ])
  
  return {hasFavorite, toggleFavorite}

}

export default useFavorite;