
import './index.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import blog from './components/blog/blog';
import contactUs from './components/contact-us/contact-us';
import products from './components/products/products';
import ourBrand from './components/our-brand/our-brand';
function App() {
  const theme = useSelector((store) => store.theme.mode);
  localStorage.setItem('theme', theme);
  theme === 'dark'? document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark');
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-dark transition-colors ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<products />} />
        <Route path="/our-brand" element={<ourBrand />} />
        <Route path="/contact-us" element={<contactUs />} />
        <Route path="/blog" element={<blog />} />
      </Routes>
    </div>
  );
}

export default App;
