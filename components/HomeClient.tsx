"use client";

import gsap from "gsap";
import ListingCard from "../components/listings/ListingCard";
import ClientOnly from "../components/ui/ClientOnly";
import Container from "../components/ui/Container";
import EmptyState from "../components/ui/EmptyState";

interface HomeClientProps {
  listings: any[]; // Replace with your actual type
  currentUser: any; // Replace with your actual type
}

export default function HomeClient({ listings, currentUser }: HomeClientProps) {
  if (listings.length === 0)
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );

  const tl = gsap.timeline({});

  return (
    <ClientOnly>
      <Container>
        <div className="pt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl::grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              data={listing}
              key={listing.id}
              currentUser={currentUser}
              tl={tl}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
