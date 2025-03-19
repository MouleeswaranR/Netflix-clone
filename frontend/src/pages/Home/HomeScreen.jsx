import React from 'react'
import { useAuthStore } from '../../store/authUser'
import NavBar from '../../components/NavBar';

const HomeScreen = () => {
  const {logout}=useAuthStore();
  return (
    <>
     <div className='relative h-screen text-white'>
      <NavBar/>
      <img src="/extraction.jpg" alt="Hero img" className='absolute top-0 left-0 w-full h-full object-cover -z-50 ' />
      <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' ></div>
      </div>
    </>
   
  )
}

export default HomeScreen