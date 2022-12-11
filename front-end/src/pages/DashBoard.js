import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const DashBoard = () => {
  const Navigate = useNavigate();

  // helper functions
  const [coursesBucket, setCoursesBucket] = useState([])
  const [events, setEvents] = useState([])

  const day2Num = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6
  }

  const getData = async (req, res) => {
    const tempData = await axios.get('http://www.localhost:5000/api/dashboard')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
      // console.log(tempData.data)
    setCoursesBucket(tempData.data)
  }

  const postRollNumDetails = async (event) => {
    // event.preventDefault();
    const rollNum = JSON.parse(localStorage.getItem('STTP-user'))
    const obj = {
      rollNum: rollNum.rollNum
    }

    const data = await axios.post('http://www.localhost:5000/api/dashboard/rollnumber', obj)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const eventsSetup = () => {
    console.log(coursesBucket)
    let eventsList = coursesBucket.map((course) => {
      return {
        title: course.courseName ,
        startTime: course.courseStartTime,
        endTime: course.courseEndTime,
        daysOfWeek: [day2Num[course.courseWeeklyFirstLec], day2Num[course.courseWeeklySecondLec]],
      }
    })
    console.log(eventsList)
    setEvents(eventsList)
    return eventsList;

  }

  useEffect(() => {
    postRollNumDetails()
    getData();
    const currUser = JSON.parse(localStorage.getItem('STTP-user'))
    if (!currUser) {
      Navigate("/login")
    }
  }, [])

  useEffect(() => {
    eventsSetup();
  }, [coursesBucket])

  return (
    <div className='w-screen	h-screen flex justify-center	items-center flex-col'>
      <div className="w-1/2 ">
        <FullCalendar className="overflow-y-clip"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          slotMinTime={'08:00:00'}
          slotMaxTime={'19:30:00'}
          slotDuration={'00:30:00'} 
          allDaySlot = {false}  
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true} 
        />
      </div>
    </div>
  )
}

export default DashBoard

