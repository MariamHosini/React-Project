import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { startSpinner, stopSpinner } from "../../store/spinnerSlice";
import { updateUser } from "../../store/authSlice";
import supabase from "../../supabaseClient";
import Spinner from "../spinner/spinner";
export default function Profile() {
  const dispatch = useDispatch();
  const [loadingOrder, setLoadingOrder] = useState(false);
  const loading = useSelector((store) => store.spinner.mode);
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const [orders, setOrders] = useState([]);
  const numberOfOrders = useSelector((state) => state.auth.number_of_orders);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadPass, setLoadPass] = useState(false);
  const [loadProfile, setLoadProfile] = useState(false);
  const [loadPicture, setLoadPicture] = useState(false);
  const [toastMessageBody, setToatMessageBody] = useState("");
  const [message, setMessage] = useState(false);
  const numberOfWishlistitems = useSelector(
    (state) => state.auth.number_of_items_in_wishlist,
  );
  useEffect(() => {
    setLoadingOrder(true);
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(true);
        setToatMessageBody("Network error");
        setLoadingOrder(false);
      } else {
        setLoadingOrder(false);
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);
  //profile  form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: {
      isValid: isValidProfile,
      isDirty: isDirtyProfile,
      errors: errorsProfile,
    },
  } = useForm({ mode: "onChange" });
  //password form
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    watch: watchPass,
    reset: resetPass,
    formState: {
      isValid: isValidPass,
      isDirty: isDirtyPass,
      errors: errorsPass,
    },
  } = useForm({ mode: "onChange" });
  const {
    register: registerPicture,
    handleSubmit: handleSubmitPicture,
    reset: resetPicture,
    formState: {
      isValid: isValidPicture,
      isDirty: isDirtyPicture,
    },
  } = useForm();
  const password = watchPass("password", "");
  const formatMyDate = (dateString) => {
    if (!dateString) return "No date provided";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  async function edit_profile_data(user_data) {
    dispatch(startSpinner());
    setLoadProfile(true);
    const { data, error } = await supabase
      .from("users")
      .update({ name: user_data.name })
      .eq("id", user.id)
      .select()
      .single();
    setMessage(true);
    if (error) {
      setToatMessageBody(error);
      setTimeout(() => {
        setMessage(false);
        setToatMessageBody("");
      }, 3000);
      dispatch(stopSpinner());
      setLoadProfile(false);
    } else {
      setToatMessageBody("Your name updated sucessfully🤍");
      setTimeout(() => {
        setMessage(false);
        setToatMessageBody("");
      }, 3000);
      setLoadProfile(false);
      dispatch(stopSpinner());
      setIsEditing(false);
      dispatch(updateUser(data));
      resetProfile();
    }
  }
  async function updatePassword(user_pass) {
    dispatch(startSpinner());
    setLoadPass(true);
    const { error } = await supabase.auth.updateUser({
      password: user_pass.password,
    });
    setMessage(true);
    if (error) {
      setToatMessageBody(error);
      setTimeout(() => {
        setMessage(false);
        setToatMessageBody("");
      }, 3000);
      dispatch(stopSpinner());
      setLoadPass(false);
    } else {
      setToatMessageBody("Your password updated sucessfully🤍");
      setTimeout(() => {
        setMessage(false);
        setToatMessageBody("");
      }, 3000);
      setLoadPass(false);
      dispatch(stopSpinner());
      setIsEditing(false);
      resetPass();
      document.getElementById("my_modal_4").close();
    }
  }
async function change_profile_picture(data) {
  const file = data.picture[0]; 
  if (!file) return;

  try {
    dispatch(startSpinner());
    setLoadPicture(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `users-profiles/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from('users-profiles') 
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('users-profiles') 
      .getPublicUrl(filePath);

    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({ imageURL: publicUrl })
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) throw updateError;

    dispatch(updateUser(updatedUser));
    setToatMessageBody("Profile picture updated! ✨");
    setMessage(true);
    document.getElementById("my_modal_5").close();
    resetPicture();

  } catch (error) {
    setToatMessageBody(error.message || "Failed to upload");
    setMessage(true);
  } finally {
    setLoadPicture(false);
    dispatch(stopSpinner());
    setTimeout(() => setMessage(false), 3000);
  }
}
async function removePhoto() {
  try {
    dispatch(startSpinner());
    setLoadPicture(true);

    const { data, error } = await supabase
      .from("users")
      .update({ imageURL: null }) 
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;

    dispatch(updateUser(data));
    setToatMessageBody("Photo removed successfully");
    setMessage(true);
    document.getElementById("my_modal_5").close();
  } catch (error) {
    setToatMessageBody("Error removing photo");
    setMessage(true);
  } finally {
    setLoadPicture(false);
    dispatch(stopSpinner());
    setTimeout(() => setMessage(false), 3000);
  }
}
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn flex flex-col ">
      {message && (
        <div className="z-10 toast toast-end w-[40%] text-center">
          <div className=" alert alert-info text-center flex items-center justify-center text-[18px] bg-light-secondary-700 text-light-secondary-50 font-bold p-5">
            <span>{toastMessageBody}</span>
          </div>
        </div>
      )}
      {/**profile dialog */}
      <dialog id="my_modal_5" className="modal w-[100%]">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center  bg-light-neutral-50 dark:bg-dark-neutral-800">
          <h1 className="mb-7 text-light-secondary-600 dark:text-dark-secondary-500 text-28 font-bold text-center">
            Edit your picture
          </h1>

          <form
            className="mt-8  flex flex-col gap-7"
           onSubmit={handleSubmitPicture(change_profile_picture)} 
          >
            <fieldset className="fieldset">
              <input
                {...registerPicture("picture", {
                  required: "Picture is required",
                })}
                type="file"
                className="file-input w-[100%] bg-light-secondary-400 dark:bg-dark-secondary-500
                text-light-secondary-800"
              />
              <div className="flex justify-start mt-4">
                <button
                type="button"
                  onClick={() => {removePhoto()}}
                  className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors text-sm font-medium px-2 py-1"
                >
                  <i className="fa-regular fa-trash-can"></i>
                  Remove photo
                </button>
              </div>
            </fieldset>
            <div className="flex gap-2 mt-3">
              {loading && loadPicture ? (
                <button
                  type="submit"
                  className=" py-2 w-full rounded-xl border-light-secondary-50 flex items-center justify-center  
                                dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                text-light-primary-400 font-playfair text-16 md:text-16 lg:text-20 font-bold
                                disabled:opaity-50 disabled:hover:dark:bg-dark-secondary-800 disabled:hover:bg-light-secondary-400
                                disabled:hover:dark:border-dark-secondary-800"
                  disabled={!isValidPicture || !isDirtyPicture}
                >
                  Save picture <Spinner className="mt-1 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  className=" py-2 w-full rounded-xl border-light-secondary-50 flex items-center justify-center  
                                dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                text-light-primary-400 font-playfair text-16 md:text-16 lg:text-20 font-bold
                                disabled:opaity-50 disabled:hover:dark:bg-dark-secondary-800 disabled:hover:bg-light-secondary-400
                                disabled:hover:dark:border-dark-secondary-800"
                  disabled={!isValidPicture || !isDirtyPicture}
                >
                  Save picture
                </button>
              )}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  document.getElementById("my_modal_5").close();
                  resetPicture();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
      {/* 1. Header Section (Cover + Photo) */}
      <div className="relative mb-16 md:mb-24 flex flex-col gap-6">
        {/* Profile Info Overlay */}
        <div className="w-full flex items-center gap-6">
          <div className="relative w-28 h-28 md:w-32 md:h-32  dark:bg-dark-neutral-800 p-2 rounded-full shadow-xl ">
            <div
              className="w-full h-full bg-pink-200  rounded-full flex items-center justify-center
             text-light-primary-600 text-5xl font-serif font-bold overflow-hidden"
            >
              {user?.imageURL ? (
                <img 
                  src={user.imageURL} 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <span className="text-light-primary-600 text-5xl font-serif font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                document.getElementById("my_modal_5").showModal();
              }}
              className="absolute bottom-1 right-1 btn btn-circle bg-light-primary-400 btn-sm border-2 border-white
                 dark:border-dark-neutral-800 shadow-lg hover:scale-105 transition-transform duration-200 hover:bg-light-primary-400
                 hover:border-none"
            >
              <i className="fa-solid fa-camera text-light-secondary-300"></i>
            </button>
          </div>
          <div className="w-[40%]">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-light-secondary-900 dark:text-white leading-none">
              {user?.name || "Beauty Enthusiast"}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar: Account Info */}
        <div className="lg:col-span-1 space-y-6 ">
          <div className=" bg-white dark:bg-dark-neutral-800 p-3 md:p-5 rounded-3xl shadow-sm border border-neutral-100 dark:border-white/5">
            <h3 className="text-lg font-bold mb-6 border-b pb-2 text-light-secondary-800 dark:text-dark-secondary-700">
              Account Details
            </h3>
            {isEditing ? (
              <>
                <form onSubmit={handleSubmitProfile(edit_profile_data)}>
                  <label className="text-sm dark:text-dark-secondary-500 font-bold text-light-primary-700">
                    EMAIL ADDRESS
                  </label>
                  <p className="text-light-neutral-500 dark:text-light-neutral-300 mb-2 font-bold">
                    {user?.email}
                  </p>
                  <label className="ml-2 block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 mt-8 mb-3 dark:text-dark-secondary-300">
                    Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                      <i className="fa-solid fa-user"></i>{" "}
                    </span>
                    <input
                      {...registerProfile("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[a-zA-Z\s]*$/,
                          message: "Name contains characters only",
                        },
                        minLength: {
                          value: 8,
                          message: "Name at least 8 characters",
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
                  <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                    {errorsProfile.name?.message || ""}
                  </p>
                  <button
                    className="mt-2 py-1 w-full rounded-xl border-light-secondary-400 hover:bg-light-secondary-400
                 flex items-center justify-center  dark:hover:bg-dark-secondary-700 text-light-primary-400
                dark:text-dark-primary-500  dark:border-dark-secondary-700  border-[2px]
                   font-playfair  font-bold"
                    type="button"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Update Password?
                  </button>

                  <div className="flex gap-2 mt-5">
                    {loading && loadProfile ? (
                      <button
                        type="submit"
                        className=" py-2 w-full rounded-xl border-light-secondary-50 flex items-center justify-center  
                                dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                text-light-primary-400 font-playfair text-16 md:text-16 lg:text-20 font-bold
                                disabled:opaity-50 disabled:hover:dark:bg-dark-secondary-800 disabled:hover:bg-light-secondary-400
                                disabled:hover:dark:border-dark-secondary-800"
                        disabled={!isValidProfile || !isDirtyProfile}
                      >
                        Save Changes <Spinner className="mt-1 ml-1" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className=" py-2 w-full rounded-xl border-light-secondary-50 flex items-center justify-center  
                                dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                text-light-primary-400 font-playfair text-16 md:text-16 lg:text-20 font-bold
                                disabled:opaity-50 disabled:hover:dark:bg-dark-secondary-800 disabled:hover:bg-light-secondary-400
                                disabled:hover:dark:border-dark-secondary-800"
                        disabled={!isValidProfile || !isDirtyProfile}
                      >
                        Save Changes
                      </button>
                    )}
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        setIsEditing(false);
                        resetProfile();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
                {/*Password Editing */}
                <dialog id="my_modal_4" className="modal w-[100%]">
                  <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center  bg-light-neutral-50 dark:bg-dark-neutral-800">
                    <h1 className="mb-7 text-light-secondary-600 dark:text-dark-secondary-500 text-28 font-bold text-center">
                      Update Your Password
                    </h1>

                    <form
                      method="dialog"
                      onSubmit={handleSubmitPass(updatePassword)}
                      className=" flex flex-col items-center w-[100%] "
                    >
                      {/*Password */}
                      <div className="w-[90%] md:w-[60%] lg:w-[50%]">
                        <label
                          className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                         dark:text-dark-secondary-300"
                        >
                          Password
                        </label>
                        <div className="relative w[100%]">
                          <input
                            {...registerPass("password", {
                              deps: ["confirmPassword"],
                              required: "Password is required",
                              pattern: {
                                value:
                                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
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
                            <i
                              className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            ></i>
                          </span>
                        </div>
                        <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                          {errorsPass.password?.message || ""}
                        </p>
                      </div>
                      {/*Confirm password */}
                      <div className="w-[90%] md:w-[60%] lg:w-[50%]">
                        <label className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2 dark:text-dark-secondary-300">
                          Confirm password
                        </label>
                        <div className="relative w-[100%]">
                          <input
                            {...registerPass("confirmPassword", {
                              required: "Please confirm your password",
                              validate: (value) =>
                                value === password || "Passwords do not match",
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
                            onClick={() =>
                              setConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-light-secondary-600 dark:text-dark-secondary-500"
                          >
                            <i
                              className={`fa-regular ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                            ></i>
                          </span>
                        </div>
                        <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                          {errorsPass.confirmPassword?.message || ""}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-5 mb-5 w-[100%] md:w-[80%] items-center justify-center ">
                        {loading && loadPass ? (
                          <button
                            type="submit"
                            className="flex justify-center items-center rounded-full border-light-secondary-50 mt-2
                                        dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
                                      bg-light-secondary-400 border-[2px] h-[50px] w-[90%] md:w-[60%] lg:w-[50%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                        text-light-primary-400 font-playfair text-[18px] font-bold  dark:disabled:bg-light-neutral-600
                                      dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
                                      disabled:bg-light-neutral-600"
                            disabled={!isValidPass || !isDirtyPass}
                          >
                            Update Password <Spinner className="ml-2 mt-2" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="justify-center items-center rounded-full border-light-secondary-50 mt-2
                                     dark:text-dark-primary-500 dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                      dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] h-[50px]  
                                      w-[90%] md:w-[60%] lg:w-[50%]
                                        lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                    text-light-primary-400 font-playfair text-20 font-bold dark:disabled:bg-light-neutral-600
                                   dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
                                   disabled:bg-light-neutral-600"
                            disabled={!isValidPass || !isValidPass}
                          >
                            Update Password
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-ghost"
                          onClick={() => {
                            document.getElementById("my_modal_4").close();
                            resetPass();
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </dialog>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm dark:text-dark-secondary-500 font-bold text-light-primary-700">
                    EMAIL ADDRESS
                  </label>
                  <p className="text-light-neutral-500 dark:text-light-neutral-300 mb-2 font-bold">
                    {user?.email}
                  </p>
                </div>
                <button
                  className="w-full py-2 mt-10 rounded-2xl border-light-secondary-50
                                    dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                    dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                    text-light-primary-400 font-playfair text-20 md:text-16 lg:text-20 font-bold"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Content: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-2  gap-4">
            {[
              { label: "My Orders", value: numberOfOrders, icon: "📦" },
              { label: "Wishlist", value: numberOfWishlistitems, icon: "💖" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-dark-neutral-800 p-6 rounded-3xl text-center border border-neutral-50 dark:border-white/5 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <span className="text-2xl font-bold block dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-400 uppercase tracking-tighter">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Recent Activity / Order History Placeholder */}
          <div className="border border-neutral-100 dark:border-white/5 rounded-2xl p-3 md:p-6">
            <h3 className="text-xl font-serif font-bold text-light-secondary-700 dark:text-dark-secondary-300 mb-6">
              Recent Orders
            </h3>
            {numberOfOrders === 0 ? (
              <div className="text-center py-10">
                <p className="dark:text-dark-secondary-700 text-light-secondary-500  text-20 italic">
                  You haven't placed any orders yet.
                </p>
              </div>
            ) : (
              <>
                {loadingOrder ? (
                  <p className="mt-4 text-center font-playfair text-lg text-light-secondary-800 dark:text-dark-secondary-300 animate-pulse">
                    Preparing your orders history...
                  </p>
                ) : (
                  <>
                    {orders.map((order, index) => (
                      <div
                        key={index}
                        className="collapse collapse-arrow   border-[3px] border-light-secondary-700  rounded-xl mb-4"
                      >
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title text-md font-medium flex flex-col pt-10 pr-2 pb-2 md:pb-0">
                          <div className="flex justify-between">
                            <div className="flex flex-col gap-4">
                              <span className=" text-light-secondary-800 dark:text-dark-secondary-700 font-bold">
                                Order #{index + 100}
                              </span>
                              <span className="text-light-secondary-600 dark:text-dark-secondary-300">
                                <span className="text-light-secondary-900 dark:text-dark-secondary-700 font-bold">
                                  Price:
                                </span>{" "}
                                {order.order_price} EGP
                              </span>
                            </div>
                            <div
                              className="text-md badge badge-outline border-dark-secondary-500
                          text-dark-secondary-500 uppercase tracking-tighter mt-1"
                            >
                              {order.status || "Processing"}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className=" text-light-secondary-600 dark:text-dark-secondary-300">
                              <span className="text-light-secondary-900 dark:text-dark-secondary-700 font-bold">
                                Address:
                              </span>{" "}
                              {order.shipping_address}
                            </span>
                            <span className=" text-light-secondary-600 dark:text-dark-secondary-300">
                              <span className="text-light-secondary-900 dark:text-dark-secondary-700 font-bold">
                                Phone number:{" "}
                              </span>
                              {order.phone_number}
                            </span>
                            <span className=" text-light-secondary-600 dark:text-dark-secondary-300">
                              <span className="text-light-secondary-900 dark:text-dark-secondary-700 font-bold">
                                Created at:{" "}
                              </span>
                              {formatMyDate(order.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="collapse-content p-1 md:p-5 ">
                          <div className=" ">
                            <h4 className="text-[12px] uppercase mb-2 text-light-neutral-500 tracking-widest font-bold">
                              Ordered Items
                            </h4>

                            {order.order_items.map((item, index) => {
                              return (
                                <div
                                  key={`${index}`}
                                  className="flex items-center gap-4 mb-5"
                                >
                                  <img
                                    src={item.api_featured_image}
                                    alt={item.product_name}
                                    className="w-20 h-20 rounded-lg object-cover"
                                  />
                                  <div>
                                    <p
                                      className="text-md font-medium text-light-secondary-700 dark:text-dark-secondary-300
                                first-letter:uppercase"
                                    >
                                      {item.brand} - {item.product_type}
                                    </p>
                                    <p className="text-sm text-light-secondary-500 dark:text-dark-secondary-400">
                                      {item.numberOfProduct} x{" "}
                                      {(item.price * 50).toFixed(0)} EGP
                                    </p>
                                    {item.selectedColor && (
                                      <div className="flex items-center gap-1 md:gap-2 mt-1">
                                        <div
                                          className="w-4 h-4 rounded-full"
                                          style={{
                                            backgroundColor:
                                              item.selectedColor.hex_value,
                                          }}
                                        ></div>
                                        <span className="text-sm text-light-secondary-500 dark:text-dark-secondary-400">
                                          {item.selectedColor.color}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
