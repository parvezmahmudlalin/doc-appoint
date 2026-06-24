"use client";

import { Button, Input } from "@heroui/react";

import { useState } from "react";
import { toast } from "react-hot-toast";

const BookingEditForm = ({ booking, onCancel, setBookings }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: booking.patientName || "",
    phone: booking.phone || "",
    appointmentDate: booking.appointmentDate || "",
    appointmentTime: booking.appointmentTime || "",
    reason: booking.reason || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/booking/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        setBookings((prev) =>
          prev.map((item) =>
            item._id === booking._id
              ? {
                  ...item,
                  ...formData,
                }
              : item,
          ),
        );

        toast.success("Appointment updated successfully!");

        onCancel();
      } else {
        toast.error("No changes detected!");
      }
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div>
    <h2 className="font-bold text-2xl mb-5">
      Update Appointment
    </h2>

    <div className="grid grid-cols-2 gap-4">

      <Input
        label="Doctor"
        value={booking?.doctorName}
        readOnly
      />

      <Input
        label="Email"
        value={booking?.userEmail}
        readOnly
      />

      <Input
        label="Patient Name"
        value={formData.patientName}
        onChange={(e) =>
          handleChange("patientName", e.target.value)
        }
      />

      <Input
        label="Phone"
        value={formData.phone}
        onChange={(e) =>
          handleChange("phone", e.target.value)
        }
      />

      <Input
        type="date"
        label="Date"
        value={formData.appointmentDate}
        onChange={(e) =>
          handleChange(
            "appointmentDate",
            e.target.value
          )
        }
      />

      <Input
        type="time"
        label="Time"
        value={formData.appointmentTime}
        onChange={(e) =>
          handleChange(
            "appointmentTime",
            e.target.value
          )
        }
      />

      <div className="col-span-2">
        <Input
          label="Reason"
          value={formData.reason}
          onChange={(e) =>
            handleChange("reason", e.target.value)
          }
        />
      </div>

    </div>

    <div className="flex gap-3 mt-6">
      <Button
        isLoading={isLoading}
        onPress={handleSubmit}
        className="bg-blue-500 text-white"
      >
        Save
      </Button>

      <Button onPress={onCancel}>
        Cancel
      </Button>
    </div>
  </div>
);
};

export default BookingEditForm;
