import Navbar from '@/components/Navbar'
import React, { useEffect, useState} from 'react'


const index = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true)
  }, []);
  return (
    <div>
      <Navbar>
        
      {domLoaded&& <div>
      tughj9iugjm
      </div>}
      </Navbar>
    </div>
  )
}

export default index
