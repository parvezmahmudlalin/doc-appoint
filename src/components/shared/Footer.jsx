"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  Stethoscope,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#BFDDE0] mt-20">

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* LOGO */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
               <div className="w-[50px] h-[50px] bg-sky-600 rounded-[10px] flex items-center justify-center shadow-sm">
              <Stethoscope size={20} className="text-white" />
            </div>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 ">
                DocAppoint
              </h2>
            </div>

            <p className="text-slate-700 leading-relaxed">
              Book appointments with trusted doctors anytime,
              anywhere. Fast, secure and convenient healthcare.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className=" md:ml-11">
            <h3 className="text-xl font-semibold text-slate-900 mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-700">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/find-doctors">Find Doctors</Link></li>
              <li><Link href="/appointments">Appointments</Link></li>
              <li><Link href="/departments">Departments</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-slate-700">
              <li>Online Booking</li>
              <li>Video Consultation</li>
              <li>Emergency Support</li>
              <li>Doctor Reviews</li>
              <li>Medical Records</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-slate-700">

              <div className="flex gap-3">
                <MapPin size={18} />
                <span>Mymensingh, Bangladesh</span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <span>+880 1700-000000</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>support@docappointment.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-500/40 mt-12 pt-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <p className="text-slate-700">
              © 2026 DocAppointment. All Rights Reserved.
            </p>

            <div className="flex gap-6 text-slate-700">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex items-center gap-2 text-slate-900 hover:opacity-80"
            >
              Back to top
              <ArrowUpRight size={18} />
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
}