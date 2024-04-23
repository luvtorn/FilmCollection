import React from 'react'
import { Outlet } from 'react-router-dom'

import './Layout.css'
import Tabs from '../Tabs/Tabs'

const Layout = () => {
  return (
    <div className="container">
      <Tabs />
      <Outlet />
    </div>
  )
}

export default Layout
