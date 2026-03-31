import React from 'react'
import supabase from '../../supabaseClient'
import loginImage from '../../assets/login.webp'
import logo from '../../assets/logo.webp'
import {Link} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Spinner from '../spinner/spinner';
import { startSpinner , stopSpinner } from '../../store/spinnerSlice'
import { setLogin } from '../../store/authSlice'
import { useDispatch ,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const  dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(store=>store.spinner.mode);
  
   const[errorMessage, setErrorMessage] = useState();
  
  const{register , handleSubmit ,reset, formState:{errors, isValid , isDirty}} = useForm({mode:"onChange"} );
  // Login
  async function login(data) {
      const { email, password } = data;
      dispatch(startSpinner());
      try {
        const { data: userData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) {
          if (authError.message === "Invalid login credentials") {
            setErrorMessage("Incorrect email or password. Please try again.");
          } else if (authError.message === "Email not confirmed") {
            setErrorMessage("Please verify your email address first to login.");
          } else {
            setErrorMessage(authError.message);
          }
          return;
        }
        if (userData?.user) {
          const [profileResponse, wishlistResponse] = await Promise.all([
            supabase
                .from("users")
                .select("name")
                .eq('id', userData.user.id)
                .single(),
            supabase
                .from("wishlist")
                .select("product_Id") 
                .eq('userId', userData.user.id)
          ]);

          const { data: profileData } = profileResponse;
          const { data: wishlistData } = wishlistResponse;
          const nameToShow = profileData?.name || userData.user.email;
          const favoriteIds = wishlistData ? wishlistData.map(item => item.product_Id) : [];
          dispatch(setLogin({
            user:{ ...userData.user, userName: nameToShow },
            wishList:favoriteIds
          }));
          reset();
          navigate(-1);
        }
      } catch (err) {
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        dispatch(stopSpinner());
      }
    }
   const [showPassword, setShowPassword] = useState(false);

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
            <h1 className='mt-2 font-bold text-32 lg:text-40 md:text-40 font-playfair text-light-secondary-900 dark:text-dark-secondary-300 text-center lg:text-start md:text-start'>Welcome Back!</h1>
            <p className='text-light-secondary-600 text-14 md:text-16 lg:text-16 font-opensans w-[90%] md:w-[70%] lg:w-[70%] mt-4 dark:text-dark-secondary-500 text-center lg:text-start md:text-start'>Access your account to track orders, view your wishlist, and enjoy exclusive offers. Don't have an account yet? Sign up today for a seamless shopping experience!</p>
           <p className=' text-[#B83280] text-14 md:text-16 lg:text-16 font-opensans  mt-2 text-center md:text-start lg:text-start  h-[10px]'>{errorMessage}</p>
            <form onSubmit={handleSubmit(login)} className='ml-2 mt-6'>
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
                lg:text-16 text-14
                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                lg:placeholder:text-16 placeholder:font-opensans placeholder:text-14
                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                focus:outline-none dark:focus:border-dark-neutral-800
                focus:ring-2 focus:ring-light-secondary-600
                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
              />

            </div>
              <p className='min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2'>{errors.email?.message || ""}</p>
              {/*Password */}

              <div className='flex justify-between items-center w-[90%] md:w-[70%] lg:w-[62%]'>
                <label className='block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300'>Password</label>
                <Link to='/forget-password' className='text-light-secondary-600 block mb-2 lg:text-16 text-14 font-opensan font-bold'>Forget password?</Link>
              </div>

              <div className="relative w-[90%] md:w-[70%] lg:w-[65%]">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength:{
                        value:8,
                        message:"Password at least 8 characters"
                      }
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent rounded-full pt-2 pb-2 pl-5 pr-12
                    lg:text-16 text-14
                    placeholder:text-light-secondary-600 lg:placeholder:text-16 placeholder:font-opensans placeholder:text-14
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
              {/*Login Btn */}
              {!loading?
                 <button type='submit' className='justify-center items-center rounded-full border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
             bg-light-secondary-400 border-[2px] h-[50px] w-[90%] md:w-[70%] lg:w-[65%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
               dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
               disabled:bg-light-neutral-600' disabled={!isValid || !isDirty }>Login</button>
                :
                 <button type='submit' className='flex justify-center items-center rounded-full border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800
             bg-light-secondary-400 border-[2px] h-[50px] w-[90%] md:w-[70%] lg:w-[65%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold dark:disabled:bg-light-neutral-600 dark:hover:border-dark-secondary-700
               dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
               disabled:bg-light-neutral-600' disabled={!isValid || !isDirty}>Login <Spinner className="ml-1 mt-1"/></button>
              }
            </form>
            <div className='w-[90%] md:w-[70%] lg:w-[65%]  flex  justify-center mt-3 mb-1'>
              <p className=' dark:text-dark-secondary-500 text-light-secondary-600 text-12 lg:text-14 font-opensans'>Don't have an account yet?<Link to={'/sign-up'} className='ml-2 login_btn text-light-primary-400 dark:text-dark-primary-500 lg:text-16 text-14 font-playfair font-bold'>Sign up</Link></p>
            </div>
          </div>
        </div>
        {/*Image */}
        <div className=' static hidden lg:flex lg:justify-center lg:items-end lg:w-[45%]  h-[600px] rounded-3xl bg-cover bg-no-repeat'style={{backgroundImage:`url(${loginImage})`}}>
            <div className="relative w-[90%] bottom-10">
                <div className="absolute inset-0  bg-gradient-to-br  from-pink-200/40  to-purple-200/40 rounded-2xl translate-x-3 translate-y-3  z-0">
                </div>
                <div className="relative  bg-light-secondary-100  p-4 rounded-2xl z-10">
                  <p className="text-light-secondary-800  font-serif italic text-20 text-center">
                  "Beautiful looks start with the right touch—enhance your features, and let your confidence shine through"</p> 
                </div>
              </div>
        </div>
      </contailer>
    </>
  )
}




