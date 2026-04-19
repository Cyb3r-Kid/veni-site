import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSectionId, syncNavbarScrollOffsetVar } from "../utils/scrollToSection";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    syncNavbarScrollOffsetVar();

    const handleResize = () => {
      syncNavbarScrollOffsetVar();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  useEffect(() => {
    const runScroll = () => {
      const hash = location.hash.replace("#", "");

      if (hash) {
        const didScroll = scrollToSectionId(hash, { behavior: "auto" });
        if (didScroll) return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(runScroll);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollManager;
