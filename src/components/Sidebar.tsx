'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  UserRound,
  CreditCard,
  LogOut,
} from "lucide-react";
import { MdSubscriptions } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { useClerk } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const links = [
    {
      href: "/profile",
      label: "Profile",
      icon: <UserRound className="w-5 h-5 mr-2" />,
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboardIcon className="w-5 h-5 mr-2" />,
    },
    {
      href: "/premium",
      label: "Go Pro",
      icon: <CreditCard className="w-5 h-5 mr-2" />,
    },
    {
      href: "/mandates",
      label: "Recurring Payments",
      icon: <IoTimerOutline className="w-5 font-bold h-5 mr-2" />,
    },
    {
      href: "/ai-analysis",
      label: "AI Analysis",
      icon: <BsStars className="w-5 h-5 mr-2" />,
    },
    {
      href: "/sub-history",
      label: "Subscription History",
      icon: <MdSubscriptions className="w-5 h-5 mr-2" />,
    },
    
  ];

  return (
    <div className="bg-gray-50 h-full w-full p-4">
      <div className="w-full p-2 my-2 rounded-lg flex gap-3 items-center">
        <h4 className="text-lg font-semibold text-gray-800">WiseUp</h4>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {icon}
            {label}
          </Link>
        ))}

        <button
          onClick={() => signOut()}
          className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-colors mt-2"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </button>
      </nav>
    </div>
  );
}
