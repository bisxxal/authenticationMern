import React, { useContext, useEffect, useState } from 'react'
import context from '../context/context'
import Axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import {image} from '../../../server/public/images/'
function Profile() {
    const navigate = useNavigate()
   const [detaills , setDetails] = useState([])

   const [edit , setEdit] = useState(false) 
    var {username ,setUsername,password ,setPassword,email ,setEmail ,content ,setContent} = useContext(context);

    Axios.defaults.withCredentials = true;

useEffect(()=>{
  Axios.post(`http://localhost:3000/auth/profile` ,{
    username,
    }).then(res =>{
     
    if(res.data.status){ 
         setDetails(res.data.findUser)
    }
    if(res.data.status == false){ 
        navigate('/login')
    }
})
.catch(err=> {
    console.log("hey errrorr",err);
})
   
},[detaills])


useEffect(()=>{
    Axios.get(`http://localhost:3000/auth/getimage` ,{
      
        }).then(res =>{
            console.log(" data is",res);
        })
        .catch(err=> {
            console.log("hey errrorr",err);
        })
},[])


const handelSumbit  = (e) =>{
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/post' ,{
       content,
       detaills
    }).then(res =>{
        if(res.data.user){
           
        }
    })
    .catch(err=> {
        console.log(err);
    })
}
    const makeLogout = (e)=>{
        e.preventDefault();
        
        Axios.post('http://localhost:3000/auth/logout' ,{
            detaills
       
    }).then(res =>{
        if(res.data.status){
          navigate('/login')      
        }
        
    })
    .catch(err=> {
        console.log(err);
    })
    }

 
  return (
    <div className='text-white bg-zinc-900  min-h-screen p-10  w-full '>

<div className='flex  justify-between  pr-5 '>
  <div className='flex items-center gap-3'>
  <div onClick={ ()=>(navigate(`/upload/${detaills.email}`))} className='w-14 h-14 overflow-hidden rounded-full'> <img className=' w-full h-full object-cover' src={`http://localhost:3000/images/${detaills.profilePic}`} alt="" /> </div>
  <h1 className='text-[25px]'>Hey, <span className='text-green-500 text-[29px] font-semibold'>{detaills.username}</span>👋</h1>
   
  </div>
    <div><button className='px-3 py-1 bg-red-600 rounded-md' onClick={makeLogout} type='sumbit'>Logout</button></div>
</div>
<h1 className='text-[25px] mt-3'>WellCome back,</h1>
        <div>
        <h1 className=" mt-2">You can create a new post </h1>

        <form >
                <textarea onChange={(e)=>setContent(e.target.value)} className="block outline-none resize-none mt-6 bg-transparent border-2 border-zinc-700 rounded-md px-3 py-2  w-[600px] h-[100px]" placeholder="What's in your mind ?" id=""></textarea>
                <input onClick={handelSumbit} className="block px-3 py-1 bg-blue-500  mt-2 rounded-md font-semibold"  type="submit" value="Create Post"/>    
            </form>
        </div>
        
                <div>
                    <h1 className="mt-10">Your posts..</h1>

                    {detaills.posts && Array.isArray(detaills.posts) ? (
                        detaills.posts.map((post, index) => (
                            <div key={index} className="postcontainers py-1 w-full">
                                <div className="post bg-zinc-800 border border-zinc-600 w-1/3 px-3 rounded-md mt-2 py-2">
                                    <p className="text-blue-400 mb-1">@ {  detaills.username} </p>
 
                                   {detaills && detaills.posts && detaills.posts.length >= 1 && (
                                        <h2 className="text-sm w-full">{detaills.posts[index].content}</h2>
                                    )}


                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='mt-2 text-zinc-600 '>You didn't post anything  </p>
                    )}

                           
                </div>         

    </div>
  )
}

export default Profile