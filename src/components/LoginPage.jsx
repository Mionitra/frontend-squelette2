import React from 'react'
import AfomanjaNav from './afomanja/AfomanjaNav'
import Login from './afomanja/Login'

const LoginPage = () => {
  return (
    <>
        <div className="w-screen h-screen overflow-hidden relative bg-neutral-50">
            <AfomanjaNav/>
            <Login/>
        </div>
    </>
  )
}

export default LoginPage