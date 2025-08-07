'use client'

import MobileSidebar from "@/components/MobileSidebar";
import Sidebar from "@/components/Sidebar";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient';  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="flex md:flex-row flex-col">
            <div className="lg:w-[18%] overflow-y-hidden max-h-screen w-0 hidden md:flex">
                <Sidebar/>
            </div>
            <div className="md:hidden">
              <MobileSidebar/>
            </div>
            <div className="lg:w-[82%] h-screen overflow-y-scroll w-full md:flex">
                {children}
            </div>
        </div>
    </QueryClientProvider>
  );
}
