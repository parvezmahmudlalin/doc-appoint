import HealthInsights from "@/components/homepage/HealthInsights";
import Hero from "@/components/homepage/Hero";
import TopDoctors from "@/components/homepage/TopDoctors";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";

export const metadata = {
  title: "DocAppoint - Book Doctors Online",

  description:
    "Book doctor appointments online with DocAppoint. Find experienced specialists, manage schedules, and get healthcare services easily.",

  keywords: [
    "doctor appointment",
    "online doctor booking",
    "healthcare",
    "medical consultation",
    "specialist doctor",
    "DocAppoint",
  ],

  openGraph: {
    title: "DocAppoint - Book Doctors Online",
    description:
      "Find experienced doctors and schedule appointments quickly.",
    images: ["/home-preview.png"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "DocAppoint - Book Doctors Online",
    description:
      "Find experienced doctors and schedule appointments quickly.",
    images: ["/home-preview.png"],
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <TopDoctors />
      <WhyChooseUs />
      <HealthInsights />
    </div>
  );
}