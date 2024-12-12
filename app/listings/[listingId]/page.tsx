import React from "react";

import { getListingById } from "@/actions/getListingById";
import ClientOnly from "@/components/ui/ClientOnly";
import EmptyState from "@/components/ui/EmptyState";
import ListingClient from "../../../components/listings/ListingClient";
import { getReservations } from "@/actions/getReservations";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing)
    <ClientOnly>
      <EmptyState />
    </ClientOnly>;

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
