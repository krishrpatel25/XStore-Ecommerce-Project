import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This will run every time the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't need to render anything
};

export default ScrollToTop;
