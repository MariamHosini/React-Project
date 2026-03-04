
import { useDispatch ,useSelector} from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import {NavLink, Link} from "react-router-dom";
import logo from "../../assets/logo.png";
export default function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };
 function ChangeTheme(){
  dispatch(toggleTheme());
  }
  return (
    <>
      <div className="flex items-center p-2 w-full max-w-full ">
         {/* Mobile menu */}
          <div className=" flex-[7%] col-span-1 order-3 lg:hidden  ">
            
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content  bg-light-secondary-300 dark:bg-light-secondary-800 rounded-box z-1 mt-3 w-52 p-2 shadow mobile-menu ">
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 mb-1 "><NavLink to="/" onClick={()=>closeDropdown()}>Home</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 mb-1"><NavLink to="/products" onClick={()=>closeDropdown()}>Products</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 mb-1"><NavLink to="/our-brand" onClick={()=>closeDropdown()}>Our brand</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 mb-1"><NavLink to="/contact-us" onClick={()=>closeDropdown()}>Contact us</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 mb-1 "><NavLink to="/blog" onClick={()=>closeDropdown()}>Blog</NavLink></li>
              <Link to="login"  onClick={()=>closeDropdown()}>
                    <button
                    className="login_btn mb-1
                justify-center items-center rounded-full border-light-secondary-50 bg-light-secondary-400
                dark:bg-dark-secondary-800 dark:text-dark-primary-500 dark:border-dark-secondary-800
                border-[2px] h-[50px] w-[100px]
                  text-light-primary-400 text-[18px] font-bold font-playfair text-16 font-bold">
                      Login
                    </button>
                    </Link>  
              </ul>
            </div>
          
          </div>
          {/* Desktop menu */}
          <div className="order-1 hidden lg:flex lg:flex-[47%] lg:justify-start  ">
            <ul className="menu menu-horizontal px-1 desktop-menu">
              <li className="text-light-secondary-600 dark:text-dark-secondary-500  font-opensans text-16"><NavLink to="/">Home</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16"><NavLink to="/products">Products</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16"><NavLink to="/our-brand">Our brand</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16"><NavLink to="/contact-us">Contact us</NavLink></li>
              <li className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-16 "><NavLink to="/blog">Blog</NavLink></li>
            </ul>
          </div>
          {/* Logo */}
         <div className=" flex-[53%] order-1 lg:justify-center lg:order-2 lg:flex-[28%]  ml-2 lg:ml-0 pt-3 md:ml-10"> 
           <Link to="/" className=" lg:navbar-center normal-case text-xl">
              <img src={logo} alt="logo" className="  w-auto h-28" />
          </Link>
         </div>
         {/* Cart and login */}
          <div className=" flex-[40%] flex items-center lg:gap-4 order-2 lg:order-3 lg:flex-[25%] lg:justify-end justify-evenly">
            <div className="w-[50px] h-[50px] rounded-xl border-light-secondary-50 border-[2px]
            flex items-center justify-center cursor-pointer dark:border-dark-neutral-700
            hover:bg-light-secondary-300 hover:text-light-priamary-600 dark:hover:bg-dark-secondary-800  transition-colors duration-200
            ">
              <i className="fa-solid fa-cart-arrow-down text-light-primary-400 text-[20px] dark:text-dark-primary-500 "></i>
            </div>   
            <Link  to="login" ><button className=" login_btn hidden
             lg:flex justify-center items-center rounded-full border-light-secondary-50
               dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
             bg-light-secondary-400 border-[2px] h-[50px] w-[100px]
              text-light-primary-400 font-playfair text-20 font-bold">Login</button></Link>  
            <button
                onClick={()=>ChangeTheme()}
                className="text-xl cursor-pointer  text-light-primary-400 text-[20px] dark:text-dark-primary-500 "
              >
                {theme === "light" ? (
                  <i className="fa-solid fa-moon"></i>
                ) : (
                  <i className="fa-solid fa-sun"></i>
                )}
        </button>   
          </div>
      </div>
    </>
  );
}
