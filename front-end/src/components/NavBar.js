// External Modules
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Link, useMatch, useResolvedPath } from "react-router-dom"

// Internal Modules
import { userDetailsRoute } from '../utils/ApiRoutes'

// Components
import Button from "./Button"

export default function Navbar() {
  const [userData, setUserData] = useState([])
  const navigate = useNavigate();

  const rollNum = JSON.parse(localStorage.getItem('STTP-user'))
  const objToSend = {
    rollNum: rollNum
  }

  const logOut = () => {
    localStorage.removeItem('STTP-user')
    navigate('/')
  }

  const getUserDetails = async (req, res) => {
    const tempData = await axios.post(userDetailsRoute, objToSend)
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    setUserData(tempData.data.userProfile)
  }

  useEffect(() => {
    getUserDetails()
  }, [userData])

  return (
    <nav className="bg-white border-gray-200  rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto my-4">
        <Link to="/dashboard" className="flex items-center">
          <img src="./AU_logo.jpg" className="h-6 mr-3 sm:h-9" alt="AU Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            AU Student TimeTable Planner
          </span>
        </Link>

        {/* Getting user detail from local storage */}
        {
          localStorage.getItem('STTP-user') ? (
            <div>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {userData ? userData.name : ""}
              </span>
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {userData ? userData.rollNum : ""}
              </span>
            </div>) : null
        }

        <button data-collapse-toggle="navbar-default" type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden
            hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400
            dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd">
            </path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          {
            localStorage.getItem('STTP-user') ? (
              < ul
                className="flex flex-row p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50
                   md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white
                 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
              >
                <div>
                  <Link to="/dashboard" >
                    <Button className="bg-red-500 hover:bg-red-400 text-white 
                                font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                      label="Time Table">
                    </Button>
                  </Link>
                  <Link to="/courseselection" >
                    <Button className="bg-red-500 hover:bg-red-400 text-white 
                                font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" 
                      label="Course Selection" >
                    </Button>
                  </Link>
                  <Link to="/" >
                    <Button className="bg-red-500 hover:bg-red-400 text-white 
                                font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" 
                      label="Log out" onClick={logOut}>
                    </Button>
                  </Link>
                </div>
              </ul>) : null
          }
        </div>
      </div>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

