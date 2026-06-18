const BookingPage = async ({ params }) => {
  const { bookId } = await params;

  const res = await fetch(
    `http://localhost:5000/appointments/${bookId}`,
    { cache: "no-store" }
  );

  const doctor = await res.json();

  return (
    <div>
      <h1>Book Appointment</h1>
      <h2>{doctor.name}</h2>
      <p>{doctor.specialty}</p>
    </div>
  );
};

export default BookingPage;