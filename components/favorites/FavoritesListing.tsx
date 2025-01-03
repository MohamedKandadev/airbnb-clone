import { Listing, User } from "@prisma/client";
import React, { FC } from "react";
import Container from "../ui/Container";
import Heading from "../ui/Heading";
import ListingCard from "../listings/ListingCard";
import { SafeListing, SafeUser } from "@/app/types";

interface FavoritesListingsProps {
  currentUser?: SafeUser | null | any;
  listings: SafeListing[] | any;
}

const FavoritesListing: FC<FavoritesListingsProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of place you have favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesListing;
