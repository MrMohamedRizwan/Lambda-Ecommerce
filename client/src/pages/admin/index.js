// 'use server'
import React, { useEffect, useState } from 'react'


import Navbar from '@/components/Navbar';
import WithAdmin from '../withAdmin';
import Link from 'next/link';
// import { useRouter } from 'next/router';


const admin = ( {user }) => { 
    // console.log(user)
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    // Ensure you're receiving `user` as a prop
    return (
        
        <Navbar>
          <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
<div className="flex">
    <div className="w-1/3">
        <ul className="space-y-2">
            <li className="mb-1">
                <a href="/admin/category/create" className="text-blue-500 hover:text-blue-700">
                    Create category
                </a>
            </li>
            <li className="mb-1">
                <a href="/admin/category/read" className="text-blue-500 hover:text-blue-700">
                      All categories
                </a>
            </li>
            <li className="mb-1">
                <a href="/admin/link/read" className="text-blue-500 hover:text-blue-700">
                    All Links
                </a>
            </li>
            <li className="mb-1">
                <a href="/user/profile/update" className="text-blue-500 hover:text-blue-700">
                      Profile update
                </a>
            </li>
        </ul>
    </div>
    <div className="w-2/3"></div>
</div>

         <div>{JSON.stringify(user)}</div>
        </Navbar>

        
    );
}

export default WithAdmin(admin)
