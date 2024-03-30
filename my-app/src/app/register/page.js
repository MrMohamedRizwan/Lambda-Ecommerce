'use client'
import axios from "axios";
import React,{ useState } from "react";
export default function Home() {
  
    
    const handleSubmit = async e => {
      e.preventDefault();
      console.log(name, email, password)
      setState({...state,buttonText:"Registering"})
      try{
        const response=await axios.post("http://localhost:5000/api/register",{
          name,email,password
        })
        setState({...state,name:"",email:"",password:"",buttonText:"submitted",success: response.data.message})

      }
      catch(e)
      {
        console.log(e);
        setState({...state,buttonText:"error", error: error.response.data.error })
      }
    }

    const [state, setState] = useState({
      name: 'rizwan',
      email: 'rizwan@123.com',
      password: '123',
      error: '',
      success: '',
      buttonText: 'Register',
        loadedCategories: [],
        categories: []
    });
    const { name, email, password, error, success, buttonText, loadedCategories, categories } = state;
  
    const handleChange = name => (e) => {
      setState({ ...state, [name]: e.target.value, error: '', success: '',buttonText: 'Register'  })
    }
    function register ()  {

    return(
      <div className=" flex  justify-center items-center h-[90vh]">
      <div className="border-2 border-black flex  items-center justify-center w-[50%] bg-amber-100">
          <form onSubmit={handleSubmit} className="flex flex-col items-center ">
            <div>Username</div>
              <div className="w-full border-2 ">
                      <input
                          value={name}
                          onChange={handleChange('name')}
                          type="text"
                          placeholder="Type your name"
                          required
                      />
              </div>
            <div>email</div>
              <div className="w-full border-2 ">
                      <input
                          value={email}
                          onChange={handleChange('email')}
                          type="text"
                          placeholder="Type your email"
                          required
                      />
              </div>
            <div>password</div>

              <div className="w-full border-2 ">
                      <input
                          value={password}
                          onChange={handleChange('password')}
                          type="text"
                          placeholder="Type your password"
                          required
                      />
              </div>
              <div className="w-[50%] border-2 border-black bg-blue-500 flex justify-center">
                <button>{state.buttonText}</button>
              </div>
          </form>
          </div>
          </div>

        
    )
  }
  return (
    <div>
    {register()}
    </div>  
    );
}
