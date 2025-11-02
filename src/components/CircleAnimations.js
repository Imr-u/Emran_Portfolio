import React from "react";
import {
  setupPulsatingCircles,
  setupRotatingCircles,
  setupSequentialRings,
  setupConcentricRotations,
  setupCircularWaves,
  setupExpandingLines,
  setupBreathingGrid,
  setupRippleEffect,
  setupFibonacciSpiral,
  setupHalftoneGradient,
  setupSilverSpiral,
  setupFibonacciConcentric,
  addCornerDecorations
} from "./Spiral";
import "../styles/Spiral.css";

const animationList = [
  { id: "anim1", title: "Pulsating Circles", setup: setupPulsatingCircles },
  { id: "anim2", title: "Rotating Orbits", setup: setupRotatingCircles },
  { id: "anim3", title: "Sequential Rings", setup: setupSequentialRings },
  { id: "anim4", title: "Concentric Rotations", setup: setupConcentricRotations },
  { id: "anim5", title: "Circular Waves", setup: setupCircularWaves },
  { id: "anim6", title: "Expanding Lines", setup: setupExpandingLines },
  { id: "anim7", title: "Breathing Grid", setup: setupBreathingGrid },
  { id: "anim8", title: "Ripple Effect", setup: setupRippleEffect },
  { id: "anim9", title: "Fibonacci Spiral", setup: setupFibonacciSpiral },
  { id: "anim10", title: "Halftone Gradient", setup: setupHalftoneGradient },
  { id: "anim11", title: "Silver Spiral", setup: setupSilverSpiral },
  { id: "anim12", title: "Sunflower Spiral", setup: setupFibonacciConcentric }
];

export default function CircleAnimations({ showid, onCircleClick }) {
  React.useEffect(() => {
    const anim = animationList.find(a => a.id === showid);
    if (anim) anim.setup();
    addCornerDecorations();
  }, [showid]);

  return (
    <div className="center-wrapper">
      <div className="spiral-container">
        {animationList
          .filter(anim => anim.id === showid)
          .map(anim => (
            <div
              className="animation-container"
              key={anim.id}
              onClick={onCircleClick}
              style={{ cursor: "pointer" }}
              title={anim.title}
            >
              <div className="animation-title">{anim.title}</div>
              <div id={anim.id} className="circle-container"></div>
            </div>
          ))}
      </div>
    </div>
  );
}