import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashBoard = () => {

  const Navigate = useNavigate();
  
  useEffect(()=> {

    const currUser = JSON.parse(localStorage.getItem('STTP-user'))

    if(!currUser){
      Navigate("/login")
    }
  },[])
  return (
    <div>DashBoard


    {console.log("hello")}

    </div>
  )
}

export default DashBoard