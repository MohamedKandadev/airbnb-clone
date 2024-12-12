"use client";

import React, { FC, useCallback, useState } from "react";
import { Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../ui/Heading";
import Container from "../ui/Container";
import ListingCard from "../listings/ListingCard";
import { SafeReservation, SafeUser } from "@/types";

interface TripsClientProps {
  currentUser: SafeUser | null | any;
  reservations: SafeReservation[] | any;
}

const TripsClient: FC<TripsClientProps> = ({ currentUser, reservations }) => {
  const router = useRouter();
  const [deletetingId, setDeletingId] = useState("");

  console.log(reservations);

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservations cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Trips" subTitle="Where you've been where you're going" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            actionLabel="Cancel reservation"
            disabled={deletetingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
