import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const DashBoard = () => {
  const Navigate = useNavigate();
  const [data,setData] = useState({})
  const [data1,setData1] = useState([])


  const numToWeek = {
    0:"Monday",
    1:"Tuesday",
    2:"Wednesday",
    3:"Thursday",
    4:"Friday",
    5:"Saturday",
    6:"Sunday"

  }

  const getData = async (req, res) => {
    const tempData = await axios.get('http://www.localhost:5000/api/dashboard')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });

      setData(tempData.data[0])
      if(data){

        for(let i = 0; i < data.length; ){
          console.log("+++++++++")
          console.log(data[i]);
          console.log("++++++++++++++")
        }
      }
  }


  const postRollNumDetails = async (event) => {
    event.preventDefault();
    const rollNum = JSON.parse(localStorage.getItem('STTP-user'))
    console.log(rollNum.rollNum)
    const obj = {
      rollNum: rollNum.rollNum
    }

    const data = await axios.post('http://www.localhost:5000/api/dashboard', obj)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let handleDateClick = (arg) => {
    alert(arg)
    console.log(arg)
  }
  const sendRollNumberInfo= async () =>{

    await postRollNumDetails()
  }

  useEffect( () => {
    console.log(data)


  }, [ data])


  useEffect( () => {


    sendRollNumberInfo()
    getData();

    // const currUser = JSON.parse(localStorage.getItem('STTP-user'))

    // if(!currUser){
    //   Navigate("/login")
    // }

  }, [ ])

  return (
    <div className='w-screen	h-screen flex justify-center	items-center flex-col'>

      <div className="w-1/2 ">
        <FullCalendar className="overflow-y-clip"
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={[
            { title: 'Database Management Systems', date: '2022-10-07' },
            { title: 'event 2', date: '2022-10-07' },
            { title: 'event 1', date: '2022-10-07' },

          ]}
        />


      </div>
    </div>
  )
}

export default DashBoard