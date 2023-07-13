import React from 'react'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className="max-w-md md:max-w-lg m-auto p-5 my-12">
            <Outlet />
        </div>
    )
}

export default Layout