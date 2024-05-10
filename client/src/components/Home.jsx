import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
 
  return (
    <div className='bg-zinc-900 text-white flex items-center justify-center h-screen w-full '>
        <div className=''>
          <Link className='text-blue-500 mr-1 mb-5'  to={'/login'}>Login </Link> to view profile
        
        <p className='mt-5' >Don't Have an Account <Link className='text-blue-500 ml-1' to={'/signup'}> Signup </Link> </p>
                   </div>
    </div>
  )
}

export default Home