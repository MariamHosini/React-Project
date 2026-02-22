import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../store/themeSlice';

export default function Home() {
  const dispatch = useDispatch();
   function click(){
    dispatch(toggleTheme())
    }
  return (
    <>
          <div className='text-green-900 dark:text-red-800'>home</div>
          <button className='bg-green-500 dark:bg-red-500 text-white px-4 py-2 rounded'
          onClick={()=>click()}
          >Click me</button>
    </>

  )
}
