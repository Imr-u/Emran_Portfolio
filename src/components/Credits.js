import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Credits.css";
import SideNavBar from "./SideNavBar";

gsap.registerPlugin(ScrollTrigger);

const Credits = () => {
  const creditsRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      creditsRef.current,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#credits",
          start: "top 95%",
          end: "bottom 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div id="credits" ref={creditsRef}>
      <div className="ending-credits">
        <SideNavBar />
        <a 
          href="https://github.com/Imr-u"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed & Built by Emran Abubeker © 2025
        </a>
      </div>
    </div>
  );
};

export default Credits;