'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { isAuth, logout, removeCookie, removeLocalStorage } from '../Helpers/authenticationOfCookies'

const Navbar = () => {
  const router=useRouter();
  //jubi
  // const[role,setrole]=useState(isAuth().role)
  const [t, setT]=useState(isAuth());
  //
  const handleLogout=()=>{

    console.log("fchgj")
    removeCookie('token');
    removeLocalStorage('user');
    setT(false);
    router.replace('/login');
  }

  
  return (
    <div className='pl-[10%] pr-[10%]'>
      <div className=" bg-blue-100 rounded-b-[40px] flex flex-row w-[100%] border-2 border-black justify-around h-[7vh] items-center">
        <div >
            <a href="/home">Home</a>
        </div>
        <div>
            <a href="/login">Login</a>
        </div>
        <div>
            <a href="/register">Register</a>
        </div>
        {isAuth() && (
                <div >
                    {t.role}
                </div>
            )}
            {t && (
                <div>
                    <button  onClick={handleLogout}  className="nav-link text-dark">
                        Logout
                    </button>
                    
                </div>
            )}
      </div>
    </div>
  )
}

export default Navbar