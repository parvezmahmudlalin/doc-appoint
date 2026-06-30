"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const BookingDeleteButton = ({ bookingId, setBookings }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
     const { data: tokenData } = await authClient.token();
    const confirmed = confirm(
      "Are you sure you want to delete this appointment?",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
         
          authorization: `Bearer ${tokenData?.token}`,
        },
       
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
     size="sm"
     variant="danger"
      isLoading={isDeleting}
      onPress={handleDelete}
      className=" font-medium rounded-lg px-4 transition-colors mt-5"
    >
      <Trash2 /> Delete
    </Button>
  );
};

export default BookingDeleteButton;
