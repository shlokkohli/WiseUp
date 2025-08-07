'use client'

import { ReactNode } from "react"
import Link from "next/link"
import { FaFire } from "react-icons/fa"
import { IoMdCheckmark } from "react-icons/io"
import { Button } from "./MyUi/Button"


export function PremiumCard() {
  return (
    <div className="card m-10 border-2 flex flex-col gap-4 border-violet-500 shadow-2xl shadow-pink-400 rounded-2xl p-7">
    <h2 className="text-4xl flex items-center gap-5 text-gradient font-semibold">Pro<span className="bg-gradient-to-br from-violet-600 via-violet-500 to-pink-500 py-1 px-5 rounded-full shadow-inner font-thin flex items-center gap-3 text-white text-sm shadow-pink-200"><span><FaFire/></span> Popular</span></h2>
    <div>
    <h3 className="text-4xl">$1</h3>
    <p className="text-sm text-gray-600">Per month, billed annually</p>
    </div>
    <h4 className="text-sm font-semibold text-gray-600">To Keep an eye on your expenses</h4>
    <ul className="flex flex-col max-w-[250px] gap-2">
      <Tab>Filter Payment methods</Tab>
      <Tab>Unlimited transaction records per day</Tab>
      <Tab>Weekly analysis</Tab>
      <Tab>Day to day analysis</Tab>
      <Tab>Track of total amount spent</Tab>
      <Tab>Set Budget</Tab>
      <Tab>AI analysis</Tab>
      <Tab>Manage Subscriptions</Tab>
    </ul>
    <Link href='/subscribe' className="mx-auto my-5 w-full">
    <Button className="w-full flex items-center justify-center gap-2"><span><FaFire/></span> Get Pro</Button>
    </Link>
  </div>
  )
}


export function Tab ({children}: {children: ReactNode}) {
  return (
    <li className="flex items-center gap-2">
      <span className="bg-white font-semibold text-green-500 rounded-full p-1"><IoMdCheckmark/></span>
      {children}
    </li>
  )

}
