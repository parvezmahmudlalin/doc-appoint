"use client";

import { CalendarPlus, Sparkles } from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const WelcomeBanner = () => {
  const { data } = authClient.useSession();

  const user = data?.user;

  return (
    <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 p-8 md:p-10 shadow-xl">

      {/* Decorative circles */}
      <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute left-1/2 bottom-0 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md mb-4">

            <Sparkles size={16} />

            Welcome Back

          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Hello, {user?.name || "User"} 👋
          </h1>

          <p className="mt-3 text-sky-100 max-w-xl leading-relaxed">
            Manage your appointments, track bookings and stay connected
            with trusted healthcare professionals.
          </p>
        </div>

        <Link href="/appointments">

          <Button
            size="lg"
            startContent={<CalendarPlus size={18} />}
            className=" text-sky-700 font-semibold rounded-2xl hover:scale-[1.03] transition-all"
          >
            Book Appointment
          </Button>

        </Link>

      </div>
    </div>
  );
};

export default WelcomeBanner;