import Image from 'next/image'
import React from 'react'

const ThirdHome = () => {
  return (
    <div className=' bg-white flex flex-col'>
        <div className='flex lg:flex-row flex-col p-10 my-5'>
        <div className=" lg:w-1/2 w-full flex flex-col items-center justify-center rounded-lg">
            <h2 className='mb-3 text-center text-2xl font-mitr text-gradient font-bold'>Smart Analysis</h2>
            <Image className='rounded-lg shadow-2xl shadow-violet-500 ' width={500} height={450} src="/track2.svg" alt="Tracker" />
        </div>
        <div className='lg:w-1/2 w-full flex flex-col justify-center lg:p-10 py-10'>
          <h2 className='lg:text-4xl text-3xl lg:text-start text-center font-mitr text-violet-600 font-bold'>
          Keep Track of Your Balance
          </h2>
          <p className=' lg:w-[80%] w-full text-center lg:text-start text-gray-600 py-5'>
          Stay on top of your personal or business finances with an intuitive and secure platform designed to help you save time, reduce stress, and grow wealth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThirdHome
