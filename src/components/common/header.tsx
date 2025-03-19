import { FilePen } from "lucide-react";
import NavLink from "./nav-link";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex items-center group">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FilePen className="w-5 h-5 lg:w-8 lg:h-8 group-hover:rotate-12 trans text-rose-500" />
          <h1 className="md:text-3xl font-caveat font-bold text-gray-900 hidden md:block">
            SumrEase
          </h1>
          <h1 className="text-lg font-caveat font-bold text-gray-900 md:hidden">
            SE
          </h1>
        </NavLink>
      </div>
      <div className="flex text-sm md:text-base lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex md:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <div>Pro</div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href={"/sign-in"}>Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;
