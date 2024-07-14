'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { isAuth, logout, removeCookie, removeLocalStorage } from '@/helpers/authenticationOfCookies'

const Navbar = ({children}) => {
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
   
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
  const nav=()=>{
    console.log("object");
    return (
        <div>
    {isClient&&<div >
    dwa
            <div className="nav-item">
                    <a className="nav-link text-dark">Home</a>
            </div>

            <div className="nav-item">
                    <a className="nav-link text-dark btn btn-success" style={{ borderRadius: '0px' }}>
                        Submit a link
                    </a>
            </div>

            {!isAuth() && (
                <React.Fragment>
                    <div className="nav-item">
                            <a className="nav-link text-dark">Login</a>
                    </div>
                    <div className="nav-item">
                            <a className="nav-link text-dark">Register</a>
                    </div>
                </React.Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <div className="nav-item ml-auto">
                        <a className="nav-link text-dark">{isAuth().name}</a>
                </div>
            )}

            {isAuth() && isAuth().role === 'subscriber' && (
                <div className="nav-item ml-auto">
                        <a className="nav-link text-dark">{isAuth().name}</a>
                </div>
            )}

            {isAuth() && (
                <div className="nav-item">
                    <a onClick={logout} className="nav-link text-dark">
                        Logout
                    </a>
                </div>
            )}
        </div>}
        </div>
        )
  }
  
  return (
    <div>

    {isClient&&<React.Fragment>
      {/* <div>

{nav()}
</div> */}
    <div className='pl-[10%] pr-[10%]'>
      <div className=" bg-blue-100 rounded-b-[40px] flex flex-row w-[100%] border-2 border-black justify-around h-[7vh] items-center">
        <div >
            <Link href="/home">Home</Link>
        </div>
        <div>
            <Link href="/login">Login</Link>
        </div>
        <div>
            <Link href="/register">Register</Link>
        </div>
        <div>
            <Link href="/user/link/create">Submit a link</Link>
        </div>
        {isAuth() && (
            <div >
                    {isAuth().role}
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
    <div className="container pt-5 pb-5">{children}</div>
    </React.Fragment>}
            </div>
  )
}

export default Navbar