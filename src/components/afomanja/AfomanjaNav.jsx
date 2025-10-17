import { BsFire } from "react-icons/bs"; 
import { BiX } from "react-icons/bi"; 
import React from 'react'

const AfomanjaNav = () => {
  return (
    <>
        <nav className="w-full px-10 py-4 flex items-center justify-between">
            <div className="logo flex gap-2 items-center">
                <BsFire size={30}/>
                <span className="font-semibold font-teko text-3xl">Afomanja</span>
            </div>
            <div className="border-2 border-pink-400 rounded-lg flex items-center px-4 py-2 uppercase font-semibold">
                <BiX size={25}/> <span>Menu</span>
            </div>
        </nav>
    </>
  )
}

export default AfomanjaNav