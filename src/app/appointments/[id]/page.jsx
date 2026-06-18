import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaHospital,
  FaUserMd,
  FaCalendarCheck,
} from "react-icons/fa";
import { MdLocationOn, MdAccessTime } from "react-icons/md";

const DoctorDetailsPage = async ({ params }) => {
  const { id } = await params;   // ← Important: await করতে হবে

  const res = await fetch(`http://localhost:5000/appointments/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-red-500 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600">The doctor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const doctor = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-5 gap-10 p-8 md:p-12">
            
            {/* Doctor Image */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-[2.75rem] opacity-10 group-hover:opacity-20 transition-all" />
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={420}
                  height={420}
                  className="rounded-3xl object-cover w-80 h-80 md:w-96 md:h-96 shadow-2xl ring-8 ring-white"
                  priority
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="md:col-span-3 space-y-6 flex flex-col">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-xl text-blue-600 mt-2 font-medium flex items-center gap-2">
                  <FaUserMd className="text-2xl" />
                  {doctor.specialty}
                </p>
              </div>

              <div className="space-y-3 text-gray-600">
                <p className="flex items-center gap-3 text-lg">
                  <FaHospital className="text-xl text-gray-700" />
                  {doctor.hospital}
                </p>
                <p className="flex items-center gap-3 text-lg">
                  <MdLocationOn className="text-xl text-gray-700" />
                  {doctor.location}
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-6 border-t border-gray-100">
                <div>
                  <p className="flex items-center gap-1.5 text-3xl font-semibold text-yellow-500">
                    <FaStar /> {doctor.rating}
                  </p>
                  <p className="text-sm text-gray-500">Rating</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-gray-800">{doctor.experience}</p>
                  <p className="text-sm text-gray-500">Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-emerald-600">{doctor.fee}৳</p>
                  <p className="text-sm text-gray-500">Fee</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 mt-auto">
                <Link
                  href={`/appointments/book/${doctor.id}`}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.97] shadow-lg shadow-emerald-500/30"
                >
                  <FaCalendarCheck />
                  Book Appointment
                </Link>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-8 rounded-2xl transition-all active:scale-[0.97]">
                  Quick Consult
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description + Availability */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          {/* About Doctor */}
          <div className="md:col-span-2 bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-5 text-gray-900">About Doctor</h2>
            <p className="text-gray-600 leading-relaxed text-[17px]">
              {doctor.description}
            </p>
          </div>

          {/* Availability */}
          <div className="bg-white p-8 rounded-3xl shadow-lg h-fit">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <MdAccessTime className="text-2xl" />
              Available Slots
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {doctor.availability?.map((time, index) => (
                <div
                  key={index}
                  className="px-5 py-4 text-center border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-2xl cursor-pointer transition-all text-sm font-medium"
                >
                  {time}
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center">
              * Slots are subject to change according to availability
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;