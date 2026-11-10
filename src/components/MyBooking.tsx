"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CircleCheck, Clock, Eye, Ticket, Trash } from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


export interface Booking {
  _id?: string;
  id?: string;
  bookingId?: string;
  destinationId?: string;
  destinationName?: string;
  imageUrl?: string;
  image?: string;
  status?: string;
  departureDate?: string;
  price?: string | number;
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "—";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const MyBooking = ({ booking }: { booking: Booking }) => {


  const destinationId = booking.destinationId || booking._id || booking.id;
  const bookingRef = booking.bookingId || booking.id || booking._id || "—";
  const imageSrc = booking.imageUrl || booking.image;
  const price = booking.price != null ? `$${booking.price}` : "—";

  const isConfirmed = (booking.status ?? "Confirmed").toLowerCase() === "confirmed";

  const handleCancel = async () => {
    const token = await getTokenFromClient();
    const res = await fetch(`http://localhost:4000/my-bookings/${booking._id}`,{
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    console.log(data)
     redirect('/my-bookings')
  };

  return (
    <article className="rounded-xl border bg-card p-2.5 shadow-sm md:p-3">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Image */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:aspect-auto sm:min-h-36 sm:self-stretch sm:w-56 md:w-64">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={booking.destinationName ?? "Destination"}
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No image
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-1 flex-col">
          <Badge
            className={cn(
              "gap-1",
              isConfirmed
                ? "bg-emerald-100 text-emerald-600"
                : "bg-amber-100 text-amber-600"
            )}
          >
            {isConfirmed ? <CircleCheck /> : <Clock />}
            {isConfirmed ? "Confirmed" : "Pending"}
          </Badge>

          <h3 className="mt-2 text-xl font-bold tracking-tight">
            {booking.destinationName ?? "Untitled Trip"}
          </h3>

          {/* Departure date and Booking ID */}
          <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4 shrink-0" />
              <span>Departure: {formatDate(booking.departureDate)}</span>
            </p>
            <p className="flex items-center gap-2">
              <Ticket className="size-4 shrink-0" />
              <span>Booking ID: {bookingRef}</span>
            </p>
          </div>

          {/* Price + actions */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
            <p className="text-2xl font-bold text-brand">{price}</p>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash className="size-3.5" />
                cancel
              </Button>

              <Link href={`/destinations/${destinationId}`}>
                <Button size="sm" className="bg-brand text-white hover:bg-brand/80">
                  <Eye className="size-3.5" />
                  View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyBooking;
