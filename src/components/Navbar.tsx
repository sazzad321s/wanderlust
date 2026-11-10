'use client';
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@base-ui/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "/admin" },
];

const authLinks = [
  { label: "Login", href: "/login" },
  { label: "Sign Up", href: "/signup" },
];

export default function Navbar() {

  const {data:session} = authClient.useSession()

  const user = session?.user;
  console.log(user);

  const handleSignOut = () => {
    authClient.signOut();
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="relative mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6">
        <ul className="hidden items-center gap-6 text-sm text-neutral-800 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`transition-colors hover:text-brand ${
                  link.href === "/" ? "text-brand" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src="/Wanderlast.png"
            alt="Wanderlast"
            width={162}
            height={24}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-5 text-sm text-neutral-800 md:flex">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <User className="size-4" />
              Profile
            </Link>
          </li>

          {
            user ?  <Popover>
  <PopoverTrigger render={<Avatar>
  <AvatarImage referrerPolicy="no-referrer" src={user?.image as string} />
  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
</Avatar>}>
    
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>{user?.name}</PopoverTitle>
      <PopoverDescription>
        <p>{user?.email}</p>
         <button className="text-red-500" onClick={handleSignOut}>SignOut</button>
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>  : <>

 {authLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}

</>
          }

       

         
        </ul>
      </nav>
    </header>
  );
}
