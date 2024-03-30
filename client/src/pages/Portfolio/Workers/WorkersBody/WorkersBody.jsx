import React from 'react'
import WinningPlatforms from './WinningPlatforms'
import HeroSection from '../../Buyers/BuyersBody/HeroSection'

const WorkersBody = () => {
  return (
    <>
    <HeroSection Heading={"Grow beyond yourself professionally  and privately by earning through social media platforms"} Workers={true}/>
    <WinningPlatforms/>
    </>
  )
}

export default WorkersBody