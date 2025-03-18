"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        `text-sm text-gray-600 transition-colors duration-200 hover:text-rose-500`,
        className,
        isActive && `text-rose-500`
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
