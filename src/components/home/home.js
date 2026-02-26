import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../../store/themeSlice.js';

export default function Home() {
  const dispatch = useDispatch();
   function click(){
    dispatch(toggleTheme())
    }
  return (
    <>
      
    </>

  )
}
