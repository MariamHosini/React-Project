import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { setLogout } from "../../store/authSlice";
import { useState } from "react";
export default function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => store.auth.isAuthenticated);
  const theme = useSelector((state) => state.theme.mode);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeDropdown = () => {
        setIsOpen(false);
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };
  function ChangeTheme() {
    dispatch(toggleTheme());
  }
  return (
    <>
      <div className=" transition-colors duration-500 ease-in-out sticky lg:relative top-0 bg-light-neutral-50 dark:bg-dark-neutral-800 z-[2000]  flex items-center lg:p-2 w-full max-w-full mb-3">
        {/* Mobile menu */}
        <div className={`mt-5 flex-[7%] col-span-1 order-3 lg:hidden relative  `}  >
          <div className={`relative dropdown-end  `}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden relative z-[110]"
              onClick={() => toggleMenu()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isOpen ? (

          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        ) : (
        
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        )}
      </svg>
            </div>
            <ul className={` absolute  menu menu-sm dropdown-content mt-7 bg-light-neutral-50 dark:bg-dark-neutral-800 
               w-screen p-5 shadow mobile-menu
                ${isOpen 
                  ? '  translate-y-0  opacity-100 -z-[-1]  duration-500' 
                  : '  -translate-y-full opacity-0 pointer-events-none -z-[-1] duration-500 '
                }`}
                >
                <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 md:text-20 mb-1 ">
                  <NavLink to="/" onClick={() => closeDropdown()}>
                    Home
                  </NavLink>
                </li>

                <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 md:text-20 mb-1">
                  <NavLink to="/products" onClick={() => closeDropdown()}>
                    Products
                  </NavLink>
                </li>

                <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 md:text-20 mb-1">
                  <NavLink to="/our-brand" onClick={() => closeDropdown()}>
                    Our story
                  </NavLink>
                </li>

                <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 md:text-20 mb-1">
                  <NavLink to="/contact-us" onClick={() => closeDropdown()}>
                    Contact us
                  </NavLink>
                </li>

                <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 md:text-20 mb-1 ">
                  <NavLink to="/blog" onClick={() => closeDropdown()}>
                    Blog
                  </NavLink>
                </li>

                {!isAuth ? (
                  <Link to="login" onClick={() => closeDropdown()}>
                    <button
                      className="mt-2 login_btn mb-1 justify-center items-center rounded-full border-light-secondary-50

                 bg-light-secondary-400 dark:bg-dark-secondary-800 dark:text-dark-primary-500 dark:border-dark-secondary-800

                border-[2px] h-[50px] w-[100px] hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700

                  text-light-primary-400  font-bold font-playfair text-16"
                    >
                      Login
                    </button>
                  </Link>
                ) : (
                  <>
                    <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 mb-1 ">
                      <NavLink
                        to={`/profile/${user.id}`}
                        onClick={() => closeDropdown()}
                      >
                        <span className="text-light-primary-600 font-bold text-16 rounded-full bg-light-secondary-100 dark:bg-pink-200  w-8 h-8 flex justify-center items-center">
                          {user.userName?.charAt(0).toUpperCase()}
                        </span>

                        <span className="text-light-primary-600 dark:text-dark-secondary-300 font-bold">
                          {user.userName}
                        </span>
                      </NavLink>
                    </li>

                    <button
                      onClick={() => {
                        dispatch(setLogout());

                        closeDropdown();
                      }}
                      className="mb-1 rounded-xl text-rose-500 hover:bg-rose-50

                       dark:hover:bg-rose-900/20 "
                    >
                      <Link to={"/"}>
                        <span className="font-bold text-16">
                          Logout{" "}
                          <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        </span>
                      </Link>
                    </button>
                  </>
                )}
            </ul>
          </div>
        </div>
        {/* Desktop menu */}
        <div className="order-1 hidden lg:flex lg:flex-[47%] lg:justify-start  ">
          <ul className="menu menu-horizontal px-1 desktop-menu">
            <li className="text-light-secondary-600 dark:text-dark-secondary-500  font-opensans text-16 ">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16">
              <NavLink to="/products">Products</NavLink>
            </li>
            <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16">
              <NavLink to="/our-brand">Our story</NavLink>
            </li>
            <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16">
              <NavLink to="/contact-us">Contact us</NavLink>
            </li>
            <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 ">
              <NavLink to="/blog">Blog</NavLink>
            </li>
          </ul>
        </div>
        {/* Logo */}
        <div className=" flex-[53%] order-1  lg:justify-center lg:order-2 lg:flex-[28%]  ml-2 lg:ml-10 pt-3 md:ml-10">
          <Link to="/" className=" lg:navbar-center normal-case text-xl">
            <img src={logo} alt="logo" className="  w-auto h-28" />
          </Link>
        </div>
        {/* Cart and login */}
        <div className="mt-5 flex-[35%] flex items-center  md:pr-0 lg:pr-4 lg:gap-4 order-2 lg:order-3 lg:flex-[25%] lg:justify-end justify-evenly">
          <div
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-xl border-light-secondary-50 border-[2px]
            flex items-center justify-center cursor-pointer dark:border-dark-neutral-700
            hover:bg-light-secondary-300 hover:text-light-priamary-600 dark:hover:bg-dark-secondary-800
            p-6 md:p-5 text-center  transition-colors duration-200
            "
          >
            <i className="fa-solid fa-cart-arrow-down text-light-primary-400 text-[24px] md:text-[24px] dark:text-dark-primary-500 "></i>
          </div>
          {!isAuth ? (
            <Link to="login">
              <button
                className=" login_btn hidden
             lg:flex justify-center items-center rounded-full border-light-secondary-50
               dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
               dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] h-[60px] w-[120px]
                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold"
              >
                Login
              </button>
            </Link>
          ) : (
            <div className="hidden lg:flex md:flex w-14 h-14 rounded-full bg-pink-200 items-center justify-center shadow-soft backdrop-blur-md dropdown dropdown-bottom">
              <div
                className="text-light-primary-600 font-bold text-24"
                tabIndex={0}
                role="button"
              >
                {user.userName?.charAt(0).toUpperCase()}
              </div>
              <ul
                tabIndex="1"
                className=" mt-4 dropdown-content menu p-2  bg-light-neutral-50
                dark:bg-dark-neutral-800 backdrop-blur-md border border-light-secondary-700 dark:border-white/10
                 rounded-2xl relative z-50 w-32 animate-in fade-in zoom-in duration-200"
              >
                <li className="mb-1">
                  <button
                    className="!flex items-center gap-3 !px-4 !py-3 !rounded-xl text-slate-700 dark:text-pink-100
                      hover:!bg-pink-500/20 active:!bg-pink-500/30 transition-colors duration-200"
                    onClick={() => closeDropdown()}
                  >
                    <Link to={`profile/${user.id}`}>
                      {" "}
                      <span className="font-semibold text-sm">Profile</span>
                    </Link>{" "}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      dispatch(setLogout());
                      closeDropdown();
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50
                       dark:hover:bg-rose-900/20 "
                  >
                    <Link to={"/"}>
                      <span className="font-bold text-sm">
                        Logout{" "}
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      </span>
                    </Link>
                  </button>
                </li>
              </ul>
            </div>
          )}
          <button
          onClick={() => ChangeTheme()}
          className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full transition-all duration-500 active:scale-90"
        >
          <i className={`fa-solid fa-sun absolute text-[20px] transition-all duration-500 transform 
            ${theme === "light" ? "translate-y-0 opacity-100 rotate-0" : "translate-y-10 opacity-0 rotate-90"} 
            text-light-primary-400 dark:text-dark-primary-500`}></i>

          <i className={`fa-solid fa-moon absolute text-[20px] transition-all duration-500 transform 
            ${theme === "dark" ? "translate-y-0 opacity-100 rotate-0" : "-translate-y-10 opacity-0 -rotate-90"} 
            text-light-primary-400 dark:text-dark-primary-500`}></i>
        </button>
        </div>
      </div>
    </>
  );
}
