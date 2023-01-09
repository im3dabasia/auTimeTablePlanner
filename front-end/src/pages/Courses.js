// External Modules
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'tw-elements';
import { ToastContainer, toast } from 'react-toastify';

// Components and Routes
import DropDown from '../components/DropDown';
import Button from '../components/Button';

// Local Modules
import { courseSelectionRoute } from '../utils/ApiRoutes'
import { notify } from './auth/Register';

// Css and others
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import 'react-toastify/dist/ReactToastify.css';

const Courses = () => {

  const navigate = useNavigate();

  // Helper states
  const [apiCall, setApiCall] = useState(false);
  const [editOn, setEditOn] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [selectedCourses, setSelectedCourses] = useState([])


  // User data states
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [courseDayOne, setCourseDayOne] = useState("Monday");
  const [courseDayTwo, setCourseDayTwo] = useState("Monday");
  const [courseStartTime, setCourseStartTime] = useState("08:00");
  const [courseEndTime, setCourseEndTime] = useState("09:30");
  const [days, SetDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
  const [startTimes, setStartTimes] = useState(['08:00', '09:30', '11:00', '12:30', '13:00', '14:30', '16:00', '17:30'])
  const [endTimes, setEndTimes] = useState(['09:30', '11:00', '12:30', '13:00', '14:30', '16:00', '17:30', '19:00'])
  const [courseSet, setCourseSet] = useState([]);

  let latestSet = [...courseSet]

  const clearForm = () => {
    setCourseName("")
    setCourseDescription("")
    setFacultyName("")
    setCourseDayOne("Monday")
    setCourseDayTwo("Monday")
    setCourseId("")
    setCourseStartTime("08:00")
    setCourseEndTime("")
  }

  // LOGIC For checking courses are clashing or not
  const checkClash = ({ startTime, endTime, dayOne, dayTwo }) => {
    const startTimes = ['08:00', '09:30', '11:00', '12:30', '13:00', '14:30', '16:00', '17:30', '19:00']

    const stIndex = startTimes.indexOf(startTime)
    const enIndex = startTimes.indexOf(endTime)
    var timeIn = []
    startTimes.forEach((time) => {
      const tempIndex = startTimes.indexOf(time)
      if (tempIndex >= stIndex && tempIndex < enIndex) {
        const str1 = dayOne + time
        const str2 = dayTwo + time
        timeIn = [...timeIn, str1, str2]
      }
    })
    const isClash = item => {
      return latestSet.includes(item)
    }

    const tempSet = []
    timeIn.forEach((str) => {
      const checkCl = isClash(str)
      if (!checkCl) {
        tempSet.push(str)
      }
    })

    if (timeIn.length === tempSet.length) {
      latestSet = [...latestSet, ...tempSet]
      setCourseSet(latestSet)
      return true
    }
    else {
      return false
    }
  }

  const handleSubmit = (obj) => {

    const { courseName,
      courseFacultyName,
      courseDescription,
      courseStartTime,
      courseEndTime,
      courseDayOne,
      courseDayTwo } = obj;

    if (courseName.length === 0) {
      notify("Input Course Name");
      return false
    }
    if (courseStartTime === "12:30" || courseEndTime === "13:00") {
      notify("Cannot take course during lunch time");
      return false;
    }
    if (courseEndTime.length === 0) {
      notify("Enter the End time");
      return false;
    }
    if (courseDayOne.length === 0 || courseDayTwo.length === 0) {
      notify("Course Day Not Selected");
      return false;
    }
    const clashResult = checkClash({
      startTime: courseStartTime,
      endTime: courseEndTime,
      dayOne: courseDayOne,
      dayTwo: courseDayTwo
    })
    if (!clashResult) {
      notify("There is a clash between Courses");
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
      const data = await axios.patch(`${courseSelectionRoute}/id/${courseId}`, objectToSend)
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

  const goToDashBoard = async (event) => {
    event.preventDefault();
    clearForm()
    navigate("/dashboard")
  }

  // Post request to submit course in backend
  const courseSubmit = async (event) => {
    event.preventDefault();
    setApiCall(true)
    const userInfo = localStorage.getItem('STTP-user');

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
      rollNum: userInfo
    }

    if (handleSubmit(obj)) {
      const data = await axios.post(courseSelectionRoute, objectToSend)
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

  // Get request to get courses related data 
  const getCoursesData = async () => {
    const data = await axios.get(courseSelectionRoute)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    setSelectedCourses(data.data)
    clearForm()
  }

  // To send roll number to backend
  const sendRollNumber = async () => {
    const userInfo = localStorage.getItem('STTP-user');
    const objectToSend = {
      rollNum: userInfo
    }

    const data = await axios.post(`${courseSelectionRoute}/rollnumber`, objectToSend)
      .then(function (response) {
        getCoursesData()
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // To Edit course data
  const editCourse = async (id) => {

    const data = await axios.get(`${courseSelectionRoute}/id/${id}`)
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
    const { courseStartTime, courseEndTime, courseWeeklyFirstLec, courseWeeklySecondLec } = userData

    const startTimes = ['08:00', '09:30', '11:00', '12:30', '13:00', '14:30', '16:00', '17:30', '19:00']

    const stIndex = startTimes.indexOf(courseStartTime)
    const enIndex = startTimes.indexOf(courseEndTime)
    var timeIn = []
    // var endTimes = []
    startTimes.forEach((time) => {
      const tempIndex = startTimes.indexOf(time)
      if (tempIndex >= stIndex && tempIndex < enIndex) {
        const str1 = courseWeeklyFirstLec + time
        const str2 = courseWeeklySecondLec + time
        timeIn = [...timeIn, str1, str2]
      }
    })

    latestSet = latestSet.filter((item) => {
      const tempCheck = timeIn.includes(item)
      return !tempCheck
    })
    setCourseSet(latestSet)
    return userData
  }

  const deleteCourse = async (id) => {

    let temp = await editCourse(id)
    setEditOn(false)

    const { courseStartTime,
      courseEndTime,
      courseWeeklyFirstLec,
      courseWeeklySecondLec } = temp

    const startTimes = ['08:00', '09:30', '11:00', '12:30', '13:00', '14:30', '16:00', '17:30', '19:00']

    const stIndex = startTimes.indexOf(courseStartTime)
    const enIndex = startTimes.indexOf(courseEndTime)
    var timeIn = []

    startTimes.forEach((time) => {
      const tempIndex = startTimes.indexOf(time)
      if (tempIndex >= stIndex && tempIndex < enIndex) {
        const str1 = courseWeeklyFirstLec + time
        const str2 = courseWeeklySecondLec + time
        timeIn = [...timeIn, str1, str2]
      }
    })

    latestSet = latestSet.filter((item) => {
      const tempCheck = timeIn.includes(item)
      return !tempCheck
    })

    setCourseSet(latestSet)

    const data = await axios.delete(`${courseSelectionRoute}/id/${id}`)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    getCoursesData()
  }

  const checkStrTime = (time) => {
    return courseStartTime === time
  }

  // Handle Form data
  const handleCourseStartTime = (val) => {
    setCourseStartTime(val)
  }

  const handleCourseEndTime = (val) => {
    setCourseEndTime(val)
  }

  const handleCourseDayOne = (val) => {
    setCourseDayOne(val)
  }

  const handleCourseDayTwo = (val) => {
    setCourseDayTwo(val)
  }

  useEffect(() => {

    // lOgout user if user details not found in the storage locally
    const currUser = JSON.parse(localStorage.getItem('STTP-user'))
    if (!currUser) {
      navigate("/")
    }
    sendRollNumber();
    // getCoursesData() 
  }, [])

  useEffect(() => {
    getCoursesData();
  }, [apiCall])

  useEffect(() => {
    const checkArr = ['09:30', '11:00', '12:30', '13:00', '14:30', '16:00', '17:30', '19:00']
    const strIndex = checkArr.findIndex(checkStrTime)
    const tempEndTime = checkArr.filter((time) => {
      const tempInx = checkArr.findIndex((item) => {
        return item === time
      })
      return tempInx > strIndex
    })
    setEndTimes(tempEndTime)
    setCourseEndTime(tempEndTime[0])
  }, [courseStartTime])

  return (
    <div className='w-screen h-screen flex flex-col justify-start items-center '>
      <div className='w-full  flex flex-col justify-center items-center'>
        <h1 className='text-5xl'>Course Selection</h1>
        <h3 className='text-2xl'>Input your courses</h3>
      </div>
      <div className='w-full  h-5/6 flex flex-row justify-center items-center'>
        <div className='w-1/2 h-full flex flex-col justify-center items-center'>
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-course-name">
                  Course Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3
                      px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-course-name"
                  type="text"
                  value={courseName}
                  placeholder="Enter Course Name"
                  onChange={(e) => setCourseName(e.target.value)} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-faculty-name">
                  Faculty Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                        border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white
                        focus:border-gray-500"
                  id="grid-faculty-name"
                  type="text"
                  value={facultyName}
                  placeholder="Enter Faculty Name"
                  onChange={(e) => setFacultyName(e.target.value)} />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-course-dscription">
                  Course Description
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border 
                        border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                        focus:bg-white focus:border-gray-500"
                  id="grid-course-description"
                  type="text"
                  placeholder="Add some description down here"
                  value={courseDescription}
                  onChange={(e) => { setCourseDescription(e.target.value) }
                  } />
                <p className="text-gray-600 text-xs italic">Not as important!</p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <DropDown
                label="Course Start Time"
                arr={startTimes}
                value={courseStartTime}
                onChange={handleCourseStartTime}
              />
              <DropDown
                label="Course End Time"
                arr={endTimes}
                value={courseEndTime}
                onChange={handleCourseEndTime}
              />
              <DropDown
                label="First Lecture Day"
                arr={days}
                value={courseDayOne}
                onChange={handleCourseDayOne}
              />
              <DropDown
                label="Second Lecture Day"
                arr={days}
                value={courseDayTwo}
                onChange={handleCourseDayTwo}
              />
            </div>

            <div className='w-full flex my-6 justify-center items-center'>
              {editOn ? (
                <>
                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold 
                              py-2 px-4 mx-2 border-b-4 border-red-700 hover:border-red-500 rounded"
                    onClick={updateCourse}>
                    Update
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 
                              px-4 mx-2 border-b-4 border-gray-700 hover:border-gray-500 rounded"
                    onClick={updateCourse}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 
                              border-b-4 border-red-700 hover:border-red-500 rounded"
                    onClick={courseSubmit}>
                    Add
                  </button>
                  <button className="bg-red-500 hover:bg-red-400 text-white font-bold mx-4 py-2
                              px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                    onClick={goToDashBoard}>
                    View Time Table
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {selectedCourses.length > 0 ? (
          <div className='w-1/2 h-max flex flex-row flex-wrap items-end justify-center gap-x-5 gap-y-5'>
            {selectedCourses.map((item) => {

              const { _id,
                courseName,
                courseFaculty,
                courseDescription,
                courseStartTime,
                courseEndTime,
                courseWeeklyFirstLec,
                courseWeeklySecondLec } = item

              return (
                <div className="block p-6 rounded-lg shadow-2xl bg-white w-1/4 h-1/4">
                  <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    Course Name: {courseName}
                  </h5>
                  <h6>Days: {courseWeeklyFirstLec} {courseWeeklySecondLec}</h6>
                  <h6 className='mb-2'>Time: {courseStartTime} {courseEndTime}</h6>

                  <button
                    type="button"
                    className="opacity-90 inline-block  px-1 py-1  bg-red-600
                     text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                     hover:bg-red-500 hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                     focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition
                      duration-150 ease-in-out mx-2"
                    onClick={() => { editCourse(_id) }}>
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    className="opacity-90 inline-block px-1 py-1  bg-red-600
                      text-white font-medium text-xs leading-tight uppercase rounded shadow-md
                      hover:bg-red-500 hover:shadow-lg focus:bg-red-700 focus:shadow-lg 
                        focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition 
                        duration-150 ease-in-out mx-2"
                    onClick={() => { deleteCourse(_id) }}>
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
