"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

const BookingForm = ({ doctor }) => {
  const [form, setForm] = useState({
    patientName: "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      userEmail: "user@gmail.com",
      doctorName: doctor.name,
      patientName: form.patientName,
      gender: form.gender,
      phone: form.phone,
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Appointment booked successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <input
        name="patientName"
        placeholder="Patient Name"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <select
        name="gender"
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="date"
        name="appointmentDate"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <input
        type="time"
        name="appointmentTime"
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2"
      >
        Confirm Booking
      </button>

    </form>
  );
};

export default BookingForm;