
import './index.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Blog from './components/blog/blog';
import ContactUs from './components/contact-us/contact-us';
import Products from './components/products/products';
import OurBrand from './components/our-brand/our-brand';
import Login from './components/login/login';
import Footer from './components/footer/footer';
import SignUp from './components/signUp/signUp'
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();
  const noNavbar = ['/login' , '/signUp']

  const theme = useSelector((store) => store.theme.mode);
  localStorage.setItem('theme', theme);
  theme === 'dark'? document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark');
  return (
    <div className="w-full min-h-[calc(100vh)] flex flex-col bg-light-neutral-50 dark:bg-dark-neutral-800 transition-colors ">
      {!noNavbar.includes(location.pathname) && <Navbar/>}
      <main className='w-full min-h-[calc(100vh)]'>
        <Routes>   
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/our-brand" element={<OurBrand />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
    </main>
    {!noNavbar.includes(location.pathname) && <Footer/>}
</div>

  );
}

export default App;
