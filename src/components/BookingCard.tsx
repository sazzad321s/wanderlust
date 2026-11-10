"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Destination } from "./DestinationsExplorer";
import { authClient } from "@/lib/auth-client";
import { email } from "better-auth";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const BookingCard = ({destination}:{destination:Destination}) => {

     const {data:session} = authClient.useSession()
    
      const user = session?.user;

    const handleBooking = async(e: React.SubmitEvent<HTMLElement>) => {
       e.preventDefault();
       const departureDate = e.target.departureDate.value
       const data = {
        userName: user?.name,
        image: user?.image,
        email: user?.email,
        ...destination,
        departureDate: departureDate,
        bookingDate: new Date()
       }

      const token = await getTokenFromClient();

      const res = await fetch("http://localhost:4000/bookings",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
                
        },
        body: JSON.stringify(data),
      })

      const bookingData = await res.json();
      console.log(bookingData);
    }

    return (
        <div>
             <aside className="h-fit rounded-xl border p-6 shadow-sm">
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="mt-1 text-4xl font-bold text-brand">
              ${destination.price}
            </p>
            <p className="text-sm text-muted-foreground">per person</p>

            <form onSubmit={handleBooking}>
            <div className="mt-5 rounded-md border px-3.5 py-2.5 text-sm">
              <input type="date"
              name="departureDate"
              aria-label="Departure date"
               defaultValue={destination.departureDate}
              />
            </div>

            <Button type="submit" className="mt-4 h-10 w-full gap-2 bg-brand! text-white hover:bg-brand/90!">
              Book Now
              <ArrowRight className="size-4" />
            </Button>
            </form>

            <div className="mt-5 space-y-2.5">
              {bookingPerks.map((perk) => (
                <p
                  key={perk}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Check className="size-3.5 shrink-0" />
                  {perk}
                </p>
              ))}
            </div>
          </aside>
        </div>
    );
};

export default BookingCard;