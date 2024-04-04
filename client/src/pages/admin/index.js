// 'use server'
import React, { useEffect, useState } from 'react'


import Navbar from '@/components/Navbar';
import WithAdmin from '../withAdmin';
// import { useRouter } from 'next/router';


const admin = ( {user }) => { 
    // console.log(user)
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    // Ensure you're receiving `user` as a prop
    return (
        <div>

        {isClient&&<div>
        <Navbar/>
         {/* <Navbar> */}

         <div>{JSON.stringify(user)}</div>
        ugvhj 
        {/* </Navbar> */}
        </div>}
        </div>
        
    );
}

export default WithAdmin(admin)
