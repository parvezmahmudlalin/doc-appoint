import React from "react";
import DoctorCard from "../doctors/DoctorCard";
import Link from "next/link";

const TopDoctors = async () => {
  const res = await fetch("http://localhost:5000/doctors", {
    cache: "no-store",
  });

  const doctors = await res.json();

  const topDoctors = doctors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="badge badge-primary badge-outline px-4 py-3">
          Featured Specialists
        </span>

        <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
          Top Rated Doctors
        </h2>

        <p className="text-base-content/70 mt-4 text-lg">
          Connect with experienced healthcare professionals trusted by
          thousands of patients. Book appointments quickly and receive
          quality medical care.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topDoctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center mt-12">
        <Link
          href="/doctors"
          className="btn btn-primary btn-wide"
        >
          View All Doctors
        </Link>
      </div>
    </section>
  );
};

export default TopDoctors;