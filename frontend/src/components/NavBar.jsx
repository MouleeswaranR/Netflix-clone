import { LogOut, Menu, Search } from 'lucide-react';
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';

const NavBar = () => {
    const [isMobileMenuOpen,setIsMobileMenuOpen]=useState(false);
    const toggleMobileMenu=()=>setIsMobileMenuOpen(!isMobileMenuOpen);
    const{user,logout}=useAuthStore();
  return (
   <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
    <div className='flex items-center gap-10 z-50'>
        <Link to={"/"}>
        <img src="/netflix-logo.png" className='w-32 sm:w-40' alt="" /></Link>
        {/*dektop version navbar */}
        <div className='hidden sm:flex gap-2 items-center'>
            <Link to="/" className='hover:underline'>Movies</Link>
            <Link to="/" className='hover:underline'>TV Shows</Link>
            <Link to="/history" className='hover:underline'>Search History</Link>
        </div>
    </div>
    <div className='flex gap-2 items-center z-50'>
        <Link to={"/search"}>
        <Search className='size-6 cursor-pointer'></Search>
        </Link>
        <img src={user.image} alt="Avatar img" className='h-8 rounded cursor-pointer' />
        <LogOut className='size-6 cursor-pointer' onClick={logout}>Logout</LogOut>
        <div className='sm:hidden'>
            <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu}></Menu>
        </div>
    </div>
{isMobileMenuOpen &&(
   <div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
    <Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
    Movies
    </Link>
    <Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
    TV Shows
    </Link>
    <Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
    History
    </Link>
   </div> 
)}
   </header>
  )
}

export default NavBar