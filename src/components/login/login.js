import React from 'react'
import supabase from '../../supabaseClient'
import loginImage from '../../assets/login.jpg'
import { useForm } from 'react-hook-form'
export default function login() {
  return (
    <>
      <div className='flex justify-center  items-center  h-lvh'>
        <div className='flex w-[80%] lg:w-[45%] h-[80%]'></div>
        <div className=' static hidden lg:flex lg:justify-center lg:items-end lg:w-[45%]  h-[80%] rounded-3xl bg-cover bg-no-repeat'style={{backgroundImage:`url(${loginImage})`}}>
            <div className="relative w-[90%] bottom-10">
                <div className="absolute inset-0  bg-gradient-to-br  from-pink-200/40  to-purple-200/40 rounded-2xl translate-x-4 translate-y-4  z-0">
                </div>
                <div className="relative  bg-light-secondary-100  p-4 rounded-2xl z-10">
                     <p className="text-light-secondary-800  font-serif italic text-20 text-center">
                          “ Beautiful skin starts with self-care—nourish it, and let your inner glow shine through “ </p> </div></div>
        </div>
      </div>
    </>
  )
}
