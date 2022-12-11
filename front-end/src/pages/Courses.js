import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './auth/Register';
import 'tw-elements';

const Courses = () => {

  // helper
  const [apiCall, setApiCall] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([])

  const navigate = useNavigate();

  // User data htmlFor one course
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [courseDayOne, setCourseDayOne] = useState("Monday");
  const [courseDayTwo, setCourseDayTwo] = useState("Monday");
  const [courseStartTime, setCourseStartTime] = useState("");
  const [courseEndTime, setCourseEndTime] = useState("");


  const clearForm = () => {
    setCourseName("")
    setCourseDescription("")
    setFacultyName("")
    setCourseDayOne("Monday")
    setCourseDayTwo("Monday")
    setCourseId("")
    setCourseStartTime("08:00")
    setCourseEndTime("09:30")
  }

  const handleSubmit = (obj) => {

    const { courseName, courseFacultyName, courseDescription, courseStartTime, courseEndTime, courseDayOne, courseDayTwo } = obj;

    if (courseName.length === 0) {
      notify("Input Course Name");
      return false
    }
    if (courseStartTime.length === 0 || courseEndTime.length === 0) {
      notify("Input Course Time");
      return false;
    }
    if (courseDayOne.length === 0 || courseDayTwo.length === 0) {
      notify("Course Day Not Selected");
      return false;
    }
    return true;

  }

  const updateCourse = async (event) => {
    event.preventDefault();
    setApiCall(true)
    const userInfo = localStorage.getItem('STTP-user');
    let userRollNumber = JSON.parse(userInfo).rollNum;

    const obj = {
      courseName: courseName,
      courseFacultyName: facultyName,
      courseDescription: courseDescription,
      courseStartTime: courseStartTime,
      courseEndTime: courseEndTime,
      courseDayOne: courseDayOne,
      courseDayTwo: courseDayTwo
    }
    const objectToSend = {
      data: obj,
    }
    if (handleSubmit(obj)) {

      const data = await axios.patch(`http://www.localhost:5000/api/courseselection/id/${courseId}`, objectToSend)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {

          console.log(error);
        });

      clearForm()
      getCoursesData()
    }
    else {
      console.log("error")
    }

    setEditOn(false)
    setApiCall(false)


  }

  const cancelUpdateCourse = async (event) => {
    setEditOn(false)
    clearForm()

  }

  const courseSubmit = async (event) => {
    event.preventDefault();
    setApiCall(true)
    const userInfo = localStorage.getItem('STTP-user');
    let userRollNumber = JSON.parse(userInfo).rollNum;

    const obj = {
      courseName: courseName,
      courseFacultyName: facultyName,
      courseDescription: courseDescription,
      courseStartTime: courseStartTime,
      courseEndTime: courseEndTime,
      courseDayOne: courseDayOne,
      courseDayTwo: courseDayTwo
    }
    const objectToSend = {
      data: obj,
      rollNum: userRollNumber
    }

    if (handleSubmit(obj)) {

      const data = await axios.post('http://www.localhost:5000/api/courseselection', objectToSend)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {

          console.log(error);
        });

    }
    else {
      console.log("error")
    }
    setApiCall(false)
  }

  const getCoursesData = async () => {
    const data = await axios.get('http://www.localhost:5000/api/courseselection')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    setSelectedCourses(data.data)
    clearForm()

  }

  const sendRollNumber = async () => {
    const userInfo = localStorage.getItem('STTP-user');
    let userRollNumber = JSON.parse(userInfo).rollNum;

    const objectToSend = {
      rollNum: userRollNumber

    }
    const data = await axios.post('http://www.localhost:5000/api/courseselection/rollnumber', objectToSend)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const deleteCourse = async (id) => {

    const data = await axios.delete(`http://www.localhost:5000/api/courseselection/id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });

    getCoursesData()

  }
  const editCourse = async (id) => {

    const data = await axios.get(`http://www.localhost:5000/api/courseselection/id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    const userData = data.data.data

    if (userData !== null) {
      setEditOn(true);
      setCourseId(userData._id)
      setCourseName(userData.courseName)
      setCourseDescription(userData.courseDescription)
      setFacultyName(userData.courseFaculty)
      setCourseDayOne(userData.courseWeeklyFirstLec)
      setCourseDayTwo(userData.courseWeeklySecondLec)
      setCourseStartTime(userData.courseStartTime)
      setCourseEndTime(userData.courseEndTime)
    }
  }

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem('STTP-user'))
    if (!currUser) {
      navigate("/")
    }
    sendRollNumber();
    getCoursesData()
  }, [])

  useEffect(() => {
    getCoursesData();
  }, [apiCall])

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='mb-2 text-5xl'> Course Selection</h1>
      <h3 className='mb-8 text-2xl'> Input your courses</h3>
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <div className='w-1/2 h-full flex flex-col justify-center  items-center'>

          <form className="w-full max-w-lg">
            <div className
              ="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className
                  ="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-name">
                  Course Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-course-name" type="text" value={courseName} placeholder="Enter Course Name" onChange={(e) => setCourseName(e.target.value)} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-faculty-name">
                  Faculty Name
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-faculty-name" type="text" value={facultyName} placeholder="Enter Faculty Name" onChange={(e) => setFacultyName(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-dscription">
                  Course Description
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-course-description" type="text" placeholder="Add some description down here" value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)} />
                <p className="text-gray-600 text-xs italic">Not as important!</p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-course-name">
                  Course Start Time
                </label>
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="text" value={courseStartTime} placeholder="Enter Course Start Time" onChange={(e) => setCourseStartTime(e.target.value)} >
                  <option>08:00</option>
                  <option>09:30</option>
                  <option>11:00</option>
                  <option>12:30</option>
                  <option>13:00</option>
                  <option>14:30</option>
                  <option>16:00</option>
                  <option>17:30</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-faculty-name">
                  Course End Time
                </label>
                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" type="text" value={courseEndTime} placeholder="Enter Course End Time" onChange={(e) => setCourseEndTime(e.target.value)} >
                  <option>09:30</option>
                  <option>11:00</option>
                  <option>12:30</option>
                  <option>13:00</option>
                  <option>14:30</option>
                  <option>16:00</option>
                  <option>17:30</option>
                  <option>19:00</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                  First Lecture Day
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={courseDayOne} onChange={(e) => setCourseDayOne(e.target.value)}>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 px-3 my-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                  Second Lecture Day
                </label>
                <div className="relative">
                  <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={courseDayTwo} onChange={(e) => setCourseDayTwo(e.target.value)}>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

            </div>
            <div className='w-full flex my-6 justify-center items-center'>
              {editOn ? (
                <>
                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 mx-2 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={updateCourse}>
                    Update
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 mx-2 border-b-4 border-gray-700 hover:border-gray-500 rounded" onClick={cancelUpdateCourse}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={courseSubmit}>
                  Add
                </button>)}
            </div>
          </form>
        </div>

        {selectedCourses.length > 0 ? (<div className='w-1/2 h-full flex flex-row flex-wrap	 items-center justify-center gap-x-6'>
          {selectedCourses.map((item) => {

            const { _id, courseName, courseFaculty, courseDescription, courseStartTime, courseEndTime, courseWeeklyFirstLec, courseWeeklySecondLec } = item

            return (
              <div className="block p-6 rounded-lg shadow-2xl bg-white max-w-sm ">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Course Name: {courseName}</h5>
                <p className="text-gray-700 text-basec">
                  Description: {courseDescription}
                </p>
                <p className="text-gray-700 text-basec">
                  Faculty Name: {courseFaculty}
                </p>
                <h6>Days: {courseWeeklyFirstLec} {courseWeeklySecondLec}</h6>
                <h6 className='mb-2'>Time: {courseStartTime} {courseEndTime}</h6>

                <button type="button" className="opacity-90 inline-block  px-3 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mx-2" onClick={() => { editCourse(_id) }}>
                  <EditIcon />
                </button>

                <button type="button" className="opacity-90 inline-block px-3 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-500 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mx-2" onClick={() => { deleteCourse(_id) }}>
                  <DeleteIcon />
                </button>
              </div>
            )
          })}
        </div>) : null}
      </div >
      <ToastContainer />
    </div >
  )
}

export default Courses

