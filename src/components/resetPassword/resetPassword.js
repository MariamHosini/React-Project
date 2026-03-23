import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { startSpinner, stopSpinner } from "../../store/spinnerSlice";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner";
import logo from '../../assets/logo.webp'
import { useDispatch } from "react-redux";
import supabase from "../../supabaseClient";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";
export default function ResetPassword() {
const navigate =useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setConfirmPassword] = useState(false);

  const loading = useSelector((store) => store.spinner.mode);
  const dispatch = useDispatch();
  const[errorMessage, setErrorMessage] = useState();
  const {
    register,
    handleSubmit,watch,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "onChange" });
      const password = watch("password","");
      // Update password
  async function handleUpdatePassword(data) {
    dispatch(startSpinner());
    const {password:newPassword} = data;
    try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
    alert("Password updated successfully! 💖");
    navigate('/login');      

  } catch (error) {
    setErrorMessage( error.message);
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
            <Link to={'/'} className='w-[50%] md:w-[30%] lg:w-[40%] h-auto'><img src={logo} alt=""></img></Link>
          </div>
            <div className="text-center">
              <h2 className="text-32 lg:text-40 md:text-40  font-bold text-light-secondary-800 dark:text-dark-secondary-300">
                Create New Password
              </h2>
              <p className="mt-2  dark:text-dark-secondary-500 text-light-secondary-600 text-14 md:text-16 lg:text-16 font-opensans ">
                Your new password must be different from previous used passwords to keep your account secure</p>
                <p className=' text-[#B83280] text-14 md:text-16 lg:text-16 font-opensans  mt-2 text-center   h-[10px]'>{errorMessage}</p>
            </div>

            <form
              onSubmit={handleSubmit(handleUpdatePassword)}
              className="mt-8 "
            >
               {/*Password */}
              <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Password</label>
              <div className="relative w-[100%] ">
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
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-3'>{errors.password?.message || ""}</p>
               {/*Confirm password */}
              <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Confirm password</label>
              <div className="relative w-[100%]">
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
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-3 mb-3'>{errors.confirmPassword?.message || ""}</p>
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
                  Update password
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
                  Update password <Spinner className="ml-1 mt-1" />
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

