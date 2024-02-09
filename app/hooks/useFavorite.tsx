import { User } from "@prisma/client";
import { MouseEvent, useCallback, useMemo } from "react";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listngId: string;
  currentUser: User;
}

const useFavorite = ({ currentUser, listngId }: IUseFavorite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();
  
  const hasFavorite = useMemo(() => {
    const listFavorites = currentUser.favoriteIds || [];
    return listFavorites.includes(listngId);
  }, [listngId, currentUser])

  const toggleFavorite = useCallback( async(
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    if(!currentUser) return onOpen;

    try{
      let request;
      if(hasFavorite){
        request = () => axios.post(`/api/favorites/${listngId}`)
      }else{
        request = () => axios.delete(`/api/favorites/${listngId}`)
      }
      await request();
      router.refresh();
      toast.success('Success');
    }catch(err) {
      toast.error('Something went wrong');
    }

  }, [
    currentUser,
    hasFavorite,
    router,
    listngId,
  ])
  
  return {hasFavorite, toggleFavorite}

}

export default useFavorite;