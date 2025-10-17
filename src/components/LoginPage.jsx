import React from 'react'
import AfomanjaNav from './afomanja/AfomanjaNav'
import Login from './afomanja/Login'
import { SpaceCanvas } from './Home/ThreeDCharacter' // ajout
import BackBtn from './afomanja/BackBtn'

const LoginPage = () => {
  return (
    <>
        <div className="w-screen h-screen overflow-hidden relative bg-gradient-to-tl from-black to-slate-900">
            <BackBtn/>
            <SpaceCanvas />
            <Login/>
        </div>
    </>
  )
}

export default LoginPage