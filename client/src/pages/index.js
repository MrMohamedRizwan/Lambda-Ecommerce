import Navbar from '@/components/Navbar'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState} from 'react'


const Home = ({categories}) => {
  const listCategories=()=>{
    return(
    categories.map((c, i) => (
      <a key={i} href={`/links/${c.slug}`}>
          <a className="border border-red-500 bg-gray-100 p-3 flex flex-col col-span-1 md:col-span-4">
              <div className="flex flex-row">
                  <div className="flex flex-col">
                      <img
                          src={c.image && c.image.url}
                          alt={c.name} 
                          className="w-24 h-auto"
                      />
                  </div>
                  <div className="col-span-1">
                      <h3 className="text-xl">{c.name}</h3>
                  </div>
              </div>
          </a>
      </a>)
  ));
  
  }
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true)
  }, []);
  return (
    <div>
      <Navbar>
        <br/>
        <br/>


        {JSON.stringify(categories)}

        <div className="flex flex-row">{listCategories()}</div>

      </Navbar>
    </div>
  )
}
Home.getInitialProps = async () => {
  const response=await axios.get('http://localhost:5000/api/categories');
  // const response={};
  console.log(response.data)
  return {
    categories:response.data 
  }
}

export default Home
