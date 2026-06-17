"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiCalendar, FiUser } from "react-icons/fi";

const links = [
  { name: "Home", href: "/dashboard", icon: FiGrid },
  { name: "Bookings", href: "/dashboard/my-bookings", icon: FiCalendar },
  { name: "Profile", href: "/dashboard/my-profile", icon: FiUser },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">

      {links.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center text-xs"
          >
            <Icon
              className={`text-xl ${
                active ? "text-sky-600" : "text-gray-500"
              }`}
            />
            <span className={active ? "text-sky-600" : "text-gray-500"}>
              {item.name}
            </span>
          </Link>
        );
      })}

    </div>
  );
}