import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingList from "@/components/dashboard/BookingList";
import { authClient } from "@/lib/auth-client";

const MyBookingPage = async () => {
    const {token} = await auth.api.getToken({
    headers: await headers()
  })   
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`http://localhost:5000/booking/${user?.id}`, {
   headers: {
    authorization: `Bearer ${token}`
   },
  });

  const bookings = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      <BookingList initialBookings={bookings}/>
    </div>
  );
};

export default MyBookingPage;