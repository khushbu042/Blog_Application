import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.js'
import { login,logout } from './store/authSlice.js';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import { Outlet } from 'react-router-dom';


const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-500'>
      <div className='w-full block'>
        <Header/>
        <main>
          Todo{/* <Outlet/>// Outlet Todo */}
        </main>
        <Footer/>
      </div>
    
    </div>
  ) : (null)
}

export default App
