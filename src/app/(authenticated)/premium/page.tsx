import { PremiumCard } from '@/components/PremiumCard'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-mitr text-violet-600 font-semibold p-10 text-center w-10/12'>Unlock Your Financial Freedom with <span className='text-gradient'>WiseUp Premium</span> </h1>
        <p className='w-8/12 text-center text-gray-700'>
          Tired of limits holding you back? With WiseUp Premium, you can take full control of your finances like never before. Enjoy unlimited transaction entries, get detailed weekly spend analysis, and track your daily expenses effortlessly. Make smarter financial decisions and achieve your goals faster. Upgrade today and experience the power of premium financial tracking.
        </p>
        <div className='p-10'>
          <h2 className='text-4xl text-gray-700 font-mitr text-center font-semibold py-10'>
          Why Go Premium?
          </h2>
          <PremiumCard/>
        </div>
      </div>
    </div>
  )
}

export default page
