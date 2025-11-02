import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "./Icons";
import "../styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const textRefs = useRef([]);
  
  useEffect(() => {
    gsap.fromTo(".about-title",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.from(textRefs.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" ref={aboutRef}>
      <div className="section-header">
        <span className="section-title about-title">About Me</span>
      </div>
      
      <div className="about-content">
        <div className="about-description">
           <p ref={el => textRefs.current[0] = el}>
            Hi, my name is <span className="highlight">Emran</span>, and I’m passionate about building intelligent data systems. My curiosity for data began in <span className="highlight">2022</span> when I first discovered ChatGPT. It wasn’t available in my country at the time, but I found a way to access it — and seeing its capabilities opened my eyes to the world of data and AI.
          </p>

          <p ref={el => textRefs.current[1] = el}>
            That spark led me to take a <span className="highlight">Data Analyst Bootcamp</span>, where I earned certifications in <span className="highlight">Python, SQL, and Data Visualization</span>. During our final project — a <span className="highlight">data scraping and automation</span> challenge — I discovered my real passion for <span className="highlight">Data Engineering</span> and building systems that move, clean, and transform data efficiently.
          </p>

          <p ref={el => textRefs.current[2] = el}>
            Along the way, I’ve built a strong foundation in <span className="highlight">data modeling, ETL pipeline design, and cloud workflows</span>. I enjoy solving complex problems and turning raw data into actionable insights. Learning and experimentation have always been at the heart of my journey — every project helps me understand data more deeply.
          </p>

          <p ref={el => textRefs.current[3] = el}>
            My current focus is on becoming a <span className="highlight">Data Engineer</span> who designs scalable, automated data pipelines and explores how <span className="highlight">AI and automation</span> can work together to create efficient, intelligent data systems. I believe great data infrastructure is the backbone of innovation — and that’s what I aim to build.
          </p>

          <p ref={el => textRefs.current[4] = el}>
            Outside of tech, I enjoy discovering new tools, learning modern frameworks, and exploring the creative side of technology. I’m always curious — whether it’s about data, AI models, or just the next big thing in automation.
          </p>
          
        </div>
        <p className="about-timeline-link" ref={el => textRefs.current[5] = el}>
          <a href="#timeline">
            <span role="img" aria-label="timeline">🗺️ </span> 
            View my <span className="about-timeline-highlight">timeline</span> to learn more about my unique journey into data &rarr;
          </a>
        </p>     
        <div className="about-actions" ref={el => textRefs.current[6] = el}>
          <a href="#contact" className="resume-button btn-effect">
            Get in Touch <Icon name="Mail" className="button-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;