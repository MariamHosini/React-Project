import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // بدل scrollTo(0,0) هنستخدم الـ Object ده
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // ده السر في الطلوع ببطء
    });
  }, [pathname]);

  return null;
}