"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    name,
    specialty,
    image,
    experience,
    hospital,
    location,
    rating,
    availability,
  } = doctor;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      
      {/* Image Section */}
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold">
            {rating || "4.8"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        
        {/* Name & Specialty */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {name}
          </h2>
          <p className="text-sky-600 font-medium">
            {specialty}
          </p>
        </div>

        {/* Info */}
        <div className="text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <Clock size={14} /> {experience} Experience
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} /> {hospital}
          </p>
        </div>

        {/* Availability */}
        <div className="flex flex-wrap gap-2">
          {availability?.slice(0, 2).map((time, idx) => (
            <span
              key={idx}
              className="text-xs bg-sky-50 text-sky-600 px-3 py-1 rounded-full border border-sky-100"
            >
              {time}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link
          href={`/doctor/${_id}`}
          className="block text-center mt-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;