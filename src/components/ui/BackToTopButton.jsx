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
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[20] group flex items-center justify-center w-16 h-16 md:w-24 md:h-24 transition-all"
        >
          {/* 1. ROTATING OUTER RING */}
          <div className="absolute inset-0 border border-dashed border-foreground/10 rounded-full group-hover:border-accent/40 animate-[spin_8s_linear_infinite]" />

          {/* 2. SECONDARY RING */}
          <div className="absolute inset-1.5 md:inset-2 border border-foreground/5 rounded-full group-hover:scale-110 group-hover:border-accent/20 transition-all duration-500" />

          {/* 3. COORDINATE DATA (Hidden on Mobile) */}
          <div className="absolute inset-0 hidden md:flex flex-col justify-between items-center py-1 select-none pointer-events-none">
            <span className="text-[7px] font-mono text-foreground/40 uppercase tracking-[0.3em] group-hover:text-accent transition-colors">
              Elev_00
            </span>
            <span className="text-[7px] font-mono text-foreground/40 uppercase tracking-[0.3em] group-hover:text-accent transition-colors">
              Sect_R10
            </span>
          </div>

          {/* 4. MAIN ACTION CORE */}
          <div className="relative w-9 h-9 md:w-12 md:h-12 bg-accent border border-foreground flex items-center justify-center transition-all duration-300 group-hover:bg-foreground group-hover:rotate-45 shadow-lg">
            {/* Internal Crosshairs */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-foreground group-hover:bg-background" />
              <div className="absolute left-1/2 top-0 w-[0.5px] h-full bg-foreground group-hover:bg-background" />
            </div>

            {/* The Arrow */}
            <FiArrowUp className="relative z-10 text-background group-hover:text-background group-hover:-rotate-45 transition-all duration-300 stroke-[3] w-4 h-4 md:w-5 md:h-5" />

            {/* Corner "L" Brackets */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-accent opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-accent opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:translate-y-1" />
          </div>

          {/* 5. SIDE "VOLTAGE" BARS (Scaled for Mobile) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 md:gap-1">
            <div className="w-2 md:w-3 h-[1px] bg-foreground/20 group-hover:bg-accent group-hover:w-5 transition-all" />
            <div className="w-1 md:w-2 h-[1px] bg-foreground/20 group-hover:bg-accent transition-all" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 md:gap-1 items-end">
            <div className="w-2 md:w-3 h-[1px] bg-foreground/20 group-hover:bg-accent group-hover:w-5 transition-all" />
            <div className="w-1 md:w-2 h-[1px] bg-foreground/20 group-hover:bg-accent transition-all" />
          </div>

          {/* 6. SCANLINE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none rounded-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
