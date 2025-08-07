"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboardIcon,
  UserRound,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";
import { MdSubscriptions } from "react-icons/md";

export default function MobileSidebar() {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);

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
      label: "Buy Premium",
      icon: <CreditCard className="w-5 h-5 mr-2" />,
    },
    {
          href: "/mandates",
          label: "Recurring Payments",
          icon: <IoTimerOutline className="w-5 h-5 mr-2" />,
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
    <div className="relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 m-2 text-gray-700 hover:text-gray-900"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="text-lg font-semibold text-gray-800">WiseUp</h4>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-2">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
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
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-colors mt-2"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  );
}
