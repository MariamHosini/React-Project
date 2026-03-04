import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
export default function footer() {
  return (
    <>
        <footer className=" sm:footer-horizontal footer-center bg-transparent flex items-center justify-center ">
            <div className='bg-light-primary-500 rounded-t-[36px] dark:bg-dark-primary-500'>
                <Link to="/" >
                    <img src={logo} alt="logo" className="  w-auto h-28" />
                </Link>
            </div>
        </footer>
        <footer className="flex rounded-t-0 lg:rounded-t-[45px]  lg:flex-row flex-col lg:justify-between  sm:footer-horizontal bg-light-primary-500 dark:bg-dark-primary-500 lg:p-10 md:p-7 p-2 ">
           <div className='flex flex-col flex-[40%] mt-5 lg:mt-0'>
               <div className='lg:text-start text-center mb-4 '> <h2 className='text-light-neutral-50 dark:text-dark-neutral-800 font-opensans lg:text-24 text-16 font-semibold'>Follow us on social media to get the latest updates and special offers.</h2></div>
               <div className='flex items-center lg:justify-normal justify-center'>
                <div className='bg-light-secondary-400 dark:bg-dark-secondary-800 rounded-xl  
                  hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                lg:w-[52px] lg:h-[52px] w-[40px] h-[40px] flex items-center justify-center mr-2'>
                   <NavLink to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-instagram text-light-primary-400 dark:text-dark-primary-500 text-28"></i>
                     </NavLink>
                </div>
                <div className='bg-light-secondary-400 dark:bg-dark-secondary-800 
                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                rounded-xl lg:w-[52px] lg:h-[52px] w-[40px] h-[40px] flex items-center justify-center mr-2'>
                     <NavLink to="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-whatsapp  text-light-primary-400 dark:text-dark-primary-500 text-28"></i>
                     </NavLink>
                </div>
                <div className='bg-light-secondary-400 dark:bg-dark-secondary-800
                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                rounded-xl lg:w-[52px] lg:h-[52px] w-[40px] h-[40px] flex items-center justify-center mr-2'>
                        <NavLink to="https://web.telegram.org/k/" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-telegram  text-light-primary-400 dark:text-dark-primary-500 text-28"></i>
                        </NavLink>
                </div>
               </div>
           </div>
           <div className='flex-[10%]'></div>
           <div className='lg:flex-[50%] flex  lg:justify-evenly justify-between flex[100%] mt-5 lg:mt-0 font-normal lg:font-bold'>
                <div className='flex flex-col justify-between '>
                    <ul>
                       <li className='mb-1'> <p className='lg:text-20 md:text-16 text-11 text-light-secondary-400 dark:text-dark-primary-800'>Explore</p></li>
                       <li className='mb-1'> <Link to="/products" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>Products</Link></li>
                       <li className='mb-1'><Link to="/blog" className={"text-10 md:text:12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>Blog</Link></li>
                        <li className='mb-1'><Link to="/contact-us" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>Contact us</Link></li>
                    </ul>
                </div>
               <div className='flex flex-col justify-between  '>
                <ul>
                   <li className='mb-1'> <p className='lg:text-20 md:text-16 text-11 text-light-secondary-400 dark:text-dark-primary-800'>Customer Support</p></li>
                    <li className='mb-1'><Link to="/products" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>FAQ</Link></li>
                    <li className='mb-1'><Link to="/blog" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>Shipping & Returns</Link></li>
                    <li className='mb-1'><Link to="/contact-us" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>Privacy Policy</Link></li>
                </ul>
                </div>
                
            <div className='flex flex-col justify-between '>
                <ul>
                    <li className='mb-1'><p className='lg:text-20 md:text-16 text-11 text-light-secondary-400 dark:text-dark-primary-800'>Contact Information</p></li>
                    <li className='mb-1'><Link to="/products" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>support@femmeflair.com</Link></li>
                    <li className='mb-1'><Link to="/blog" className={"text-10 md:text-12 lg:text-14 text-light-neutral-50 dark:text-dark-neutral-800"}>Phone: +1 (800) 123-4567</Link></li>
                </ul>
                </div>
           </div>
        </footer>
        <footer className=" sm:footer-horizontal footer-center p-4 bg-transparent">
        <aside>
            <p className='text-light-secondary-800 dark:text-dark-secondary-300 text-12 lg:text-14 '>Copyright © {new Date().getFullYear()} FemmeFlair. All right reserved</p>
        </aside>
        </footer>
    </>
  )
}
