import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = window.innerHeight * 0.8; // 120vh
      if (window.scrollY > triggerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-6 p-4 bg-accent text-white rounded-full shadow-lg hover:bg-gray-800 transition-all"
        >
          <FiArrowUp size={22} />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
