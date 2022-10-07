import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const status = useSelector((state: any) => state.face)
  return status.adminAccess ? children : <Navigate to='/overview' />
}

export default PrivateRoute