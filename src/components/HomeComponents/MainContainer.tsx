import React from 'react'
import FirstHome from './FirstHome'
import SecondHome from './SecondHome'
import KeyFeatures from './KeyFeatures'
import ThirdHome from './ThirdHome'
import Pricing from './Pricing'
import FAQSection from './FaqSection'

const MainContainer = () => {
  return (
    <div>
      <FirstHome/>
      <SecondHome/>
      <ThirdHome/>
      <KeyFeatures/>
      <Pricing/>
      <FAQSection/>
    </div>
  )
}

export default MainContainer
