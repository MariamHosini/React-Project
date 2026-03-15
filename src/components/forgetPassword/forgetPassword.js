import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { startSpinner, stopSpinner } from "../../store/spinnerSlice";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner";
import logo from '../../assets/logo.webp'
import { useDispatch } from "react-redux";
import supabase from "../../supabaseClient";
import { useState } from "react";
export default function ForgetPassword() {
  const loading = useSelector((store) => store.spinner.mode);
  const dispatch = useDispatch();
  const[errorMessage, setErrorMessage] = useState();
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "onChange" });
  async function sendEmail(data) {
    dispatch(startSpinner());
    const {email} = data;
     try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password'
    });
    if (error) {
      throw error;
    }

    setErrorMessage("Check your email for the reset link!");
    
  } catch (error) {
    
    setErrorMessage("Failed to send reset email:", error.message);
  } finally {
    dispatch(stopSpinner()); 
  }

  }
  return (
    <>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
        {/*Logo */}
          <div className='flex justify-center  w-[100%]  '>
            <Link to={'/'} className='w-[50%] md:w-[30%] lg:w-[40%] h-auto'><img src={logo}></img></Link>
          </div>
            <div className="text-center">
              <h2 className="text-32 lg:text-40 md:text-40  font-bold text-light-secondary-800 dark:text-dark-secondary-300">
                Reset Password
              </h2>
              <p className="mt-2  dark:text-dark-secondary-500 text-light-secondary-600 text-14 md:text-16 lg:text-16 font-opensans ">
                Enter the email address associated with your account, and we'll
                send you a link to reset your password
              </p>
                         <p className=' text-[#B83280] text-14 md:text-16 lg:text-16 font-opensans  mt-2 text-center  h-[10px]'>{errorMessage}</p>
            </div>

            <form
              onSubmit={handleSubmit(sendEmail)}
              className="mt-8 "
            >
              <div>
                <label className="dark:text-dark-secondary-300 block font-bold lg:text-16 text-14 font-opensans text-light-primary-800  ml-1">
                  Your Email
                </label>
                <div className="relative mt-2">
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
                lg:text-16 text-14
                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                lg:placeholder:text-16 placeholder:font-opensans placeholder:text-14
                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                focus:outline-none dark:focus:border-dark-neutral-800
                focus:ring-2 focus:ring-light-secondary-600
                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                  />
                </div>
                <p className="min-h-[25px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2 mb-2">
                  {errors.email?.message || ""}
                </p>
              </div>
              {!loading ? (
                <button
                  type="submit"
                  className="justify-center items-center rounded-full border-light-secondary-50 
                              dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
                            bg-light-secondary-400 border-[2px] h-[50px] w-[100%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
                              dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
                              disabled:bg-light-neutral-600"
                  disabled={!isValid || !isDirty}
                >
                  Reset password
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex justify-center items-center rounded-full border-light-secondary-50 w-[100%]
                              dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                            bg-light-secondary-400 border-[2px] h-[50px]  lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                              text-light-primary-400 font-playfair text-20 font-bold dark:disabled:bg-light-neutral-600 dark:hover:border-dark-secondary-700
                              dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
                              disabled:bg-light-neutral-600"
                  disabled={!isValid || !isDirty}
                >
                  Reset password <Spinner className="ml-1 mt-1" />
                </button>
              )}

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-14 font-bold lg:text-16 dark:text-dark-primary-500  flex items-center justify-center gap-2 text-light-primary-400
                  dark:hover:text-dark-secondary-700 hover:text-light-primary-300"
                >
                  <span className="text-lg">←</span> Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}

