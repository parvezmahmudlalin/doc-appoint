"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";

import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";

const BookingsPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const [gender, setGender] = useState("");

  const params = useParams();
  const bookId = params?.id || params?.bookId;


  useEffect(() => {
    if (!bookId) return;

    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);

        const res = await fetch(`http://localhost:5000/appointments/${bookId}`);

        const data = await res.json();

        setDoctor(data?.data || data);
      } catch (error) {
        console.log(error);
        toast.error("Doctor load failed");
      } finally {
        setLoadingDoctor(false);
      }
    };

    fetchDoctor();
  }, [bookId]);

  const formatTime12Hour = (time24) => {
    if (!time24) return "";

    const [h, m] = time24.split(":");

    let hour = parseInt(h, 10);

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${String(hour).padStart(2, "0")}:${m} ${period}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const booking = Object.fromEntries(formData.entries());

    if (!gender) {
      toast.error("Please select gender");
      return;
    }

    setIsLoading(true);

    const finalBooking = {
      userEmail: "user@gmail.com",
      doctorName: doctor?.name || "Unknown Doctor",
      patientName: booking.patientName,
      gender,
      phone: booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: formatTime12Hour(booking.appointmentTime),
      reason: booking.reason || "",
      bookId,
    };

    try {
      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalBooking),
      });

      const data = await res.json();

      if (data?.success || data?.insertedId) {
        toast.success("Booking successful!");

        form.reset();
        setGender("");
      } else {
        toast.error("Booking failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error!");
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-5 mx-auto max-w-7xl">
      <form onSubmit={onSubmit} className="p-10 space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Book Appointment</h1>

          {loadingDoctor ? (
            <p>Loading doctor...</p>
          ) : doctor ? (
            <p className="text-green-600 font-semibold">{doctor.name}</p>
          ) : (
            <p className="text-red-500">Doctor not found</p>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Patient Name */}
          <TextField name="patientName" isRequired>
  <Label>Patient Name</Label>
  <Input placeholder="Your name" />
</TextField>

{/* Gender */}
<div>
  <Label>Gender</Label>
  
  <Select
    aria-label="Gender"           
    placeholder="Select Gender"
    value={gender}
    onChange={(selected) => setGender(selected || "")}
  >
    <Select.Trigger className="w-full">
      <Select.Value />
    </Select.Trigger>

    <Select.Popover>
      <ListBox>
        {["Male", "Female", "Other"].map((g) => (
          <ListBox.Item key={g} id={g} textValue={g}>
            {g}
          </ListBox.Item>
        ))}
      </ListBox>
    </Select.Popover>
  </Select>
</div>

{/* Phone */}
<TextField name="phone" isRequired>
  <Label>Phone</Label>
  <Input type="tel" placeholder="017XXXXXXXX" />
</TextField>

{/* Date */}
<TextField name="appointmentDate" isRequired>
  <Label>Date</Label>
  <Input type="date" min={today} />
</TextField>

{/* Time */}
<TextField name="appointmentTime" isRequired>
  <Label>Time</Label>
  <Input type="time" />
</TextField>

{/* Reason */}
<div className="md:col-span-2">
  <TextField name="reason">
    <Label>Reason for Appointment</Label>   
    <TextArea placeholder="Write your problem..." />
  </TextField>
</div>
        </div>

        {/* BUTTON */}
        <Button
          type="submit"
          className="w-full bg-cyan-500 text-white rounded-none"
          isLoading={isLoading}
          disabled={loadingDoctor || !doctor}
        >
          Book Appointment
        </Button>
      </form>
    </div>
  );
};

export default BookingsPage;
