import React from 'react'
import {useSelector} from'react-redux'
export default function Spinner({className}) {
    const mode = useSelector((store => store.spinner.mode))
  return (
    <>
        {
            mode && <span className={`loading loading-dots loading-xl text-light-primary-400 ... ${className}`}></span>

        }
    </>
  )
}
