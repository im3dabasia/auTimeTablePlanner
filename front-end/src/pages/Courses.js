import React, { useEffect, useState, useId } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './Register';

const Courses = () => {

  const navigate = useNavigate();

  const [rawData, setRawData] = useState([])
  const [selectedCourses, setSelectedCourses] = useState([])

  const getData = async (req, res) => {
    const tempData = await axios.get('http://www.localhost:5000/api/courseselection')
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(tempData)
    setRawData(tempData.data)

  }


  const handleSubmit = async (event) => {
    const rollNum = JSON.parse(localStorage.getItem('STTP-user'))
    console.log(rollNum.rollNum)
    event.preventDefault();
    const obj = {
      data: selectedCourses,
      rollNum: rollNum.rollNum
    }
    if (handleSubmit(obj)) {

      const data = await axios.post('http://www.localhost:5000/api/courseselection', obj)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (data.data.status === true) {
        navigate("/dashboard")
      }

    }
    else {
      console.log("error");
    }


  }


  const checkedBox = (i, e) => {

    console.log(e.target.checked);
    if (e.target.checked) {
      setSelectedCourses([...selectedCourses, i])

    } else {

      let arr = selectedCourses.filter(function (item) {
        return item !== i
      })
      setSelectedCourses(arr)

    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <h1 className='mb-2 text-5xl'> Course Selection</h1>
      <h3 className='mb-8 text-2xl'> Select any 4 courses you want to opt for</h3>

      <div className='w-1/2 h-3/4 flex flex-col justify-center items-center'>

        <form onSubmit={handleSubmit} className='w-full h-full flex flex-col justify-center items-center'>


          {rawData ? Object.values(rawData).map((course, index) => {

            return (

              <div key={index} className='flex flex-row justify-center	items-center mb-4  border-4	border-black-300 h-1/6	w-full rounded-xl	  '>
                <label htmlfor="red-toggle" className="inline-flex relative items-center mr-5 cursor-pointer">

                  <input type="checkbox" value="" id="red-toggle" className="sr-only peer" onClick={(e) => checkedBox(index, e)} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                </label>

                <label htmlFor={`courseName${index}`} className='w-1/2 flex 	items-center text-3xl	 h-full'><p >{index + 1}. {course.courseName}</p></label>

                <div className='flex flex-col w-1/2 h-full justify-center	 '>
                  <div className="text-1xl text-center">Time:{course.courseTime}</div>
                  <div className="text-1xl text-center">Faculty: {course.courseFaculty} </div>
                </div>

              </div>
            );
          }) : null}


          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>


        </form>

      </div >
    </div >
  )
}


export default Courses