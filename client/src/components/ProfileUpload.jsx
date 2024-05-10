import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios' 

function ProfileUpload() {
    const navigate = useNavigate()
    const {id} = useParams()
  const [file,setfile] = useState()
  // const [file,set] = useState()
  
  // console.log(id);
  const onSumbit= (e)=>{
      e.preventDefault();
      const formdata = new FormData()
      formdata.append('file' , file)
      Axios.post(`http://localhost:3000/auth/upload/${id}`,formdata ,id).
      then(res =>{
         if(res.data.status)
          navigate('/profile')

         if(res.data.status !== true)
          navigate('/login')
          })
          .catch(err=> {
              console.log(err);
          }) 

    }
   
  return (
    
    <div className ="w-full min-h-screen bg-zinc-900">
    <div className ="flex justify-end pr-10"><a className="text-white px-5 py-1 mt-3 py- rounded-lg bg-red-600 text-medium" href="/logout">Logout</a></div>
    <div className ="text-white px-10">
           <h1 className ="text-2xl">Upload Profile Photo.</h1>

         
            <input className =" rounded-md border-[.5px] border-zinc-700" type="file" onChange={e => setfile(e.target.files[0])}/>
            <button onClick={onSumbit} className ="block px-3 py-1 bg-green-600  mt-3 rounded-md font-semibold">upload</button>      
            
        </div>
</div>
    
  )
}

export default ProfileUpload