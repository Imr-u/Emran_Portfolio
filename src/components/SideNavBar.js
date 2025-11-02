import React, { useRef, useEffect } from "react";
import Icon from "./Icons";
import "../styles/SideNavBar.css";
import { gsap } from "gsap";

export default function SideNavBar({ showStars, setShowStars }) {
  const sideNavRef = useRef(null);
  const iconsRef = useRef([]);
  
  useEffect(() => {
    if (sideNavRef.current) {
      gsap.set(sideNavRef.current, { 
        autoAlpha: 1,
        y: 0
      });
      
      gsap.set(iconsRef.current, { 
        autoAlpha: 0, 
        y: -20,
        x: -10
      });
      
      gsap.to(iconsRef.current, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.4)", 
        delay: 0.9
      });
    }
  }, []);
  
  const addToRefs = (el) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  };
  
  return (
    <div className="side-navbar" ref={sideNavRef}>
      <a href="https://github.com/Imr-u" title="GitHub" target="_blank" rel="noopener noreferrer" ref={addToRefs}>
        <Icon name="GitHub" className="sidenav-icon"/>
      </a>
      <a href="https://www.linkedin.com/in/emran_abubeker/" title="LinkedIn" target="_blank" rel="noopener noreferrer" ref={addToRefs}>
        <Icon name="Linkedin" className="sidenav-icon"/>
      </a>
      <a href="https://medium.com/@abukiemran" title="Medium" target="_blank" rel="noopener noreferrer" ref={addToRefs}>
        <Icon name="Medium" className="sidenav-icon"/>
      </a>
      <a href="mailto:abukiemran@gmail.com" title="Email" target="_blank" rel="noopener noreferrer" ref={addToRefs}>
        <Icon name="Email" className="sidenav-icon"/>
      </a>
      <div className="side-navbar-divider" ref={addToRefs}></div>
      <button
        className={`star-btn${showStars ? " star-active" : ""}`}
        onClick={() => setShowStars((prev) => !prev)}
        title={showStars ? "Disable Background" : "Enable Background"}
        type="button"
        ref={addToRefs}>
        <Icon name="Star" />
      </button>
    </div>
  );
}