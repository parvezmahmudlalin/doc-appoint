"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiCalendar, FiUser, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

const links = [
  { name: "Overview", href: "/dashboard", icon: FiGrid },
  { name: "My Bookings", href: "/dashboard/my-bookings", icon: FiCalendar },
  { name: "My Profile", href: "/dashboard/my-profile", icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  const { data } = authClient.useSession();
  const user = data?.user;

  // ✅ hydration safe guard
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // ✅ IMPORTANT: prevent SSR mismatch
  if (!mounted) return null;

  return (
    <aside className="hidden lg:flex w-72 h-screen bg-white border-r flex-col">
      {/* Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
              ${
                active
                  ? "bg-sky-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout (NO HeroUI Button) */}
      <div className="p-4 border-t">
        {user && (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
          >
            <FiLogOut />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
}
