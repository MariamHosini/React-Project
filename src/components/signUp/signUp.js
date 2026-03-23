import React from 'react'
import supabase from '../../supabaseClient'
import signUpImage from '../../assets/signUp.webp'
import logo from '../../assets/logo.webp'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {startSpinner , stopSpinner} from '../../store/spinnerSlice'
import {useDispatch , useSelector} from 'react-redux'
import Spinner from '../spinner/spinner'
export default function SignUp() {
  const loadding = useSelector(store=> store.spinner.mode);
  const{register , handleSubmit ,watch, reset,formState:{errors, isValid , isDirty  }} = useForm({mode:"onChange"} );
  const password = watch("password","");
  const [errorMessage , setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  // Signing function
async function signUp(formData) {
  const { email, password, name } = formData;
  setErrorMessage(""); 
  try {
    dispatch(startSpinner());
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      switch (error.message) {
        case "User already registered":
          setErrorMessage("This email is already registered.");
          reset();
          break;
        default:
          setErrorMessage(error.message);
      }
      return; 
    }

    if (data?.user) {
      setErrorMessage("Success! Please check your email to verify your account before logging in");
      await supabase.from("users").insert([{
        id:data.user.id,
        name:name,
        email:email}]);
      reset();
    }
  } catch (err) {
    setErrorMessage("Network error. Your account might have been created, please check your email or try logging in.");
  }
  finally{
    dispatch(stopSpinner());
  }
}
  return (
    <>
      <contailer className='flex justify-center  items-center min-h-screen lg:pt-4 lg:pb-4 pb-6'>
        <div className='flex w-[90%] lg:w-[45%] h-[83%] flex-col justify-between'>
          {/*Logo */}
          <div className='flex justify-center lg:justify-start w-[100%] lg:mt-0 mt-5 '>
            <Link to={'/'} className='w-[50%] md:w-[30%] lg:w-[25%] h-auto'><img src={logo} alt=''></img></Link>
          </div>
          {/*Form */}
          <div>
            <h1 className='mt-2 font-bold text-32 lg:text-40 md:text-40 font-playfair text-light-secondary-900 dark:text-dark-secondary-300 text-center lg:text-start md:text-start'>Start your journey</h1>
              {errorMessage === "This email is already registered."?
              <p className=' text-[#B83280] text-14 md:text-16 lg:text-16 font-opensans  mt-2 text-center md:text-start lg:text-start  h-[10px]'>{errorMessage}
                Try<Link to={"/login"} className='underline-offset-8 underline'> logging in</Link></p>
              :
              <p className=' text-[#B83280] text-14 md:text-16 lg:text-16 font-opensans mt-2 text-center md:text-start lg:text-start   h-[10px]'>{errorMessage}</p>}
            <form onSubmit={handleSubmit(signUp)} className='ml-2 mt-10'>
              {/*Name */}
              <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Name</label>
             <div className="relative w-[90%] md:w-[70%] lg:w-[65%]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500"><i className="fa-solid fa-user"></i> </span>
              <input
                {...register("name", {
                  required: "Name is required",
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Name contains characters only",
                  },
                })}
                type="text"
                placeholder="Enter your name"
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
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2'>{errors.name?.message || ""}</p>
               {/*Email */}
              <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Email</label>
             <div className="relative w-[90%] md:w-[70%] lg:w-[65%]">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                <i className="fa-regular fa-envelope"></i>
              </span>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2'>{errors.email?.message || ""}</p>
              {/*Password */}
              <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Password</label>
              <div className="relative w-[90%] md:w-[70%] lg:w-[65%]">
                  <input
                    {...register("password", {
                      deps:["confirmPassword"],
                      required: "Password is required",
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                        message:
                          "Min 8 chars, include upper, lower, number & special character",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent rounded-full pt-2 pb-2 pl-5 pr-12
                    lg:text-16 text-14
                    placeholder:text-light-secondary-600 lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                    border-light-neutral-100 dark:border-dark-neutral-400 border-2
                    focus:outline-none focus:ring-2 focus:ring-light-secondary-600
                    dark:focus:border-dark-neutral-800 focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-light-secondary-600 dark:text-dark-secondary-500"
                  >
                    <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>

              </div>
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2'>{errors.password?.message || ""}</p>
               {/*Confirm password */}
              <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Confirm password</label>
              <div className="relative w-[90%] md:w-[70%] lg:w-[65%]">
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value)=>value === password || "Passwords do not match",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent rounded-full pt-2 pb-2 pl-5 pr-12
                    lg:text-16 text-14
                    placeholder:text-light-secondary-600 lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                    border-light-neutral-100 dark:border-dark-neutral-400 border-2
                    focus:outline-none focus:ring-2 focus:ring-light-secondary-600
                    dark:focus:border-dark-neutral-800 focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                  />
                  <span
                    onClick={() => setConfirmPassword(!showConfirmPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-light-secondary-600 dark:text-dark-secondary-500"
                  >
                    <i className={`fa-regular ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
              </div>
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2'>{errors.confirmPassword?.message || ""}</p>
              
                <button type='submit' className='justify-center items-center rounded-full border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
             bg-light-secondary-400 border-[2px] h-[50px] w-[90%] md:w-[70%] lg:w-[65%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
             dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
             disabled:bg-light-neutral-600' disabled={!isValid || !isDirty ||loadding}>Sign up
             {loadding && <Spinner className="ml-2 mt-2"/>}
             </button>:

            </form>
            <div className='w-[90%] md:w-[70%] lg:w-[65%]  flex  justify-center mt-3 mb-1'>
              <p className=' dark:text-dark-secondary-500 text-light-secondary-600 text-12 lg:text-14 font-opensans'>Do have an account?<Link to={'/login'} className='ml-2 login_btn text-light-primary-400 dark:text-dark-primary-500 text-14 lg:text-16 font-playfair font-bold'>Login</Link></p>
            </div>
          </div>
        </div>
        {/*Image */}
        <div className=' static hidden lg:flex lg:justify-center lg:items-end lg:w-[45%]  h-[700px] rounded-3xl bg-cover bg-no-repeat'style={{backgroundImage:`url(${signUpImage})`}}>
            
        </div>
      </contailer>
    </>
  )
}




