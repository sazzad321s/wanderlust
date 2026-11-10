import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import MyBooking from "@/components/MyBooking";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

export const dynamic = "force-dynamic";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;

  let bookings: unknown[] = [];
  const token = await getTokenFromServer();
  if (user?.email) {
    const res = await fetch(`http://localhost:4000/my-bookings/${user?.email}`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    if (res.ok) {
      const data: unknown = await res.json();
      // The API sends a bare array; keep a fallback for a `{ value: [...] }` wrapper.
      bookings =
        Array.isArray(data)
          ? data
          : ((data as { value?: unknown[] })?.value ?? []);
    }
  }

  return (
    <div className="flex-1 px-4 py-12 md:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-lg border-2 border-dashed border-brand/60 p-4 md:p-6">
          <h1 className="text-2xl font-light tracking-tight md:text-3xl">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground md:text-base">
            Manage and view your upcoming travel plans
          </p>

          {bookings.length === 0 ? (
            <p className="mt-8 py-16 text-center text-sm text-muted-foreground">
              No upcoming bookings.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              {bookings.map((booking) => (
                <MyBooking
                  key={(
                    booking as { _id?: string; bookingId?: string; id?: string }
                  )._id ||
                    (booking as { bookingId?: string }).bookingId ||
                    (booking as { id?: string }).id}
                  booking={booking as { _id?: string; bookingId?: string; id?: string; destinationId?: string; destinationName?: string; imageUrl?: string; image?: string; status?: string; departureDate?: string; price?: string | number }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;
