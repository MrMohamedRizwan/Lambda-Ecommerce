import WithAdmin from '@/pages/withAdmin'
import axios from 'axios'
import React, { useState } from 'react'

const create = ({user,token}) => {
    const [state,setState]=useState({
        name:"",
        content:"",
        error:"",
        success:'',
        formData:process.browser&& new FormData(),
        buttonText:'Create',
        imageUploadText:'Upload image'
    })
    const {name,content,error,success,formData,buttonText,imageUploadText}=state

    const handleChange = name => (e) => {
        const value =name== 'image'?e.target.files[0]:e.target.value;
        const imageName = name == 'image' ? e.target.files[0].name : 'Upload image';
        formData.set(name, value);

        setState({ ...state, [name]: e.target.file, error: '', success: '',imageUploadText:imageName })

      }
      const handleSubmit=async e =>{
        e.preventDefault();
        setState({...state,buttonText:'Creating'})
        // console.log(...formData);
        try{
            const response=await axios.post('/api/category',formData,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            })
            console.log("category resp ",response)
            setState({...state,name:'',content:'',image:'',success:response.data.message,buttonText:'Created',imageUploadText:'Upload image'})

        }
        catch(e)
        {
            console.log(e)
            setState({...state,error:e.response.data.error,buttonText:'Create'})
        
        }
      }
      const createCategoryForm=()=>{
        return(
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Name
                    <input 
                        type="text" 
                        className="block w-full mt-1 p-2 border rounded-md" 
                        onChange={handleChange('name')} 
                        value={name} 
                        required
                    />
                    </label>
                </div>
                <div>
                    <label className="block text-gray-600">Content
                    <textarea 
                        className="block w-full mt-1 p-2 border rounded-md" 
                        onChange={handleChange('content')} 
                        value={content} 
                        required
                        ></textarea>
                        </label>
                </div>
                <div>
                    <label className="block text-gray-600 border-dashed border-2 border-gray-400 p-2 rounded-md cursor-pointer">
                        {imageUploadText}
                        <input 
                            type="file" 
                            name="image" 
                            accept="image/*" 
                            onChange={handleChange('image')} 
                            hidden  
                        />
                    </label>
                </div>
                <div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {buttonText}
                    </button>
                </div>
            </form> 

        )
      }

  return (
    <div>
      Create
      {createCategoryForm()}
    </div>
  )
}

export default WithAdmin(create);