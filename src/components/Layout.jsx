import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="h-full flex flex-col">
      <div className="h-full fixed top-0 left-0 z-10">
        <Navbar />
      </div>
      <main className="sm:ml-28 flex-1 h-screen overflow-auto bg-gray-100 z-0">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout