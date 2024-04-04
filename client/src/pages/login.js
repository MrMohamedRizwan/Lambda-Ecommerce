
import axios from "axios";
import React,{ useEffect, useState } from "react";
import { ErrorMessage, SuccessMessage } from "../components/messages/alert";
import { authenticate, isAuth } from "../helpers/authenticationOfCookies";

import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
const Home=()=>{
  const router = useRouter();
//   if (!process.browser) {
//     return null; // Or other server-side behavior
// }

useEffect(() => {
  console.log("useeffect")
  isAuth()&&router.push("/");
  // console.log(isAuth())
},[]);

  const API="/api"

  const [state, setState] = useState({
    name: 'rizwan',
    email: 'mrrizwan2207@gmail.com',
    password: '123567890',
    error: '',
    success: '',
    buttonText: 'login',
      loadedCategories: [],
      categories: []
  });
  const { name, email, password, error, success, buttonText, loadedCategories, categories } = state;
  const handleChange = name => (e) => {
    setState({ ...state, [name]: e.target.value, error: '', success: '',buttonText: 'Register'  })
  }
  const handleSubmit =async e=>{
    e.preventDefault();
    console.log(email,password);
    setState({ ...state, buttonText: 'Logging in' });
        try {
            const response = await axios.post(`${API}/login`, {
                email,
                password
            })
            console.log(response)
            setState({...state,name:"",email:"",password:"",buttonText:"Logged IN",success: response.data.message})
            authenticate(response, () => {
              isAuth()&& isAuth().role === 'admin' ? router.push('/admin') : router.push('/user')
            })
            
          }
            catch(e)
            {
              console.log(e);
              setState({ ...state, buttonText: 'Login', error: e.response.data.error });
            
            }
  }
const loginpage = () => {
  return (
    <>
        <Navbar>

      <div className=" flex  justify-center items-center h-[90vh]">
    <div className="border-2 border-black flex  items-center justify-center w-[50%] bg-amber-100">
    <form onSubmit={handleSubmit} className="flex flex-col items-center ">
      <div>Username</div>
            <div className="w-full border-2 ">
                <input
                    value={email}
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>Password</div>
            <div className="w-full border-2 ">
                <input
                    value={password}
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    placeholder="Type your password"
                    required
                />
            </div>
            <div className="w-[50%]  border-black  flex justify-center my-[10px]">
                <button className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full transition duration-300 ease-in-out">{buttonText}</button>
            </div>
        </form>
        </div>
        </div>
        </Navbar>
        </>


  )
}

  return(<div>
  {success && SuccessMessage(success)}
    {error && ErrorMessage(error)}
  {loginpage()}
  </div>)
}
export default Home
