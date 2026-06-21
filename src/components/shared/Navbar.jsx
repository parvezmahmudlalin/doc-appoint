"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, Button } from "@heroui/react";
import {
  Stethoscope,
  Home,
  Calendar,
  LayoutDashboard,
  LogIn,
  UserPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/appointments", label: "All Appointments", icon: Calendar },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    handleClose();
  };

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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {!user ? (
              <>
                <Link href="/login">
                  <Button
                    startContent={<LogIn size={15} />}
                    variant="bordered"
                    size="sm"
                    className="px-4 border-sky-200 text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition"
                  >
                    Log in
                  </Button>
                </Link>

                <Link href="/register">
                  <Button
                    startContent={<UserPlus size={15} />}
                    size="sm"
                    className="px-4 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Link href={"/dashboard/my-profile"}>
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <Avatar.Image
                    alt={user?.name}
                    src={user?.image}
                    referrerPolicy="no-referrer"
                  />
                  <Avatar.Fallback>
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>

                <span className="text-[13.5px] font-medium text-gray-700 max-w-[120px] truncate">
                  {user?.name}
                </span>

              <Button
  onClick={handleSignOut}
  startContent={<LogOut size={14} />}
  size="sm"
  className="text-white font-medium rounded-lg
             bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700
             shadow-md hover:shadow-lg
             hover:scale-[1.02] active:scale-[0.98]
             transition-all duration-200 border-0"
>
  Logout
</Button>
              </div></Link>
            )}
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
            open ? "max-h-[480px] pb-4" : "max-h-0"
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

            {/* Mobile Auth Section */}
            <div className="flex flex-col gap-2 mt-4">
              {!user ? (
                <>
                  <Link href="/login" onClick={handleClose}>
                    <Button
                      startContent={<LogIn size={15} />}
                      variant="bordered"
                      className="w-full border-sky-200 text-sky-600 font-medium rounded-lg"
                    >
                      Log in
                    </Button>
                  </Link>

                  <Link href="/register" onClick={handleClose}>
                    <Button
                      startContent={<UserPlus size={15} />}
                      className="w-full bg-sky-600 text-white font-medium rounded-lg"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                 <Link href={"/dashboard/my-profile"}>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt={user?.name}
                        src={user?.image}
                        referrerPolicy="no-referrer"
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {user?.name}
                    </span>
                  </div>
                 </Link>

                  <Button
                    onClick={handleSignOut}
                    startContent={<LogOut size={14} />}
                    color="danger"
                    variant="bordered"
                    className="w-full rounded-lg"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
