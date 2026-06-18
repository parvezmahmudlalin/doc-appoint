"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Stethoscope,
  Home,
  Calendar,
  LayoutDashboard,
  UserPlus,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/appointments", label: "All Appointments", icon: Calendar },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[68px] flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={handleClose}
          >
            <div className="w-[38px] h-[38px] bg-sky-600 rounded-[10px] flex items-center justify-center shadow-sm">
              <Stethoscope size={20} className="text-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-[17px] font-semibold text-sky-600 leading-none tracking-tight">
                DocAppoint
              </span>
              <span className="text-[10.5px] text-gray-400 uppercase tracking-[0.4px] mt-0.5">
                Book Doctors · Save Time
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 flex-1 ml-6">
            <ul className="flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-1.5 px-3 py-[7px] text-sm rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-sky-50 text-sky-600 font-medium shadow-sm"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                      }`}
                    >
                      <Icon size={15} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/login"
              className="px-4 py-[7px] text-[13.5px] border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="flex items-center gap-1.5 px-4 py-[7px] text-[13.5px] bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition"
            >
              <UserPlus size={14} />
              Register
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-[400px] pb-4" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-100 pt-3 mt-2">

            {/* Links */}
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={handleClose}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                        isActive
                          ? "bg-sky-50 text-sky-600 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <Link
                href="/login"
                onClick={handleClose}
                className="w-full text-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Log in
              </Link>

              <Link
                href="/register"
                onClick={handleClose}
                className="w-full text-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <UserPlus size={14} />
                  Register
                </span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;