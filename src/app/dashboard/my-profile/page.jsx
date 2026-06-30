"use client";

import UpdateProfile from "@/components/dashboard/UpdateProfile";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card, Chip } from "@heroui/react";
import { Mail, User, ShieldCheck, Calendar, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";



const ProfilePage = () => {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;

  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);
  const [countError, setCountError] = useState(false);

  // Fetch dynamic appointments count
  useEffect(() => {
    const fetchAppointmentsCount = async () => {
       const { data: tokenData } = await authClient.token();
      if (!user?.email) return;

      try {
        setLoadingCount(true);
        setCountError(false);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/appointments/book`,  {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const bookings = Array.isArray(data) ? data : [];
        
        // Count only this user's bookings (filter by email)
        const userBookings = bookings.filter(
          (b) => b.userEmail === user.email || b.patientEmail === user.email
        );
        
        setAppointmentsCount(userBookings.length);
      } catch (err) {
        console.error(err);
        setCountError(true);
      } finally {
        setLoadingCount(false);
      }
    };

    if (user?.email) {
      fetchAppointmentsCount();
    }
  }, [user?.email]);

  // Loading State
  if (isPending || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">

        <Card className="overflow-hidden border-none shadow-2xl rounded-3xl bg-white/80 backdrop-blur-lg">

          {/* Cover */}
          <div className="relative h-48 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="px-6 md:px-10 pb-10">

            {/* Avatar & Info */}
            <div className="flex flex-col items-center -mt-16">
              <Avatar className="h-32 w-32 border-[6px] border-white shadow-xl">
                {user?.image ? (
                  <Avatar.Image
                    src={user.image}
                    alt={user.name || "user"}
                    referrerPolicy="no-referrer"
                  />
                ) : null}

                <Avatar.Fallback>
                  {user?.name?.charAt(0) || "U"}
                </Avatar.Fallback>
              </Avatar>

              <h1 className="text-3xl font-bold mt-5">
                {user?.name || "Unknown User"}
              </h1>

              <p className="text-gray-500 mt-1">
                {user?.email || "No email"}
              </p>

              <Chip color="primary" variant="flat" className="mt-4 px-3">
                DocAppoint Member
              </Chip>
            </div>

            {/* Quick Stats - Dynamic Appointments */}
            <div className="grid md:grid-cols-3 gap-4 mt-10">
              <div className="rounded-2xl p-5 bg-sky-50 border">
                <div className="flex items-center gap-3">
                  <Calendar className="text-sky-600" />
                  <div>
                    <p className="text-sm text-gray-500">Appointments</p>
                    <h3 className="font-bold text-xl">
                      {loadingCount ? "..." : appointmentsCount}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-green-50 border">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Membership</p>
                    <h3 className="font-bold text-xl">Active</h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-purple-50 border">
                <div className="flex items-center gap-3">
                  <User className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Profile Status</p>
                    <h3 className="font-bold text-xl">Complete</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-5">
                Account Information
              </h2>

              <div className="grid gap-4">
                <div className="rounded-2xl border p-5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <User className="text-sky-600" />
                    <span className="text-gray-500">Full Name</span>
                  </div>
                  <span className="font-semibold">{user?.name}</span>
                </div>

                <div className="rounded-2xl border p-5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Mail className="text-sky-600" />
                    <span className="text-gray-500">Email</span>
                  </div>
                  <span className="font-semibold break-all">
                    {user?.email}
                  </span>
                </div>

                <div className="rounded-2xl border p-5 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-green-600" />
                    <span className="text-gray-500">Membership</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Update Profile Button */}
            <div className="flex justify-center mt-10">
              <UpdateProfile />
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
};

export default ProfilePage;