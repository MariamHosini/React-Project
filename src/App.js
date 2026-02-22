
import './index.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
function App() {
  const theme = useSelector((store) => store.theme.mode);

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
