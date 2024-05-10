import { useState } from 'react' 
import './App.css'
import { Route ,Routes, BrowserRouter} from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import context from './context/context'
import ProfileUpload from './components/ProfileUpload'
function App() {
  const [username ,setUsername]  = useState('')  
  const [password ,setPassword]  = useState('')  
  const [email ,setEmail]  = useState('')  
  const [content ,setContent]  = useState('')  
  // const [content ,setContent]  = useState('')  
 

  let value = {username ,setUsername,password ,setPassword,email ,setEmail , content ,setContent}
  return (
    <>
      <BrowserRouter >
        <context.Provider value={value}>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
          <Route path='/signup' element={<SignUp/>} ></Route>
          <Route path='/login' element={<Login/>} ></Route>
          <Route path='/profile' element={<Profile/>} ></Route>
          <Route path='/upload/:id' element={<ProfileUpload/>} ></Route>
        </Routes>
        </context.Provider >
      </BrowserRouter>
    </>
  )
}

export default App
