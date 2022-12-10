import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FullCalendar from '@fullcalendar/react' 
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'

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

  let handleDateClick = (arg) => {
    alert(arg)
    console.log(arg)
  }

  const eventsSetup = () => {
    let eventsList = coursesBucket.map((course) => {
      return {
        timeZone: 'UTC',

        title: course.courseName + " " +course.courseTime,
        start: '2022-08-01',
        end: '2022-12-01',
        daysOfWeek: [day2Num[course.courseWeeklyFirstLec], day2Num[course.courseWeeklySecondLec]],
        Duration: '01:30:00'
      }
    })
    // setEvents(INITIAL_EVENTS(coursesBucket))
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
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          // dateClick={handleDateClick}
          events={events}
          slotMinTime={'08:00:00'}
          slotMaxTime={'20:00:00'}
          // initialEvents={INITIAL_EVENTS}

          slotDuration={'01:30:00'} 
          // allDaySlot = {false}

        />
        {console.log(events)}
      </div>
    </div>
  )
}

export default DashBoard

// initialView: 'timeGridWeek',