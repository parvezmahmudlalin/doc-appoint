import {
  ShieldCheck,
  CalendarCheck,
  Headphones,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: <BadgeCheck size={40} />,
    title: "Verified Specialists",
    description:
      "All doctors are carefully verified to ensure quality healthcare services.",
  },
  {
    icon: <CalendarCheck size={40} />,
    title: "Quick Appointments",
    description:
      "Book appointments within minutes with a seamless online experience.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Secure Records",
    description:
      "Your medical information remains private and securely protected.",
  },
  {
    icon: <Headphones size={40} />,
    title: "24/7 Assistance",
    description:
      "Our support team is always available whenever you need help.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="badge badge-primary badge-outline">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Why Patients Trust Our Platform
          </h2>

          <p className="mt-4 text-base-content/70">
            We simplify healthcare by connecting patients with trusted
            specialists through a secure and user-friendly platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="card bg-base-200 hover:shadow-2xl transition-all duration-300 border border-base-300"
            >
              <div className="card-body items-center text-center">
                <div className="text-primary">
                  {item.icon}
                </div>

                <h3 className="font-bold text-xl">
                  {item.title}
                </h3>

                <p className="text-sm text-base-content/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}