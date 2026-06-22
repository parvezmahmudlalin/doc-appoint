"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Trash2, Stethoscope, User, AlertCircle } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

const MyBookingPage = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:5000/appointments/book");

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/appointments/book/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to cancel");

      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success("Appointment cancelled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel appointment. Please try again.");
    }
  };

  // Fallback image
  const getDoctorImage = (booking) => {
    return booking?.imageUrl || booking?.doctorImage || "/default-doctor.jpg"; // Add a default image in public folder
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage your upcoming doctor appointments
          </p>
          {session?.user?.name && (
            <p className="text-sm text-gray-400 mt-1">
              Welcome back, {session.user.name.split(" ")[0]}
            </p>
          )}
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 mb-8 flex items-center gap-3">
            <AlertCircle size={22} />
            <p>{error}</p>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-white border border-gray-100 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && bookings.length === 0 && !error && (
          <div className="text-center py-24 bg-white border border-gray-100 rounded-3xl">
            <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Stethoscope size={42} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700">No appointments yet</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              You haven't booked any appointments yet. Book your first appointment now!
            </p>
          </div>
        )}

        {/* BOOKINGS LIST */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((b, index) => (
              <div
                key={b._id}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Doctor Image */}
                  <div className="md:w-80 h-64 md:h-auto relative bg-gray-100">
                    <Image
                      src={getDoctorImage(b)}
                      alt={b.doctorName || "Doctor"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-7 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900">
                            {b.doctorName || "Doctor"}
                          </h2>
                          <p className="flex items-center gap-2 text-gray-500 mt-1">
                            <Stethoscope size={18} />
                            {b.specialty || "General Physician"}
                          </p>
                        </div>

                        {/* Status */}
                        {b.status && (
                          <span
                            className={`px-4 py-1.5 text-sm font-medium rounded-full ${
                              b.status.toLowerCase() === "confirmed"
                                ? "bg-emerald-100 text-emerald-700"
                                : b.status.toLowerCase() === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {b.status}
                          </span>
                        )}
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <User size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">PATIENT</p>
                            <p className="font-medium">{b.patientName || session?.user?.name}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <Calendar size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">DATE</p>
                            <p className="font-medium">{b.date || b.appointmentDate || "N/A"}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <Clock size={18} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">TIME</p>
                            <p className="font-medium">{b.time || b.appointmentTime || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        Booking ID: {b._id?.slice(-8)}
                      </p>

                      <button
                        onClick={() => handleDelete(b._id)}
                        className="flex items-center gap-2 px-5 py-2.5 text-red-600 hover:bg-red-50 rounded-2xl transition-all hover:text-red-700"
                      >
                        <Trash2 size={18} />
                        <span className="font-medium">Cancel Appointment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;