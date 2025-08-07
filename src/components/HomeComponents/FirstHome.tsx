import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { HiOutlineLightBulb } from "react-icons/hi";
const FirstHome = () => {
  return (
    <div className='flex mt-10 flex-col'>
      <div className='my-5 text-center border-spacing-24 p-10 mx-auto w-11/12 lg:w-[70%]'>
        <p className='bg-pink-500/80 flex gap-2 items-center justify-center border border-pink-500 shadow-sm shadow-pink-500 lg:w-1/3 md:w-1/2 rounded-full text-white mx-auto'>
        <span><HiOutlineLightBulb/></span>Track and analyze like pro</p>
        <h1 className='text-violet-600 my-10  py-5 font-mitr text-5xl md:text-6xl lg:text-7xl font-semibold '>Take Control Of Your Finances With <span className='relative text-gradient'>WiseUp <Image className='absolute right-5 ' width={300} height={100}  src="/sketchyline.svg" alt="" /></span></h1>
        <p className='text-gray-600'>Manage transactions, track expenses, and make smarter financial decisions all in one place.</p>
        <div className='my-10 flex w-full lg:flex-row flex-col gap-5 items-center justify-center'>
          <Link href="/sign-in" className='bg-violet-600 shadow-pink  font-semibold text-white hover:bg-none hover:border-gray-200  rounded-full px-2 w-full lg:w-[30%] py-4'>Join Now</Link>
          <Link href='/#features' className='hover:text-white bg-white-500 hover:bg-violet-600 text-black border-gray-200 border-2 font-semibold rounded-full px-2 w-full lg:w-[30%] py-4'>Explore Features</Link>
        </div>
      </div>
    </div>
  )
}

export default FirstHome
