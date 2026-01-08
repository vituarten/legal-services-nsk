import { useEffect, ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Fade in при загрузке страницы
    const appContent = document.querySelector("#app-content");
    if (appContent) {
      appContent.style.opacity = "0";
      appContent.style.transition = "opacity 0.3s ease-in";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          appContent.style.opacity = "1";
        });
      });
    }

    return () => {
      if (appContent) {
        appContent.style.opacity = "1";
        appContent.style.transition = "";
      }
    };
  }, []);

  return <>{children}</>;
};

export default PageTransition;
