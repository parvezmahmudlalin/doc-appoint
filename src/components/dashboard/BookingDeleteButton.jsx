"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const BookingDeleteButton = ({ bookingId, setBookings }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        setBookings((prev) => prev.filter((item) => item._id !== bookingId));

        toast.success("Appointment deleted successfully!");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      isLoading={isDeleting}
      onPress={handleDelete}
      className="bg-red-500 text-white"
    >
      Delete
    </Button>
  );
};

export default BookingDeleteButton;
