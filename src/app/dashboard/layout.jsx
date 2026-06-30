import MobileNav from "@/components/dashboard/MobileNav";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata = {
  title: {
    default: "Dashboard | DocAppoint",
    template: "%s | Dashboard | DocAppoint",
  },

  description:
    "Manage appointments, schedules, and healthcare activities easily.",

  keywords: [
    "doctor appointment",
    "dashboard",
    "healthcare",
    "DocAppoint",
  ],

  robots: {
    index: false,
    follow: false,
  },

  openGraph: {
    title: "Dashboard | DocAppoint",
    description:
      "Manage appointments and healthcare activities.",
    images: ["/dashboard-preview.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dashboard | DocAppoint",
    description:
      "Manage appointments and healthcare activities.",
    images: ["/dashboard-preview.png"],
  },
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      <main className="flex-1">
        {children}
      </main>

      <MobileNav />
    </div>
  );
};

export default Layout;