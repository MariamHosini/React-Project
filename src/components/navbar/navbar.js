
import { useDispatch ,useSelector} from "react-redux";
import { toggleTheme } from "../../store/themeSlice";
import {NavLink, Link} from "react-router-dom";
import logo from "../../assets/logo.png";
export default function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
 function ChangeTheme(){
  dispatch(toggleTheme());
  }
  return (
    <>
      <div className="navbar p-4">

          <div className="navbar-end lg:hidden">
            
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li className="text-secondary-600  "><NavLink to="/">Home</NavLink></li>
              <li className="text-secondary-600"><NavLink to="/products">Products</NavLink></li>
              <li className="text-secondary-600"><NavLink to="/our-brand">Our brand</NavLink></li>
              <li className="text-secondary-600"><NavLink to="/contact-us">Contact us</NavLink></li>
              <li className="text-secondary-600 "><NavLink to="/blog">Blog</NavLink></li>
              <button className="login_btn
 justify-center items-center rounded-full border-secondary-50 bg-secondary-400 border-[2px] h-[50px] w-[100px] text-primary-400 text-[18px] font-bold">Login</button>  
            
              </ul>
            </div>
          
          </div>
          
          <div className="navbar-start hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="text-secondary-600  "><NavLink to="/">Home</NavLink></li>
              <li className="text-secondary-600"><NavLink to="/products">Products</NavLink></li>
              <li className="text-secondary-600"><NavLink to="/our-brand">Our brand</NavLink></li>
              <li className="text-secondary-600"><NavLink to="/contact-us">Contact us</NavLink></li>
              <li className="text-secondary-600 "><NavLink to="/blog">Blog</NavLink></li>
            </ul>
          </div>
         <div className="lg:navbar-center"> 
           <Link to="/" >
              <img src={logo} alt="logo" className="  w-auto h-28" />
          </Link>
         </div>
          <div className="navbar-end flex items-center lg:gap-4">
            <div className="w-[50px] h-[50px] rounded-xl border-secondary-50 border-[2px] flex items-center justify-center cursor-pointer">
              <i className="fa-solid fa-cart-arrow-down text-primary-400 text-[20px] "></i>
            </div>   
            <button className="login_btn hidden
             lg:flex justify-center items-center rounded-full border-secondary-50 bg-secondary-400 border-[2px] h-[50px] w-[100px] text-primary-400 text-[18px] font-bold">Login</button>  
            <button
                onClick={()=>ChangeTheme()}
                className="text-xl cursor-pointer text-primary-400 "
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
