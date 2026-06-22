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
import { useSession } from "@/lib/auth-client";   // ← Changed here

const BookingsPage = () => {
  const { data: session, isLoading: sessionLoading } = useSession(); // ← Best way

  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("");

  const params = useParams();
  const bookId = params?.id || params?.bookId;

  // Fetch Doctor
  useEffect(() => {
    if (!bookId) return;

    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);
        const res = await fetch(`http://localhost:5000/appointments/${bookId}`);
        
        if (!res.ok) throw new Error("Doctor not found");
        
        const data = await res.json();
        setDoctor(data?.data || data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load doctor information");
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

    if (!session?.user) {
      toast.error("Please login to book an appointment");
      return;
    }

    if (!gender) {
      toast.error("Please select your gender");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const booking = Object.fromEntries(formData.entries());

    setIsLoading(true);

    const finalBooking = {
      userEmail: session.user.email,
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalBooking),
      });

      const data = await res.json();

      if (data?.success || data?.insertedId) {
        toast.success("Appointment booked successfully!");
        form.reset();
        setGender("");
      } else {
        toast.error(data?.message || "Booking failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (sessionLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading session...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={onSubmit} className="bg-white shadow-lg rounded-3xl p-8 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-gray-900">Book Appointment</h1>
            
            {loadingDoctor ? (
              <p className="text-gray-500">Loading doctor details...</p>
            ) : doctor ? (
              <p className="text-xl font-semibold text-emerald-600">{doctor.name}</p>
            ) : (
              <p className="text-red-500">Doctor information not found</p>
            )}

            {session?.user && (
              <p className="text-sm text-gray-500">
                Booking as: <span className="font-medium">{session.user.name || session.user.email}</span>
              </p>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField name="patientName" isRequired>
              <Label>Patient Full Name</Label>
              <Input placeholder="Enter your full name" />
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

            <TextField name="phone" isRequired>
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="017XXXXXXXX" />
            </TextField>

            <TextField name="appointmentDate" isRequired>
              <Label>Appointment Date</Label>
              <Input type="date" min={today} />
            </TextField>

            <TextField name="appointmentTime" isRequired>
              <Label>Preferred Time</Label>
              <Input type="time" />
            </TextField>

            <div className="md:col-span-2">
              <TextField name="reason">
                <Label>Reason / Problem</Label>
                <TextArea placeholder="Describe your symptoms or reason for visit..." rows={4} />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3.5 text-lg rounded-2xl transition-all"
            isLoading={isLoading}
            disabled={loadingDoctor || !doctor || !session?.user}
          >
            Confirm Booking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default BookingsPage;