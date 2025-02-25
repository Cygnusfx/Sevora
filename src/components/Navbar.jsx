import React, { useState } from "react";
import { RiHome9Line, RiSearch2Line } from "react-icons/ri";
import { LuPopcorn, LuTvMinimal } from "react-icons/lu";
import { FaRegBookmark } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5"; // Hamburger Icon
import { Link } from "react-router-dom";
import logo from "../assets/SEVORA.png";

const navItems = [
  { name: "Home", icon: <RiHome9Line className="text-2xl" /> },
  { name: "Search", icon: <RiSearch2Line className="text-2xl" /> },
  { name: "Movies", icon: <LuPopcorn className="text-2xl" /> },
  { name: "Series", icon: <LuTvMinimal className="text-2xl" /> },
  { name: "Favourites", icon: <FaRegBookmark className="text-2xl" /> },
];

function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar (Visible above 640px) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden sm:flex sm:h-screen w-28 2xl:gap-20 bg-[#0b0909] flex-col border-r border-zinc-800 relative"
      >
        {/* Background Gradient */}
        <div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r from-[#0b0909] to-transparent transition-all duration-300 z-0 ${
            isHovered ? "sm:w-96" : "w-0"
          }`}
        />

        {/* Logo */}
        <div className="w-full py-8 flex justify-center items-center z-10">
          <img className="h-10" src={logo} alt="Sevora" />
        </div>

        {/* Navigation Links */}
        <div className="py-10 pl-10 justify-center items-center z-10">
          <div className="hidden sm:flex flex-col gap-4 hover:text-white text-xl">
            {navItems.map((item, index) => (
              <Link
                to={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
                key={index}
              >
                <div className="relative flex items-center group z-10 cursor-pointer">
                  <div className="w-12 h-12 flex justify-center items-center transition-all duration-300 text-[#b4b4b4]">
                    {item.icon}
                  </div>
                  <span
                    className={`text-xl transition-all duration-300 group-hover:text-white group-hover:translate-x-4 ${
                      isHovered
                        ? "opacity-100 translate-x-6 text-[#b4b4b4]"
                        : "opacity-0 -translate-x-2 text-[#b4b4b4]"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Profile Icon */}
        <div className="pl-10 mb-10 mt-auto text-white relative">
          <div className="flex items-center z-10 group cursor-pointer">
            <div className="w-12 h-12 flex justify-center items-center">
              <div className="h-8 w-8 bg-green-300 rounded-full"></div>
            </div>
            <span
              className={`text-xl transition-all duration-300 group-hover:text-white group-hover:translate-x-4 ${
                isHovered
                  ? "opacity-100 translate-x-6 text-[#b4b4b4]"
                  : "opacity-0 -translate-x-2 text-[#b4b4b4]"
              }`}
            >
              Profile
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navbar (Visible below 640px) */}
      <div className="sm:hidden fixed bottom-0 w-full  bg-[#0b0909] flex justify-between items-center py-4 px-6 border-t border-zinc-800">
        {/* Left: Logo */}
        <img className="h-8" src={logo} alt="Sevora" />

        {/* Center: Hamburger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white text-3xl"
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Right: Profile Icon */}
        <div className="h-8 w-8 bg-green-300 rounded-full"></div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="sm:hidden fixed bottom-16 left-0 w-full bg-[#1a1a1a] p-4 rounded-t-xl shadow-lg">
          <ul className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <Link
                to={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
                key={index}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-white text-lg hover:text-gray-400"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
