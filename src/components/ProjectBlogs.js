import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiMedium } from "react-icons/si";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import "../styles/ProjectBlogs.css";

gsap.registerPlugin(ScrollTrigger);

const blogArticles = [
  {
    id: 1,
    title: "How I Built My Portfolio Website with Popular Coding Tools — Without a Coding Background",
    description: "A journey of vision, curiosity, and how AI empowered me to build my data analyst portfolio that once felt impossible.",
    image: "https://cdn-images-1.medium.com/v2/resize:fit:800/1*tMEUkqqBtQ4v-LBbCzLqZA.jpeg",
    mediumUrl: "https://medium.com/@rafsanahmed2828/how-i-built-my-portfolio-website-with-popular-coding-tools-without-a-coding-background-e874e863da4d",
    date: "June 2025"
  },
  {
    id: 2,
    title: "From Data to Insights: Google’s Cyclistic Case Study",
    description: "A conclusive study of Cyclistic’s bike users and user patterns & behaviors using SQL and Tableau.",
    image: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*ljL5VEiMpR8mHEs9l0dznw.jpeg",
    mediumUrl: "https://medium.com/@rafsanahmed2828/from-data-to-insights-googles-cyclistic-case-study-04fb362c2d0d",
    date: "November 2024"
  }
];


const ProjectBlogs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const slideshowRef = useRef(null);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const slideTextRefs = useRef([]);
  const titleRef = useRef(null);
  const controlsRef = useRef(null);

  // Initialize refs
  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, blogArticles.length);
    dotsRef.current = dotsRef.current.slice(0, blogArticles.length);
    slideTextRefs.current = slideTextRefs.current.slice(0, blogArticles.length);
  }, []);

  // Main animation setup with ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current;
    
    // Simple section entrance animation
    const sectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
    
    sectionTl
      .fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(
        slideshowRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      );
    
    // Initial slide setup - standard positioning
    gsap.set(slidesRef.current, { 
      opacity: 0,
      x: "100%"
    });
    
    gsap.set(slidesRef.current[0], { 
      opacity: 1,
      x: "0%"
    });

    // Set active indicator
    gsap.set(dotsRef.current[0], { 
      backgroundColor: "var(--green-bright)",
      width: 20,
      borderRadius: '4px'
    });

    // Animate first slide content - simple fade in
    const firstSlideText = slideTextRefs.current[0];
    if (firstSlideText) {
      const firstSlideElements = [
        firstSlideText.querySelector('.article-date'),
        firstSlideText.querySelector('.article-title'),
        firstSlideText.querySelector('.article-description'),
        firstSlideText.querySelector('.article-links')
      ].filter(Boolean);
      
      gsap.fromTo(
        firstSlideElements,
        { y: 20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power1.out",
          delay: 0.2
        }
      );
    }

    // Clean up ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!slideshowRef.current) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
    };
    
    const handleTouchMove = (e) => {
      if (!isSwiping) return;
      e.preventDefault(); // Prevent page scrolling while swiping
    };
    
    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      isSwiping = false;
    };
    
    const handleSwipe = () => {
      if (isAnimating) return;
      
      const swipeThreshold = 50; // Minimum distance for a swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
        goToNextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        goToPrevSlide();
      }
    };
    
    const container = slideshowRef.current;
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAnimating]);

  const changeSlide = (newIndex) => {
    if (isAnimating || newIndex === currentSlide) return;
    setIsAnimating(true);

    const direction = newIndex > currentSlide ? 1 : -1;
    const outgoing = slidesRef.current[currentSlide];
    const incoming = slidesRef.current[newIndex];
    const outgoingText = slideTextRefs.current[currentSlide];
    const incomingText = slideTextRefs.current[newIndex];

    // Update indicators
    gsap.to(dotsRef.current[currentSlide], { 
      backgroundColor: "var(--lightest-slate)",
      width: 8,
      borderRadius: "50%",
      duration: 0.3,
      ease: "power1.inOut"
    });
    
    gsap.to(dotsRef.current[newIndex], { 
      backgroundColor: "var(--green-bright)",
      width: 20,
      borderRadius: '4px',
      duration: 0.3,
      ease: "power1.inOut"
    });

    // Standard transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(newIndex);
        setIsAnimating(false);
        
        // Reset position of the outgoing slide
        gsap.set(outgoing, { 
          x: direction > 0 ? "-100%" : "100%"
        });
      }
    });

    // Fade out current text content
    if (outgoingText && outgoingText.children) {
      tl.to(Array.from(outgoingText.children), { 
        opacity: 0, 
        y: -10, 
        duration: 0.4, 
        stagger: 0.05,
        ease: "power1.in"
      }, 0);
    }

    // Standard slide transition
    tl.to(outgoing, { 
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      duration: 0.8,
      ease: "power1.inOut"
    }, 0);

    // Prepare incoming slide
    gsap.set(incoming, { 
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    });

    // Bring in new slide
    tl.to(incoming, { 
      x: "0%",
      opacity: 1,
      duration: 0.8, 
      ease: "power1.out"
    }, 0.1);

    // Bring in new text
    if (incomingText && incomingText.children) {
      const incomingElements = Array.from(incomingText.children);
      
      tl.fromTo(
        incomingElements,
        { 
          opacity: 0, 
          y: 10 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.08, 
          ease: "power1.out" 
        }, 
        0.4
      );
    }
  };

  const goToNextSlide = () => {
    const newIndex = (currentSlide + 1) % blogArticles.length;
    changeSlide(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentSlide - 1 + blogArticles.length) % blogArticles.length;
    changeSlide(newIndex);
  };

  return (
  <section ref={sectionRef} className="blog-slideshow-section">
    <h2 ref={titleRef} className="blog-section-title">Project <span className="gradient-text">Blogs</span></h2>
    
    <div ref={slideshowRef} className="blog-slideshow-container">
      {/* Slides */}
      {blogArticles.map((article, index) => (
        <div 
          key={article.id}
          ref={el => slidesRef.current[index] = el}
          className={`blog-slide ${index === currentSlide ? 'active' : index < currentSlide ? 'prev' : ''}`}
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className="slide-overlay">
          </div>
          <div 
            ref={el => slideTextRefs.current[index] = el}
            className="slide-content"
          >
            <span className="article-date">{article.date}</span>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-description">{article.description}</p>
          </div>
          <div className="article-links">
              <a href={article.mediumUrl} target="_blank" rel="noopener noreferrer" className="medium-link btn-effect">
                <SiMedium /> Read on Medium
              </a>
          </div>
        </div>
      ))}

        <div ref={controlsRef} className="slideshow-controls">
            <button 
            className="slide-arrow prev-arrow" 
            onClick={goToPrevSlide}
            aria-label="Previous slide"
            >
            <IoArrowBack />
            </button>
            <button 
            className="slide-arrow next-arrow" 
            onClick={goToNextSlide}
            aria-label="Next slide"
            >
            <IoArrowForward />
            </button>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {blogArticles.map((_, index) => (
              <button
                key={index}
                ref={el => dotsRef.current[index] = el}
                className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => changeSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectBlogs;