// 'use server'
import React from 'react'
import getapiAdmin from '../withAdmin'
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';


const Admin = async() => {
    const response=await getapiAdmin();
    const route=useRouter();
    if(response==null)
    {
        
    }
    // {context.res.writeHead(302, {
    //     Location: '/'
    // });
    // context.res.end();}

  return (
    <div>
      {JSON.stringify(response)}
    </div>
  )
}

export default Admin