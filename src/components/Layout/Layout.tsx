import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

import './Layout.css'
import Tabs from '../Tabs/Tabs.tsx'

const Layout: FC = () => {
  return (
    <div className="container">
      <Tabs />
      <Outlet />
    </div>
  )
}

export default Layout
