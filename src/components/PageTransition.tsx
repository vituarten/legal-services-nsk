"use client";

import { useEffect, ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const container = document.getElementById("page-transition-container");
    if (container) {
      container.style.opacity = "0";
      container.style.transition = "opacity 0.3s ease-in";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.opacity = "1";
        });
      });
    }

    return () => {
      if (container) {
        container.style.opacity = "1";
        container.style.transition = "";
      }
    };
  }, []);

  return (
    <div id="page-transition-container" className="min-h-screen">
      {children}
    </div>
  );
};

export default PageTransition;
