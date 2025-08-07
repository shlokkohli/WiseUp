import Image from 'next/image'
import React from 'react'

const SecondHome = () => {
  return (
    <div className=' bg-gray-50 flex flex-col'>
        <div className='flex lg:flex-row flex-col-reverse p-10 my-5'>
        <div className='lg:w-1/2 w-full flex flex-col justify-center lg:p-10 py-10'>
          <h2 className='md:text-4xl lg:text-start text-center text-3xl font-mitr text-violet-600 font-bold'>
          Monitor Your Financial Health with Ease
           
          </h2>
          <p className='lg:w-[80%] w-full lg:text-start text-center text-gray-600 py-5'>
            Get a clear view of your financial journey with detailed analysis of yearly spending, weekly breakdowns, and a comprehensive profile overview. Keep track of your total expenses in one place and make smarter decisions to achieve your financial goals.

            Unlock the power of AI-powered Smart Analysis to uncover trends and gain actionable insights for better budgeting and savings.
          </p>
        </div>
        <div className=" lg:w-1/2 w-full flex flex-col items-center justify-center rounded-lg">
            <h2 className='mb-3 text-center text-2xl font-mitr text-gradient font-bold'>Maintain Records</h2>
            <Image className='rounded-lg shadow-2xl shadow-pink-300 border-2 border-pink-400/30 ' width={600} height={650} src="/dashboard.svg" alt="Tracker" />
        </div>
      </div>
    </div>
  )
}

export default SecondHome
