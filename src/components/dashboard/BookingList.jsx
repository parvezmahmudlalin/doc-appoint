"use client";

import { useState } from "react";
import BookingCard from "./BookingCard";

const BookingList = ({ initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings);

  if (bookings.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-20">
        No bookings found.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {bookings.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          setBookings={setBookings}
        />
      ))}
    </div>
  );
};

export default BookingList;