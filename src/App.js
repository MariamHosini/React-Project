
import './index.css';
import { useSelector } from 'react-redux';
import { Routes, Route ,Navigate } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Blog from './components/blog/blog';
import ContactUs from './components/contact-us/contact-us';
import Products from './components/products/products';
import OurBrand from './components/our-brand/our-brand';
import BlogPost from '../src/components/blogPast/blogPost'
import Login from './components/login/login';
import Footer from './components/footer/footer';
import SignUp from './components/signUp/signUp'
import { useLocation } from 'react-router-dom';
import Profile from './components/profile/profile';
import ForgetPassword from './components/forgetPassword/forgetPassword'
import ResetPassword from './components/resetPassword/resetPassword';
import OneProduct from './components/one_product/one_product'
import Cart from './components/cart/cart'
import CheckOut from './components/check-out/checkOut';
import WishList from './components/wishList/wishList';
function App() {
  const location = useLocation();
  const noNavbar = ['/login' , '/sign-up' , '/forget-password' , '/reset-password']
  const theme = useSelector((store) => store.theme.mode);
  const isAuthenticated =useSelector(store=>store.auth.isAuthenticated)
  localStorage.setItem('theme', theme);
  theme === 'dark'? document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark');
  return (
    <div className=" duration-500 ease-in-out w-full min-h-[calc(100vh)] flex flex-col bg-light-neutral-50 dark:bg-dark-neutral-800 transition-colors ">
      {!noNavbar.includes(location.pathname) && <Navbar/>}
      <main className='w-full min-h-[calc(100vh)]'>
        <Routes>   
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/our-brand" element={<OurBrand />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={isAuthenticated ?<WishList /> : <Navigate to="/"/>}  />
          <Route path="/blogPost/:id" element={<BlogPost />} />
          <Route path="/one-product/:id" element={<OneProduct />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/login" element={!isAuthenticated ?<Login /> : <Navigate to="/"/>} />
          <Route path="/sign-up" element={!isAuthenticated ?<SignUp /> : <Navigate to="/"/>} />
          <Route path="/profile/:userId" element={isAuthenticated ? <Profile /> : <Navigate to="/"/>} />
          <Route path="/forget-password" element={!isAuthenticated?<ForgetPassword />:<Navigate to="/"/>} />
          <Route path="/reset-password" element={!isAuthenticated?<ResetPassword />:<Navigate to="/"/>} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    </main>
    {!noNavbar.includes(location.pathname) && <Footer/>}
</div>

  );
}

export default App;
