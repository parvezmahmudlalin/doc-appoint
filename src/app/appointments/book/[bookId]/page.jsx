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
import { authClient, useSession } from "@/lib/auth-client";

const BookingsPage = () => {
  const { data: session, isLoading: sessionLoading } = useSession();

  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const { bookId } = useParams();

  useEffect(() => {
    if (!bookId) return;

    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);

        const { data: tokenData } = await authClient.token();

        const res = await fetch(
          `http://localhost:5000/appointments/${bookId}`,
          {
            headers: {
              authorization: `Bearer ${tokenData?.token}`,
            },
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message);
        }

        const data = await res.json();

        setDoctor(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    if (!gender) {
      toast.error("Please select gender");
      return;
    }

    try {
      setIsLoading(true);

      const { data: tokenData } = await authClient.token();

      const finalBooking = {
        userId: session.user.id,
        userEmail: session.user.email,
        doctorName: doctor?.name || "",

        patientName: formData.patientName,
        gender,
        phone: formData.phone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formatTime12Hour(
          formData.appointmentTime
        ),
        reason: formData.reason,

        bookId,
      };

      const res = await fetch(
        "http://localhost:5000/booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(finalBooking),
        }
      );

      const data = await res.json();

      if (data?.success || data?.insertedId) {
        toast.success(
          "Appointment booked successfully!"
        );

        setFormData({
          patientName: "",
          phone: "",
          appointmentDate: "",
          appointmentTime: "",
          reason: "",
        });

        setGender("");
      } else {
        toast.error(
          data?.message || "Booking failed"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  if (sessionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <form
          onSubmit={onSubmit}
          className="bg-white shadow-lg rounded-3xl p-8 md:p-10 space-y-8"
        >

          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold">
              Book Appointment
            </h1>

            {loadingDoctor ? (
              <p>Loading doctor...</p>
            ) : (
              <p className="text-xl text-emerald-600 font-semibold">
                {doctor?.name}
              </p>
            )}

            {session?.user && (
              <p>
                Booking as:{" "}
                {session.user.name ||
                  session.user.email}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <TextField>
              <Label>Patient Name</Label>

              <Input
                value={formData.patientName}
                onChange={(e) =>
                  handleChange(
                    "patientName",
                    e.target.value
                  )
                }
                placeholder="Enter name"
              />
            </TextField>

            <div>
              <Label>Gender</Label>

              <Select
                aria-label="Gender"
                selectedKeys={
                  gender ? [gender] : []
                }
                onSelectionChange={(keys) =>
                  setGender(
                    Array.from(keys)[0] || ""
                  )
                }
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {[
                      "Male",
                      "Female",
                      "Other",
                    ].map((g) => (
                      <ListBox.Item
                        key={g}
                      >
                        {g}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField>
              <Label>Phone</Label>

              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  handleChange(
                    "phone",
                    e.target.value
                  )
                }
                placeholder="017xxxxxxx"
              />
            </TextField>

            <TextField>
              <Label>Date</Label>

              <Input
                type="date"
                min={today}
                value={
                  formData.appointmentDate
                }
                onChange={(e) =>
                  handleChange(
                    "appointmentDate",
                    e.target.value
                  )
                }
              />
            </TextField>

            <TextField>
              <Label>Time</Label>

              <Input
                type="time"
                value={
                  formData.appointmentTime
                }
                onChange={(e) =>
                  handleChange(
                    "appointmentTime",
                    e.target.value
                  )
                }
              />
            </TextField>

            <div className="md:col-span-2">
              <TextField>
                <Label>Reason</Label>

                <TextArea
                  value={formData.reason}
                  onChange={(e) =>
                    handleChange(
                      "reason",
                      e.target.value
                    )
                  }
                  placeholder="Describe problem..."
                />
              </TextField>
            </div>

          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            disabled={
              loadingDoctor ||
              !doctor ||
              !session?.user
            }
            className="w-full bg-cyan-600 text-white"
          >
            Confirm Booking
          </Button>

        </form>
      </div>
    </div>
  );
};

export default BookingsPage;