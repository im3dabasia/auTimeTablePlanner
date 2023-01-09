// External Modules
import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

// Local Modules
import { loginRoute } from '../../utils/ApiRoutes'
import { notify } from './Register';

const Login = () => {
  const navigate = useNavigate()

  const loginSubmit = async (event) => {
    event.preventDefault();
    const { rollNum, passWord } = await event.target;
    const obj = { 
      rollNum: rollNum.value,
      passWord: passWord.value 
    };

    if ((obj)) {
      const { data } = await axios.post(loginRoute, obj)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (data.status === true) {
        localStorage.setItem(
          "STTP-user",
          JSON.stringify(data.userData.rollNum)
        );
        navigate("/courseselection");
      }
      else {
        notify(data.msg);
      }
    } 
    else {
      notify("Something went wrong please try again later");
    }
  };

  const myStyle = {
    backgroundImage: `url("./bg-auth.png")`,
    height: '100vh',
    backgroundSize: 'cover',
    filter: "hue-rotate(150deg)",
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div style={myStyle} className='bg-fixed flex flex-col justify-center	items-center content-center h-screen w-screen' >
      <h1 className='font-medium leading-tight text-5xl mt-0 mb-8'>Student Login </h1>
      <form onSubmit={loginSubmit} >
        <div className='flex` justify-center content-center' >
          <div className="mb-3 xl:w-96">
            <label forhtml="rollNum" className="form-label inline-block mb-2 text-gray-700"
            >Roll Number
            </label>
            <input
              type="number"
              className="form-control block w-full px-3 py-1.5 text-base font-normaltext-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                  ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 
                  focus:outline-none"
              id="rollNum"
              placeholder="Input your roll number here"
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
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-white
                  bg-blue-500 hover:bg-blue-700 g-clip-padding border border-solid border-gray-300 
                    rounded   m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 
                    focus:outline-none transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  
                    duration-300"
                id="exampleText0"
                placeholder="Login"
              />
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login

