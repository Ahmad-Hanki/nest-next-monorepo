"use client";
import { useAuthStatus } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Profile } from "./profile";
const Navbar = () => {
  const { isLoggedIn } = useAuthStatus();
  const pathname = usePathname();
  return (
    <>
      <h1 className="text-2xl font-bold p-2">My Modern Blog</h1>
      <div className="md:ml-auto  px-2 flex flex-col md:flex-row gap-2 md:items-center md:justify-center [&>a:hover]:bg-sky-500 [&>a:hover]:text-sky-100 [&>a]:rounded-md [&>a]:transition [&>a]:duration-200 [&>a]:px-4 md:[&>a]:py-2 [&>a]:py-1 ">
        <Link href="/" className="">
          Blog
        </Link>
        <Link href="#about" className="">
          About
        </Link>
        <Link href="#contact" className="">
          Contact
        </Link>

        {isLoggedIn ? (
          <Profile />
        ) : (
          <Link href={`/auth/signin?redirect=${encodeURIComponent(pathname)}`}>
            Sign In
          </Link>
        )}
      </div>
    </>
  );
};

export { Navbar };
