"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Award, ArrowUpRight } from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    id,
    name,
    specialty,
    image,
    experience,
    hospital,
    location,
    rating,
    availability,
    fee,
  } = doctor;
  const doctorId = _id || id;

  return (
    <div className="group relative bg-white rounded-[28px] overflow-hidden shadow-[0_2px_12px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)] transition-all duration-500 border border-slate-100 hover:border-transparent flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={`${name} - ${specialty}`}
          fill
          className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/0 pointer-events-none" />

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Star size={15} className="text-amber-500 fill-amber-500" />
          <span className="font-semibold text-slate-800 text-sm tabular-nums">
            {rating}
          </span>
        </div>

        {/* Name & specialty overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white/90 bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
              <Award size={12} />
              {experience}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
            {name}
          </h3>
          <p className="text-sm font-medium text-sky-300 mt-0.5">{specialty}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          {/* Hospital & Location */}
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center">
              <MapPin size={14} className="text-sky-600" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {hospital}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{location}</p>
            </div>
          </div>

          {/* Availability */}
          {availability?.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400 mb-2 font-semibold">
                Next Available
              </p>
              <div className="flex flex-wrap gap-1.5">
                {availability.slice(0, 2).map((time, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full"
                  >
                    <Clock size={12} />
                    {time}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
          {fee ? (
            <div>
              <span className="text-[11px] text-slate-400 font-medium">
                Consultation
              </span>
              <p className="text-xl font-bold text-slate-900 leading-tight">
                ৳{fee}
              </p>
            </div>
          ) : (
            <div />
          )}

          <Link
            href={`/appointments/${doctorId}`}
            className="group/btn inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-sky-600 text-white text-sm font-semibold px-5 py-3 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.97] whitespace-nowrap"
          >
            View Details
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
