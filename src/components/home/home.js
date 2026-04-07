import React from "react";
import { useNavigate } from "react-router-dom";
import modelImage from "../../assets/model2.png";
import backGround from "../../assets/bg.webp";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-0 md:px-6 lg:px-6 mb-16 md:mb-18 lg:mb-32 gap-8">
      {/*Upper part */}
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center w-full ">
        <div className="w-[100%] lg:w-[35%] flex flex-col gap-3 px-4 md:px-0 text-center lg:text-start items-center lg:items-start">
          <h1
            className="text-light-secondary-900 dark:text-dark-secondary-500
            font-playfair font-bold text-40 lg:text-48 "
          >
            Glow Beyond Limits
          </h1>
          <p className="font-opensans text-16 text-light-secondary-600 dark:text-dark-secondary-300">
            Elevate your beauty ritual with FemmeFlair. Discover premium
            essentials designed to celebrate your unique glow and redefine your
            elegance."
          </p>
          <button
            type="submit"
            className="justify-center items-center rounded-2xl border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
             bg-light-secondary-400 border-[2px] h-[50px] w-[60%] md:w-[40%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
               dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
               disabled:bg-light-neutral-600"
            onClick={() => {
              navigate("/products");
            }}
          >
            Shop Now
          </button>
        </div>
        <div className="w-[100%] lg:w-[65%] md:flex-row flex-col flex gap-4">
          <div className="flex-1 flex justify-center ">
            <div
              className="w-[100%] lg:w-[70%]  rounded-t-full  h-[350px] flex justify-center items-end "
              style={{ backgroundImage: `url(${backGround})` }}
            >
              <img
                className=" w-auto h-full "
                src={modelImage}
                alt="Beauty model showcasing femme flair makeup"
              ></img>
            </div>
          </div>
          <div className="flex-1  justify-center flex flex-col gap-3 px-4 md:px-0 text-center md:text-start items-center md:items-start">
            <div className=" flex justify-center  gap-3 mb-5 lg:mb-0">
              <div
                className="flex items-center justify-center  
                  xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
                  lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
                  md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
                  w-[60px] h-[60px] rounded-2xl  text-20  p-4
                  dark:bg-dark-neutral-600 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                +50
              </div>
              <div className="flex flex-col ">
                <h5
                  className=" text-start font-bold font-playfair
                    text-light-secondary-900 
                    dark:text-dark-secondary-300 
                    xl:text-28  lg:text-20 md:text-24 text-20"
                >
                  Product
                </h5>
                <p
                  className=" font-opensans lg:w-[90%] text-start text-12
                    dark:text-dark-secondary-500 
                  text-light-secondary-600  "
                >
                  Transform your makeups routine with our innovative solutions.
                </p>
              </div>
            </div>
            <div className=" flex justify-center gap-3">
              <div
                className="flex items-center justify-center  
                  xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
                  lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
                  md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
                  w-[60px] h-[60px] rounded-2xl  text-20  p-4
                  dark:bg-dark-neutral-600 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                +1K
              </div>
              <div className="flex flex-col">
                <h5
                  className="text-start font-bold font-playfair
                    text-light-secondary-900 
                    dark:text-dark-secondary-300 
                    xl:text-28  lg:text-20 md:text-24 text-20"
                >
                  Users
                </h5>
                <p
                  className="font-opensans lg:w-[90%] text-start text-12
                    dark:text-dark-secondary-500 
                  text-light-secondary-600  "
                >
                  Transform your makeup routine with our innovative solutions.
                </p>
              </div>
            </div>
            <div className=" flex justify-center gap-3">
              <div
                className="flex items-center justify-center  
                  xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
                  lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
                  md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
                  w-[60px] h-[60px] rounded-2xl  text-20  p-4
                  dark:bg-dark-neutral-600 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                24/7
              </div>
              <div className="flex flex-col">
                <h5
                  className="text-start font-bold font-playfair
                    text-light-secondary-900 
                    dark:text-dark-secondary-300 
                    xl:text-28  lg:text-20 md:text-24 text-20"
                >
                  Online Support
                </h5>
                <p
                  className="font-opensans lg:w-[90%] text-start text-12
                    dark:text-dark-secondary-500 
                  text-light-secondary-600  "
                >
                  Transform your makeup routine with our innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*cards */}
      <div className="md:px-0 px-4 w-full rounded-r-2xl rounded-l-2xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-16">
        <div className="flex border-light-neutral-100 rounded-xl border p-4 hover:shadow-xl gap-8 
        dark:border-dark-secondary-700">
          <div className="text-green-800 text-20"><i className="fa-solid fa-truck-fast"></i></div>
          <div className="flex flex-col">
              <p className="text-light-secondary-800 font-bold text-20 dark:text-dark-secondary-300">Free Shipping</p>
              <p className="text-light-secondary-600  text-16 dark:text-dark-secondary-500">On orders over 10k EGP</p>
          </div>
        </div>
        <div className="flex border-light-neutral-100 rounded-xl border p-4 hover:shadow-xl gap-8 
        dark:border-dark-secondary-700">
          <div className="text-green-800 text-20"><i className="fa-solid fa-shield-halved"></i></div>
          <div className="flex flex-col">
              <p className="text-light-secondary-800 font-bold text-20 dark:text-dark-secondary-300">Secure Payment</p>
              <p className="text-light-secondary-600  text-16 dark:text-dark-secondary-500">100% Secure transaction</p>
          </div>
        </div>
        <div className="flex border-light-neutral-100 rounded-xl border p-4 hover:shadow-xl gap-8 
        dark:border-dark-secondary-700">
          <div className="text-green-800 text-20"><i className="fa-solid fa-star"></i></div>
          <div className="flex flex-col">
              <p className="text-light-secondary-800 font-bold text-20 dark:text-dark-secondary-300">20% Discount</p>
              <p className="text-light-secondary-600  text-16 dark:text-dark-secondary-500">On first order when register</p>
          </div>
        </div>
      </div>
    </div>
  );
}
