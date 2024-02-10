import getCurrentUser from "./actions/getCurrentUser";
import { getListings } from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import ClientOnly from "./components/ui/ClientOnly";
import Container from "./components/ui/Container";
import EmptyState from "./components/ui/EmptyState";

export default async  function  Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if(listings.length === 0) return <ClientOnly >
    <EmptyState showReset />
  </ClientOnly>
  
  return (
    <ClientOnly>
      <Container>
        <div className="pt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl::grid-cols-6 gap-8">
          {
            listings && listings.map((listing) => (
              <ListingCard data={listing} key={listing.id} currentUser={currentUser} />
            ))
          }
        </div>
      </Container>
    </ClientOnly>
  );
}
