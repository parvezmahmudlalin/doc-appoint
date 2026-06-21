// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   FiGrid,
//   FiCalendar,
//   FiUser,
//   FiLogOut,
//   FiMenu,
//   FiX,
// } from "react-icons/fi";
// import { useState } from "react";

// const navLinks = [
//   {
//     name: "Overview",
//     href: "/dashboard",
//     icon: FiGrid,
//   },
//   {
//     name: "My Bookings",
//     href: "/dashboard/my-bookings",
//     icon: FiCalendar,
//   },
//   {
//     name: "My Profile",
//     href: "/dashboard/my-profile",
//     icon: FiUser,
//   },
// ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Topbar */}
//       <div className="lg:hidden h-16 px-4 border-b bg-white flex items-center justify-between">
//         <h2 className="text-xl font-bold text-sky-600">
//           DocAppoint
//         </h2>

//         <button
//           onClick={() => setOpen(true)}
//           className="text-2xl"
//         >
//           <FiMenu />
//         </button>
//       </div>

//       {/* Overlay */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed lg:static top-0 left-0 z-50
//           h-screen w-72 bg-white border-r shadow-lg
//           flex flex-col
//           transform transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//         `}
//       >
//         {/* Logo */}
//         <div className="h-16 border-b px-6 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-sky-600">
//               DocAppoint
//             </h1>
//             <p className="text-xs text-gray-500">
//                Dashboard
//             </p>
//           </div>

//           <button
//             onClick={() => setOpen(false)}
//             className="lg:hidden text-2xl"
//           >
//             <FiX />
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-2">
//           {navLinks.map((item) => {
//             const active = pathname === item.href;
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setOpen(false)}
//                 className={`
//                   flex items-center gap-3
//                   px-4 py-3 rounded-xl
//                   transition-all duration-200
//                   ${
//                     active
//                       ? "bg-sky-500 text-white shadow-md"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }
//                 `}
//               >
//                 <Icon className="text-xl" />
//                 <span className="font-medium">
//                   {item.name}
//                 </span>
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t">
//           <button
//             className="
//               w-full flex items-center gap-3
//               px-4 py-3 rounded-xl
//               text-red-500 hover:bg-red-50
//               transition
//             "
//           >
//             <FiLogOut className="text-xl" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }







"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiCalendar, FiUser, FiLogOut } from "react-icons/fi";

const links = [
  { name: "Overview", href: "/dashboard", icon: FiGrid },
  { name: "My Bookings", href: "/dashboard/my-bookings", icon: FiCalendar },
  { name: "My Profile", href: "/dashboard/my-profile", icon: FiUser },
];

export default function Sidebar() {
  const pathname = usePathname();

 const userData = authClient.useSession();
  const user = userData.data?.user;
  const handleSignOut = async () => {
      await authClient.signOut();
     
    };

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

      {/* Logout */}
      <div className="p-4 border-t">
       {
        user &&  <Button variant="ghost" className="flex items-center gap-2 text-red-500" onClick={handleSignOut}>
          <FiLogOut />
          Logout
        </Button>
       }
      </div>

    </aside>
  );
}