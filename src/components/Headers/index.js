import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Headers = () => {
  const [sideBar, setSideBar] = useState(false);

  const isSideBarOpen = sideBar ? "0%" : "-100%";

  const handleSideBar = () => setSideBar(!sideBar);

  return (
    <header className="border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button type="button" className="md:hidden" onClick={handleSideBar}>
            <FiMenu />
          </button>
          <h3 className="ml-2">V</h3>
        </div>
        <h1 className="font-bold text-2xl">V Mart</h1>
        <div className="border-black flex items-center">
          <button className="pointer">
            <FaUser />
          </button>
          <Link to="/login">
            <button className="text-md ml-2 border-black">Login</button>
          </Link>
        </div>
      </div>
      <nav
        className={`pt-4 mt-1 bg-[#fff] md:mt-2 fixed left-[${isSideBarOpen}] h-[100vh] w-[60%] md:h-14 md:w-[100%] md:static md:flex md:justify-center`}
      >
        <ul className=" md:flex md:items-center  md:w-[45%] md:justify-between h-[100%]">
          <Link to="/">
            <li className="p-2 my-1 text-sm  md:text-center  md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
              SHOP
            </li>
          </Link>
          <li className="p-2 my-1 text-sm  md:text-center md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
            WISHLIST
          </li>
          <li className="p-2 my-1 text-sm  md:text-center md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
            CART
          </li>
          <li className="p-2 my-1 text-sm  md:text-center md:w-[120px]  font-semibold hover:bg-[#000] hover:text-[#fff]">
            CONTACT US
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Headers;
