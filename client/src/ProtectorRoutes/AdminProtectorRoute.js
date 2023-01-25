import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


const useAuth = () => {
    const admin = useSelector((state) => state.admin.adminDetails)
    // const user = email
    return admin 
}

const AdminProtectorRoute = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <Navigate to='/admin' />
}

export default AdminProtectorRoute