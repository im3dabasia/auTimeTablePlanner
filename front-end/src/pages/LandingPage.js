import React from 'react'
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    // Left side component
    <div className='w-screen h-screen	flex flex-row justify-center items-center	'>
      <div className='w-1/2 h-screen	flex flex-row justify-center	items-center	'>
        <img className='h-4/6	px-6' alt="hello" src="./stock-image.jpg"></img>
      </div>

      {/* Right side component */}
      <div className='flex h-screen	flex-col justify-center items-center w-1/2 ml-10'>
        <h1 id="page-title" className='w-full font-medium leading-tight text-5xl mt-0 mb-8 text-gray-700'>
          <Typewriter
            onInit={(typewriter) => {
              typewriter.typeString('Time Table Planner')
                .pauseFor(2500)
                .start();
            }}
          />
        </h1>

        <p className='text-2xl	font-light leading-relaxed mt-0 mb-4 text-gray-800'>
          A single place to plan / draft / manage your classes.
          Create your timetable and have a look at the calendar and see all your scheduled
          classes in one place.
          You can also unenroll in the courses you don't like.
        </p>
        <div className='flex flex-row justify-start	 items-start	w-full mt-8	'  >
          <Link to="/register">
            <button
              className='text-3xl	bg-red-500  text-white font-bold py-2 px-4 
                rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110
              hover:bg-red-700 duration-300'>
              Register
            </button>
          </Link>
          <Link to="/login">
            <button
              className='text-3xl	mx-4 bg-gray-500 text-white font-bold 
                  py-2 px-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 
                  hover:scale-110 hover:bg-gray-700 duration-300' >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

