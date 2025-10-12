import Categories from '@/components/categories/Categories'
import Benifits from '@/components/homePage/Benifits'
import Carousel from '@/components/homePage/Carousel'
import Hero from '@/components/homePage/Hero'
import { title } from 'process'
import React from 'react'

export const metadata =  {
  title: "Home",
  description: "You can find each and everything about electrical realted product. just reach out our website Lumo"
}

const Home = () => {
  return (
    <div >
      <Hero/>
      <Categories/>
      <Carousel/>
      <Benifits/>
    </div>
  )
}

export default Home
