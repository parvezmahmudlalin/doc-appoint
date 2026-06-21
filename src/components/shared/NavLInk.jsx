"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative transition-all duration-300 hover:text-blue-600 ${
        isActive
          ? "text-blue-600 font-semibold"
          : "text-slate-700"
      }`}
    >
      {children}

      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
          isActive ? "w-full" : "w-0"
        }`}
      />
    </Link>
  );
};

export default NavLink;