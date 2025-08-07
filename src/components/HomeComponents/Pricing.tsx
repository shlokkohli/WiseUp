import { ReactNode } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "../MyUi/Button";
import { RxCross1 } from "react-icons/rx";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
export default function Pricing() {
  return (
    <div id="pricing" className="flex flex-col">
      <div className="mx-auto flex flex-col gap-2 items-center justify-center my-10 text-center w-11/12 lg:w-[40%]">
        <h2 className="text-4xl font-mitr font-semibold text-violet-600">Plans and Pricing</h2>
        <p className="text-center text-sm text-gray-700">Handle your monthly subscription and get detailed analysis of your spending with our pro plan.</p>
      </div>
    <div  className="w-full my-10 flex lg:flex-row flex-col justify-center items-center">
      <div className="card m-10 border-2 flex flex-col gap-4 border-gray-800 rounded-2xl p-7">
        <h2 className="text-4xl text-gray-600 font-semibold">Basic</h2>
        <div>
        <h3 className="text-4xl">$0</h3>
        <p className="text-sm text-gray-600">Per month, billed annually</p>
        </div>
        <h4 className="text-sm font-semibold text-gray-600">To Keep an eye on your expenses</h4>
        <ul className="flex max-w-[250px] flex-col gap-2">
          <Tab>Filter Payment methods</Tab>
          <Tab>5 transaction records per day</Tab>
          <Tab>Weekly analysis</Tab>
          <Tab>Day to day analysis</Tab>
          <Tab>Track of total amount spent</Tab>
          <Excluded>Set Budget</Excluded>
          <Excluded>AI analysis</Excluded>
          <Excluded>Manage Subscriptions</Excluded>
        </ul>
        <Link href='/sign-in' className="mx-auto w-full my-5">
        <Button className="w-full">Get Started for Free</Button>
        </Link>
      </div>

      <div className="card m-10 border-2 flex flex-col gap-4 border-violet-500 shadow-2xl shadow-violet-500/50 rounded-2xl p-7">
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
        <Link href='/sign-in' className="mx-auto my-5 w-full">
        <Button className="w-full flex items-center justify-center gap-2"><span><FaFire/></span>Get Pro</Button>
        </Link>
      </div>
    </div>
    </div>
  );
}



export function Tab ({children}: {children: ReactNode}) {
  return (
    <li className="flex items-center gap-2">
      <span className="bg-white font-semibold text-green-500 rounded-full p-1"><IoMdCheckmark/></span>
      {children}
    </li>
  )

}

export function Excluded ({children}: {children: ReactNode}) {
  return (
    <li className="flex items-center gap-2">
      <span className="bg-white font-semibold text-red-500 rounded-full p-1"><RxCross1/></span>
      {children}
    </li>
  )

}