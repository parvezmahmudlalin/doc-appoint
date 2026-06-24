"use client";

import { useState } from "react";
import { Button, Chip } from "@heroui/react";
import BookingEditForm from "./BookingEditForm";
import BookingDeleteButton from "./BookingDeleteButton";

const BookingCard = ({ booking, setBookings }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col md:flex-row md:items-center gap-5">
        
        {/* Left accent bar */}
        <div className="absolute left-0 top-4 bottom-4 w-1 bg-sky-500 rounded-full" />

        {/* Avatar + Info */}
        <div className="flex items-start gap-4 flex-1 pl-3">
          
          {/* Avatar */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-lg uppercase">
            {booking.patientName?.charAt(0)}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2 className="font-semibold text-gray-900 text-base truncate">
                {booking.patientName}
              </h2>
              <Chip size="sm" className="bg-sky-50 text-sky-700 border border-sky-200 text-xs font-medium">
                Patient
              </Chip>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2">
              <InfoRow icon="🩺" label="Doctor" value={booking.doctorName} />
              <InfoRow icon="📞" label="Phone" value={booking.phone} />
              <InfoRow icon="📅" label="Date" value={booking.appointmentDate} />
              <InfoRow icon="✉️" label="Email" value={booking?.userEmail} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-row md:flex-col gap-2 md:items-end pl-3 md:pl-0">
          <Button
            size="sm"
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg px-4 transition-colors"
            onPress={() => setShowEdit(true)}
          >
            ✏️ Edit
          </Button>
          <BookingDeleteButton
            bookingId={booking._id}
            setBookings={setBookings}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-semibold text-gray-900">Edit Appointment</h3>
                <p className="text-sm text-gray-400 mt-0.5">{booking.patientName}</p>
              </div>
              <button
                onClick={() => setShowEdit(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <BookingEditForm
                booking={booking}
                setBookings={setBookings}
                onCancel={() => setShowEdit(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper component
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-1.5 text-sm text-gray-600 truncate">
    <span className="text-base leading-none">{icon}</span>
    <span className="text-gray-400 font-medium shrink-0">{label}:</span>
    <span className="text-gray-700 truncate">{value || "—"}</span>
  </div>
);

export default BookingCard;