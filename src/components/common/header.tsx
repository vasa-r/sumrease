import { FilePen } from "lucide-react";
import NavLink from "@/components/common/nav-link";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "@/components/common/plan-badge";

const Header = () => {
  return (
    <nav className="container flex items-center justify-between px-2 py-4 mx-auto lg:px-8">
      <div className="flex items-center group">
        <NavLink
          href={"/"}
          className="flex items-center gap-1 lg:gap-2 shrink-0"
        >
          <FilePen className="w-5 h-5 lg:w-8 lg:h-8 group-hover:rotate-12 trans text-rose-500" />
          <h1 className="hidden font-bold text-gray-900 md:text-3xl font-caveat md:block">
            SumrEase
          </h1>
          <h1 className="text-lg font-bold text-gray-900 font-caveat md:hidden">
            SE
          </h1>
        </NavLink>
      </div>
      <div className="flex gap-4 text-sm md:text-base lg:justify-center lg:gap-12 lg:items-center">
        <NavLink href={"/#pricing"}>Pricing</NavLink>
        <SignedIn>
          <NavLink href={"/dashboard"}>Your Summaries</NavLink>
        </SignedIn>
      </div>
      <div className="flex md:justify-end">
        <SignedIn>
          <div className="flex items-center gap-2">
            <NavLink href={"/upload"}>Upload a PDF</NavLink>
            <PlanBadge />
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
