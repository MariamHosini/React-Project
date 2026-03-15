import React from "react";
import image from "../../assets/Group.webp";
import { useDispatch, useSelector } from "react-redux";
import { stopSpinner, startSpinner } from "../../store/spinnerSlice";
import Spinner from "../spinner/spinner";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function ContactUs() {
  const dispatch =useDispatch();
  const[message , setMessage]= useState(false);
  const loadding = useSelector((store) => store.spinner.mode);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: onchange });
  function submit() {
    dispatch(startSpinner());
    setTimeout(() => {
      dispatch(stopSpinner());
      reset({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
      setMessage(true);
      setTimeout(() => {
      setMessage(false);
    }, 3000);
    }, 600);


  }
  return (
    <>
      <div className="flex flex-col px-0 md:px-12 lg:px-6 gap-10 mb-16 md:mb-18 lg:mb-32 ">
        {/*Top image */}
        <div
          className="flex flex-col justify-center items-center bg-light-primary-400 bg-cover bg-no-repeat bg-center w-full lg:h-[300px] md:h-[250px] h-[350px] 
                    rounded-none md:rounded-3xl"
          style={{ backgroundImage: `url(${image})` }}
        >
          <h1 className="text-40 px-4 lg:px-0 md:text-48 lg:text-64 text-center pb-2 font-bold font-playfair dark:text-dark-neutral-800 text-light-neutral-50">
            <i className="!hidden md:!block fa-solid fa-star absolute lg:left-[20%] xl:left-[25%] md:left-[15%] text-yellow-100 text-xl animate-pulse"></i>
            Get in Touch with Us
          </h1>
          <p className="w-[80%] md:w-[65%] text-center text-light-secondary-100 font-opensans text-16 dark:text-dark-neutral-600">
            We’re here to help with any questions, concerns, or feedback you may
            have. Reach out to our team, and we’ll be happy to
            <i className="!hidden md:!block fa-solid fa-star absolute bottom-18 right-[16%] text-lg animate-pulse text-yellow-100"></i>{" "}
            assist you with your skincare journey.
          </p>
        </div>
        {/*Contact form */}
        <div className="flex flex-col lg:flex-row lg:justify-between px-4 lg:px-0 gap-10 lg:gap-0 ">
          {/*left side */}
          <div
            className="w-[100%] lg:w-[70%] lg:rounded-3xl lg:border-[3px] lg:border-gray-100
            dark:lg:border-2 dark:lg:border-dark-neutral-400 p-0 lg:p-10"
          >
            <h1
              className="text-[34px] md:text-48 lg:text-[50px]  font-bold font-playfair
             dark:text-dark-secondary-300 text-light-secondary-900"
            >
              We are here for you
            </h1>
            <p
              className="text-16 font-opensans text-light-secondary-600 
           dark:text-dark-secondary-500 "
            >
              We will answer your message as soon as possible!
            </p>
            <div>
              <form onSubmit={handleSubmit(submit)} className="ml-2 mt-10">
                <div className="w-[100%] flex flex-col md:flex-row justify-between">
                    {/*first name */}
                  <div className="w-[100%] md:w-[45%]"> 
                      <label
                    className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                dark:text-dark-secondary-300"
                  >
                    First name
                  </label>
                  <div className="relative ">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                      <i className="fa-solid fa-user"></i>{" "}
                    </span>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Name contains characters only",
                        },
                      })}
                      type="text"
                      placeholder="Enter your first name"
                      className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                    placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                    lg:text-16 text-14
                    lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                    border-light-neutral-100 dark:border-dark-neutral-400 border-2
                    focus:outline-none dark:focus:border-dark-neutral-800
                    focus:ring-2 focus:ring-light-secondary-600
                    focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50
                    "
                    />
                  </div>
                  <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                    {errors.firstName?.message || ""}
                  </p>
                  </div>
                  {/*last name */}
                  <div className="w-[100%] md:w-[45%]"> 
                      <label
                    className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                dark:text-dark-secondary-300"
                  >
                    Last name
                  </label>
                  <div className="relative ">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Name contains characters only",
                        },
                      })}
                      type="text"
                      placeholder="Enter your last name "
                      className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                    placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                    lg:text-16 text-14
                    lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                    border-light-neutral-100 dark:border-dark-neutral-400 border-2
                    focus:outline-none dark:focus:border-dark-neutral-800
                    focus:ring-2 focus:ring-light-secondary-600
                    focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                    />
                  </div>
                  <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                    {errors.lastName?.message || ""}
                  </p>
                  </div>
                </div>
                <div className="w-[100%] flex flex-col md:flex-row justify-between">
                  <div className="w-[100%] md:w-[45%]">
                     {/*Email */}
                    <label
                      className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                  dark:text-dark-secondary-300"
                    >
                      Email
                    </label>
                    <div className="relative ">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        type="text"
                        placeholder="Enter your email"
                        className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                    placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                    lg:text-16 text-14
                    lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                    border-light-neutral-100 dark:border-dark-neutral-400 border-2
                    focus:outline-none dark:focus:border-dark-neutral-800
                    focus:ring-2 focus:ring-light-secondary-600
                    focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                      />
                    </div>
                    <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                      {errors.email?.message || ""}
                    </p>
                  </div>
                  <div className="w-[100%] md:w-[45%]">
                      {/*subject */}
                    <label
                      className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                  dark:text-dark-secondary-300"
                    >
                      Subject
                    </label>
                    <div className="">
                      <input
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                        type="text"
                        placeholder="What is about?" 
                        className="w-full bg-transparent rounded-full pt-2 pb-2 pl-5
                      placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                      lg:text-16 text-14
                      lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                      border-light-neutral-100 dark:border-dark-neutral-400 border-2
                      focus:outline-none dark:focus:border-dark-neutral-800
                      focus:ring-2 focus:ring-light-secondary-600
                      focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                      />
                    </div>
                    <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                      {errors.subject?.message || ""}
                    </p>
                  </div>
                </div>
                {/*message */}
                <label
                  className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
               dark:text-dark-secondary-300"
                >
                  Message
                </label>
                <div className=" w-[100%]">
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    
                    placeholder="Your text" 
                    className="w-full bg-transparent rounded-3xl pt-2 pb-2 pl-5
                    h-[150px] resize-none
                  placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                  lg:text-16 text-14
                  lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                  border-light-neutral-100 dark:border-dark-neutral-400 border-2
                  focus:outline-none dark:focus:border-dark-neutral-800
                  focus:ring-2 focus:ring-light-secondary-600
                  focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                  />
                </div>
                <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                  {errors.message?.message || ""}
                </p>
                <div className="w-[100%] flex justify-end">
                      {!loadding ? (
                  <button
                    type="submit"
                    className="justify-center items-center rounded-full border-light-secondary-50 mt-2
                dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                 dark:hover:border-dark-secondary-700
              bg-light-secondary-400 border-[2px] h-[50px] w-[100%] md:w-[20%]  hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
              dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
              disabled:bg-light-neutral-600"
                    disabled={!isValid || !isDirty}
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex justify-center items-center rounded-full border-light-secondary-50 mt-2
                dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                 dark:hover:border-dark-secondary-700
              bg-light-secondary-400 border-[2px] h-[50px] w-[100%] md:w-[20%] lg:mb-0 mb-3 hover:bg-light-secondary-200
               hover:dark:bg-dark-secondary-700
                text-light-primary-400 font-playfair text-20 font-bold  dark:disabled:bg-light-neutral-600
              dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
              disabled:bg-light-neutral-600"
                    disabled={!isValid || !isDirty}
                  >
                    Submit <Spinner className="ml-2 mt-2" />
                  </button>
                )}
                </div>
              </form>
            </div>
          </div>
          {/*right side */}
          <div className="w-[100%] lg:w-[25%] flex flex-col gap-3 ">
            <div className="p-5 flex flex-col gap-3 rounded-3xl border-[3px]  border-gray-100  dark:border-2 dark:border-dark-neutral-400 ">
              <div className="flex gap-2 items-center">
                <div
                  className="bg-light-secondary-200 dark:bg-dark-neutral-600 rounded-xl  
                lg:w-[45px] lg:h-[45px] w-[40px] h-[40px] flex items-center justify-center mr-2"
                >
                  <i className="fa-solid fa-phone-volume text-light-primary-400 dark:text-dark-primary-500 text-20"></i>
                </div>
                <p className="text-20  font-playfair font-bold text-light-secondary-900 dark:text-dark-secondary-300">
                  Phone Call
                </p>
              </div>
              <p className="text-light-secondary-600 dark:text-dark-secondary-500 text-14 ">
                Have a question or need assistance? Give us a call at +1 (800)
                123-4567. Our dedicated support team is available 24/7 to answer
                any inquiries you may have about our products, your order, or
                general concerns. We’re here to help you, any time of day.
              </p>
            </div>
            <div className="p-5 flex flex-col gap-3 rounded-3xl border-[3px]  border-gray-100  dark:border-2 dark:border-dark-neutral-400 ">
              <div className="flex gap-2 items-center">
                <div
                  className="bg-light-secondary-200 dark:bg-dark-neutral-600 rounded-xl  
                lg:w-[45px] lg:h-[45px] w-[40px] h-[40px] flex items-center justify-center mr-2"
                >
                  <i className="fa-regular fa-envelope text-light-primary-400 dark:text-dark-primary-500 text-20"></i>
                </div>
                <p className="text-20  font-playfair font-bold text-light-secondary-900 dark:text-dark-secondary-300">
                  Email Us
                </p>
              </div>
              <p className="text-light-secondary-600 dark:text-dark-secondary-500 text-14 ">
                For more detailed inquiries, email us at
                <a
                  href="mailto:support@femmeflair.com"
                  className="cursor-pointer text-light-secondary-800 font-bold dark:text-dark-secondary-300"
                >
                  {" "}
                  support@femmeflair.com
                </a>
                . Whether you need product advice, help with an order, or more
                information about our services, we’ll get back to you to ensure
                you have all the support you need.
              </p>
            </div>
            <div className="p-5 flex flex-col gap-3 rounded-3xl border-[3px]  border-gray-100  dark:border-2 dark:border-dark-neutral-400 ">
              <div className="flex gap-2 items-center">
                <div
                  className="bg-light-secondary-200 dark:bg-dark-neutral-600 rounded-xl  
                lg:w-[45px] lg:h-[45px] w-[40px] h-[40px] flex items-center justify-center mr-2"
                >
                  <i className="fa-solid fa-location-dot text-light-primary-400 dark:text-dark-primary-500 text-20"></i>
                </div>
                <p className="text-20  font-playfair font-bold text-light-secondary-900 dark:text-dark-secondary-300">
                  Visit Our Office
                </p>
              </div>
              <p className="text-light-secondary-600 dark:text-dark-secondary-500 text-14 ">
                We’d love to meet you in person! Visit us at
                <p className="inline text-light-secondary-800 font-bold dark:text-dark-secondary-300">
                  {" "}
                  123 Beauty Lane, Suite 100, New York City, USA
                </p>
                . Our office is open Monday through Friday, 9 AM to 5 PM, where
                you can speak directly with our team, receive product
                consultations, or learn more about our brand.
              </p>
            </div>
          </div>
        </div>
          {message &&
          <div className="toast">
            <div className="alert alert-info bg-light-secondary-700 text-light-secondary-50 font-bold p-5">
              <span>Message sent successfully!</span>
            </div>
          </div>}
      </div>
    </>
  );
}
