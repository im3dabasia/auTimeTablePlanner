import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const DashBoard = () => {

  const Navigate = useNavigate();
  
  useEffect(()=> {

    // const currUser = JSON.parse(localStorage.getItem('STTP-user'))

    // if(!currUser){
    //   Navigate("/login")
    // }
  },[])
  let handleDateClick = (arg) => { 
    alert(arg)
    console.log(arg)
  }
  return (
    <div className='w-screen	h-screen flex justify-center	items-center flex-col'>

      <div  className="w-1/2 ">
      <FullCalendar  className="overflow-y-clip		"
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        dateClick={ handleDateClick}
        events={[
          { title: 'event 1', date: '2022-10-07'},
          { title: 'event 2', date: '2022-10-07' },
          { title: 'event 1', date: '2022-10-07' },



        ]}
      />


      </div>
    </div>
  )
}

export default DashBoard