import React from 'react';
import Style from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Offline, Online } from "react-detect-offline";
export default function Layout() {

  
  return <>
    <div className="container">

  <Navbar/>
  <Outlet/>
  </div>
  <div>
    <Offline>
      <div className="network">
      Only shown offline (surprise!)
      </div>
      </Offline>

  <Footer/>
  </div>
  </>
}
