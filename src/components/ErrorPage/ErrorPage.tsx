import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import './ErrorPage.css'

const ErrorPage: FC = () => {
  return (
    <div className="notfound">
      <div className="notfound-404">
        <h1>404</h1>
        <h2>Page not found</h2>
      </div>
      <Link to={'/'}>Homepage</Link>
    </div>
  )
}

export default ErrorPage
