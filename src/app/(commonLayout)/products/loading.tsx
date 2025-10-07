import { Loader } from '@/components/loader/Loader'
import React from 'react'

const LoadingPage = () => {
  return (
    <div>
      <div className='flex justify-center items-center mt-20 mb-20'>
        <Loader/>
      </div>
    </div>
  )
}

export default LoadingPage
