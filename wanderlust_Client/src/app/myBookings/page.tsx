import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
            ✈️
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Bookings
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Please log in to view and manage your travel bookings.
          </p>
          <a
            href="/login"
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Log in to continue
          </a>
        </div>
      </main>
    );
  }

  const res = await fetch(
    `http://localhost:5000/myBookings/${encodeURIComponent(user.email)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load bookings");
  }

  const bookings = await res.json();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <section className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              YOUR TRAVEL DASHBOARD
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              My Bookings<span className="text-blue-600">.</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your reservations and get ready for your next adventure.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              🧳
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                Total reservations
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {bookings.length}
              </p>
            </div>
          </div>
        </section>

        {/* Booking List */}
        {bookings.length === 0 ? (
          <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center sm:py-20">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-4xl">
              🌍
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Your next adventure awaits
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              You haven't made any bookings yet. Explore destinations and
              find your next unforgettable trip.
            </p>
            <a
              href="/destinations"
              className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Explore destinations →
            </a>
          </section>
        ) : (
          <div className="space-y-5">
            {bookings.map(
              (
                booking: {
                  _id: string;
                  name: string;
                  price: number | string;
                  departureDate: string;
                  bookingDate: string;
                },
                index: number
              ) => (
                <article
                  key={booking._id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Destination Image */}
                    <div className="relative h-56 shrink-0 overflow-hidden md:h-auto md:min-h-[250px] md:w-[280px] lg:w-[320px]">
                      <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85"
                        alt="Scenic travel destination"
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                        <span className="mr-1.5">✈</span>
                        Travel reservation
                      </div>
                    </div>

                    {/* Booking Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-7">
                      <div>
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Booking saved
                          </span>

                          <span className="text-xs font-medium text-slate-400">
                            Booking #{booking._id.slice(-6).toUpperCase()}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
                          {booking.name}
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                              📅
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-400">
                                Departure date
                              </p>
                              <p className="mt-1 text-sm font-semibold text-slate-700">
                                {new Date(
                                  `${booking.departureDate}T12:00:00`
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg">
                              🕒
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-400">
                                Booking date
                              </p>
                              <p className="mt-1 text-sm font-semibold text-slate-700">
                                {new Date(
                                  booking.bookingDate
                                ).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="mt-7 flex flex-col gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-xs font-medium text-slate-400">
                            Total trip cost
                          </p>
                          <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">
                            ৳{Number(booking.price).toLocaleString("en-BD")}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <a
                            href={`/destinations`}
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                          >
                            View trips
                          </a>

                          <span
                            title="Cancellation is not connected to the backend yet"
                            className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-400"
                          >
                            Cancel
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}

        {/* Footer Note */}
        {bookings.length > 0 && (
          <p className="mt-7 text-center text-xs leading-5 text-slate-400">
            Keep your booking details handy when preparing for your trip.
          </p>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;