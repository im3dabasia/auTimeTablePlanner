// External Modules
import React from 'react'
import axios from 'axios'
import {  useNavigate } from "react-router-dom";

// Local Modules
import { registerRoute } from '../../utils/ApiRoutes'
import { ToastContainer, toast } from 'react-toastify';

// react-toastify css preloaders
import 'react-toastify/dist/ReactToastify.css';

export const notify = (inputData) => toast(`${inputData} !`);
const Register = () => {
  const navigate = useNavigate();

  const myStyle = {
    backgroundImage: `url("./bg-auth.png")`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    filter: "hue-rotate(150deg)"
  };

  // Handeling the input details before submitting 
  const handleSubmit = (obj) => {
    const { rollNum, name, passWord } = obj;
    if (rollNum.length !== 8) {
      notify("roll number is not 8 digits long");
      return false
    }
    if (name.length === 0) {
      notify("name is not valid");
      return false;
    }
    if (passWord.length === 0 || passWord.length < 4) {
      notify("password is not valid");
      return false;
    }
    return true;
  }

  const registerSubmit = async (event) => {
    event.preventDefault();
    const { rollNum, name, passWord } = event.target;
    const obj = { 
      rollNum: rollNum.value,
      name: name.value,
      passWord: passWord.value 
    };

    if (handleSubmit(obj)) {
      const { data } = await axios.post(registerRoute, obj)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (data.status) {
        localStorage.setItem(
          "STTP-user",
          JSON.stringify(data.newUser.rollNum)
        );
        navigate("/courseselection");
      } else if (!data.status) {
        notify(data.msg);
      }
    }
    else {
      notify("Error");
    }
  };
  return (
    <div style={myStyle} className=' flex flex-col justify-center	 items-center	 content-center h-screen	w-screen'>
      <h1 className='font-medium leading-tight text-5xl mt-0 mb-8'>Student Registration </h1>
      <form onSubmit={registerSubmit}>
        <div className='flex  justify-center content-center' >
          <div className="mb-3 xl:w-96">
            <label forhtml="rollNum" className="form-label inline-block mb-2 text-gray-700"
            >Roll Number
            </label>
            <input
              type="number"
              className="form-control block w-full px-3 py-1.5 text-base font-normaltext-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300 rounded
                  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:bord`er-blue-600 focus:outline-none"
              id="rollNum"
              placeholder="Input your roll number here"
            />
            <label forhtml="name" className="form-label inline-block my-2 text-gray-700"
            >Full Name
            </label>
            <input
              type="string"
              className="form-control block w-full px-3 py-1.5 text-base font-normaltext-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Input your name here"
            />
            <label forhtml="passWord" className="form-label inline-block my-2 text-gray-700"
            >Password
            </label>
            <input
              type="password"
              className="form-control block w-full px-3 py-1.5 text-base font-normaltext-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 
                  focus:outline-none"
              id="passWord"
              placeholder="Password input"
            />
            <div className="my-6 xl:w-96">
              <input
                type="submit"
                className="form-control block w-full px-3 py-1.5 text-base font-normaltext-gray-700
                    g-clip-padding border border-solid border-gray-300 rounded text-white m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none 
                    transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 
                  bg-blue-500  duration-300"
                id="exampleText0"
                placeholder="Register"
              />
            </div>
          </div>
        </div>
      </form>
      {/* To show notifications in the notification window */}
      <ToastContainer />
    </div>
  )
}

export default Register