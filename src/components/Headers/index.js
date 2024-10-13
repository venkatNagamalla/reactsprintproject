import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Link} from 'react-scroll'
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Cookies from 'js-cookie'
import './index.css'

const Headers = () => {

  const navigate = useNavigate()

  const [logoutCard,setLogoutCard] = useState(false)

  const [sideBar, setSideBar] = useState(false);


  const isSideBarOpen = sideBar ? "open" : "close";

  const handleSideBar = () => setSideBar(!sideBar);

  const handleLogoutCard = () => setLogoutCard(!logoutCard)


  const handleLogout = () => {
     Cookies.remove("jwt_token")
     handleLogoutCard()
     navigate("/")

  }


  const logoutCardSection = () => (
    <div className="fixed z-20 flex justify-center items-center top-0 bottom-0 left-0 right-0  bg-[#0008]">
      <div className= "bg-white rounded-md h-[180px] w-[90%] md:w-[40%] flex flex-col justify-center items-center ">
          <p className="text-lg">Are you sure wants to logout?</p>
          <div className="mt-2">
          <button type="button" className="w-[65px] m-2 px-2 py-1 text-white bg-blue-500" onClick={handleLogout}>YES</button>
          <button type="button" className="border w-[65px] m-2 px-2 py-1 border-black" onClick={handleLogoutCard}>NO</button>
          </div>
      </div>
      </div>
  )

  return (
    <header className="pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button type="button" className="md:hidden ml-3" onClick={handleSideBar}>
            <FiMenu size={30} />
          </button>
          <h3 className="mr-5 hidden md:block ml-2 md:ml-0 w-8 border text-center border-black">
            <NavLink to="/">V</NavLink>
          </h3>
        </div>
        <h1 className="font-[500] text-3xl">V Mart</h1>
        <div className="border-black flex items-center">
          <button className="pointer">
            <FaUser />
          </button>
          {Cookies.get("jwt_token") ? <button type="button" onClick={handleLogoutCard} className="ml-4 bg-red-500 rounded-md text-white w-[80px] h-8" >Logout</button> : <NavLink to="/login">
            <button className="text-md ml-4 text-white bg-blue-500 w-[80px] h-8 rounded-md">Login</button>
          </NavLink>}
        </div>
      </div>
      <nav
        className={`md:border-b top-0 md:border-t border-[#0003] bg-[#edebebf8] md:bg-white md:mt-5 fixed ${isSideBarOpen} trans h-[100vh] z-10 w-[75%] px-3 md:h-14 md:w-[100%] md:static md:flex md:justify-center`}
      >
        <button onClick={handleSideBar} className="md:hidden  ml-2 w-8 mt-5 border border-black">X</button>
           
        <ul className="md:flex md:items-center  md:w-[45%] mt-7 md:mt-0 md:justify-between h-[100%]">
          <NavLink to="/" onClick={handleSideBar} >
            <li className="p-2 my-1 text-md  md:text-center  md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
              SHOP
            </li>
          </NavLink>

          <NavLink to="/about" onClick={handleSideBar} >
          <li className="p-2 my-1 text-md  md:text-center md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
            ABOUT
          </li>
          </NavLink>
          <NavLink to="/cart" onClick={handleSideBar}>
          <li className="p-2 my-1 text-md  md:text-center md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
            CART
          </li>
          </NavLink>
          
          <Link
              onClick={handleSideBar}
              offset={-40}
              spy={true}
              to="contact"
              smooth={true}><li className="p-2 my-1 text-md  md:text-center md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
            CONTACT US
          </li></Link>
        </ul>
      </nav>
      {logoutCard ? logoutCardSection() : null}
    </header>
  );
};

export default Headers;
