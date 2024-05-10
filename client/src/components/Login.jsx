import React, { useContext, useState } from 'react'
import context from '../context/context'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate() 
  
    const {username ,setUsername,password ,setPassword,email ,setEmail} = useContext(context);

    Axios.defaults.withCredentials = true;
  
    const handelSumbit  = (e) =>{
      e.preventDefault();
      Axios.post('http://localhost:3000/auth/login' ,{
       
          email,
          password,
      }).then(res =>{
          if(res.data.status){
              navigate(`/profile`)
            }
            else{
              navigate(`/signup`)
            }
            
      })
      .catch(err=> {
          console.log(err);
      })
    }
  return (
    <div className='bg-zinc-900 flex items-center justify-center h-screen w-full '>
        <div className=' border bg-[#3a363636] border-[#ffffff61] px-14 py-20 rounded-lg backdrop-blur'  >
            <form className='flex  text-white flex-col items-center justify-center gap-2' action=""> 
                    <input onChange={(e)=>setEmail(e.target.value)} className=' block rounded-md bg-transparent outline-none border border-zinc-700 px-3 py-1 mt-3' placeholder='email' type="email" />
                    <input onChange={(e)=>setPassword(e.target.value)} className=' block rounded-md bg-transparent outline-none border border-zinc-700 px-3 py-1 mt-3' placeholder='password' type="password" />
                    <button onClick={handelSumbit} className='rounded-md bg-blue-500 font-medium outline-none px-3 py-1 mt-3' type='sumbit'>Sign Up</button>

                    <p>Don't Have an Account <Link className='text-blue-500 ml-1' to={'/signup'}> Signup </Link> </p>
                   
            </form>
        </div>
    </div>
  )
}

export default Login