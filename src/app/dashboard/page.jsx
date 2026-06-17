import Link from "next/link";

export default function DashboardPage() {
 
  const stats = [
    { title: "My Bookings", value: 12, color: "bg-blue-400" },
    { title: "Pending", value: 3, color: "bg-yellow-400" },
    { title: "Completed", value: 7, color: "bg-green-400" },
    { title: "Cancelled", value: 2, color: "bg-red-400" },
  ];

  const appointments = [
    {
      id: 1,
      doctor: "Dr. John Smith",
      date: "20 June 2026",
      time: "5:00 PM",
      status: "Pending",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Khan",
      date: "22 June 2026",
      time: "3:30 PM",
      status: "Confirmed",
    },
    {
      id: 3,
      doctor: "Dr. Ahmed Rahman",
      date: "25 June 2026",
      time: "1:00 PM",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Good Morning 👋
        </h1>
        <p className="text-gray-500">
          Welcome back to your dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl text-white shadow-md ${item.color}`}
          >
            <h2 className="text-sm">{item.title}</h2>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Upcoming Appointments
          </h2>
          <Link
            href="/dashboard/bookings"
            className="text-blue-500 text-sm hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{app.doctor}</h3>
                <p className="text-sm text-gray-500">
                  {app.date} • {app.time}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  app.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : app.status === "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/doctors"
          className="p-5 bg-blue-500 text-white rounded-xl text-center shadow hover:bg-blue-600"
        >
          Browse Doctors
        </Link>

        <Link
          href="/appointments/book/1"
          className="p-5 bg-green-500 text-white rounded-xl text-center shadow hover:bg-green-600"
        >
          Book Appointment
        </Link>

        <Link
          href="/dashboard/profile"
          className="p-5 bg-gray-800 text-white rounded-xl text-center shadow hover:bg-gray-900"
        >
          My Profile
        </Link>
      </div>

    </div>
  );
}