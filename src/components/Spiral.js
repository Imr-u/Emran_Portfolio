// Copyright (c) 2025 by Filip Zrnzevic (https://codepen.io/filipz/pen/KwwKRRr)
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. //

function setupPulsatingCircles() {
  const c = document.getElementById("anim1");
  if (!c) return;
  c.innerHTML = "";
  const center = document.createElement("div");
  center.className = "dot pulse-dot";
  center.style.width = center.style.height = "8px";
  center.style.left = "calc(50% - 4px)";
  center.style.top = "calc(50% - 4px)";
  c.appendChild(center);

  function hueWheel(steps) {
  let colors = [];
  const startHue = 50;
  const endHue = 200;
  const sat = 52;
  const light = 66;
  for (let i = 0; i <= steps; i++) {
    const hue = startHue + ((endHue - startHue) * i) / steps;
    colors.push(`hsl(${hue},${sat}%,${light}%)`);
  }
  return colors;
}
  // Color wheel for the rings
  const colorArr = hueWheel(24);

  for (let r = 0; r < 5; r++) {
    const radius = 15 + r * 15,
      count = 7 + r * 3;
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "dot pulse-dot";
      const angle = (i / count) * 2 * Math.PI;
      const x = Math.cos(angle) * radius,
        y = Math.sin(angle) * radius;
      const sz = 3 + r * 0.3;
      d.style.width = d.style.height = `${sz}px`;
      d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
      d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
      d.style.animationDelay = `${r * 0.2 + i * 0.1}s`;
      // Assign color from the wheel, offset by ring and dot index for variety
      const colorIdx = (i + r * 4) % colorArr.length;
      d.style.background = colorArr[colorIdx];
      c.appendChild(d);
    }
  }
}

function setupRotatingCircles() {
const c = document.getElementById("anim2");
if (!c) return;
c.innerHTML = "";
const cd = document.createElement("div");
cd.className = "dot";
cd.style.width = cd.style.height = "8px";
cd.style.left = "calc(50% - 4px)";
cd.style.top = "calc(50% - 4px)";
c.appendChild(cd);
for (let r = 0; r < 3; r++) {
    const oc = document.createElement("div");
    oc.className = "orbit-container";
    oc.style.animationDuration = `${8 + r * 4}s`;
    oc.style.animationDirection = r % 2 ? "reverse" : "normal";
    const radius = 12 + r * 20,
    count = 6 + r * 3;
    for (let i = 0; i < count; i++) {
    const d = document.createElement("div");
    d.className = "dot";
    const angle = (i / count) * 2 * Math.PI;
    const x = Math.cos(angle) * radius,
        y = Math.sin(angle) * radius;
    const sz = 4 - r * 0.5;
    d.style.width = d.style.height = `${sz}px`;
    d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
    d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
    d.style.background = `rgba(255,255,255,${(90 - r * 15) / 100})`;
    oc.appendChild(d);
    }
    c.appendChild(oc);
}
}

function setupSequentialRings() {
  const c = document.getElementById("anim3");
  if (!c) return;
  c.innerHTML = "";
  const cd = document.createElement("div");
  cd.className = "dot";
  cd.style.width = cd.style.height = "6px";
  cd.style.left = "calc(50% - 3px)";
  cd.style.top = "calc(50% - 3px)";
  c.appendChild(cd);

  // Color wheel for the rings
  function hueWheel(steps) {
    let colors = [];
    const startHue = 30;
    const endHue = 120;
    const sat = 52;
    const light = 66;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  for (let i = 0; i < 6; i++) {
    const rad = 15 + i * 15,
      count = 8 + i * 4;
    for (let j = 0; j < count; j++) {
      const d = document.createElement("div");
      d.className = "dot sequential-dot";
      const angle = (j / count) * 2 * Math.PI;
      const x = Math.cos(angle) * rad,
        y = Math.sin(angle) * rad;
      const sz = 5 + i * 0.2;
      d.style.width = d.style.height = `${sz}px`;
      d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
      d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
      d.style.animation = `expandRing 3s infinite`;
      d.style.animationDelay = `${i * 0.3 + (j / count) * 0.1}s`;
      // Assign color from the wheel, offset by ring and dot index for variety
      const colorIdx = (j + i * 4) % colorArr.length;
      d.style.background = colorArr[colorIdx];
      c.appendChild(d);
    }
  }
}

function setupConcentricRotations() {
  const c = document.getElementById("anim4");
  if (!c) return;
  c.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "concentric-container";
  c.appendChild(wrap);
  const cd = document.createElement("div");
  cd.className = "dot";
  cd.style.width = cd.style.height = "5px";
  cd.style.left = "calc(50% - 2.5px)";
  cd.style.top = "calc(50% - 2.5px)";
  cd.style.background = "rgba(255,255,255,0.9)";
  wrap.appendChild(cd);

  // Color wheel for the rings
  function hueWheel(steps) {
    let colors = [];
    const startHue = 0;
    const endHue = 360;
    const sat = 52;
    const light = 66;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  for (let r = 0; r < 10; r++) {
    const ring = document.createElement("div");
    ring.className = "concentric-ring";
    ring.style.animationDuration = `${3 * Math.pow(1.5, r)}s`;
    const radius = 10 + r * 9,
      circ = 2 * Math.PI * radius;
    const count = Math.max(6, Math.floor(circ / 10));
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      const angle = (i / count) * 2 * Math.PI;
      const x = Math.cos(angle) * radius,
        y = Math.sin(angle) * radius;
      d.style.width = d.style.height = "4px";
      d.style.left = `calc(50% + ${x}px - 2px)`;
      d.style.top = `calc(50% + ${y}px - 2px)`;
      // Assign color from the wheel, offset by ring and dot index for variety
      const colorIdx = (i + r * 4) % colorArr.length;
      d.style.background = colorArr[colorIdx];
      ring.appendChild(d);
    }
    wrap.appendChild(ring);
  }
}

function setupCircularWaves() {
  const c = document.getElementById("anim5");
  if (!c) return;
  c.innerHTML = "";
  const cd = document.createElement("div");
  cd.className = "dot";
  cd.style.width = cd.style.height = "8px";
  cd.style.left = "calc(50% - 4px)";
  cd.style.top = "calc(50% - 4px)";
  c.appendChild(cd);

  // Color wheel for the waves
  function hueWheel(steps) {
    let colors = [];
    const startHue = 50;
    const endHue = 200;
    const sat = 52;
    const light = 76;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  for (let r = 0; r < 5; r++) {
    const rad = 20 + r * 15,
      count = 15 + r * 4;
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "dot circular-wave-dot";
      const angle = (i / count) * 2 * Math.PI;
      const x = Math.cos(angle) * rad,
        y = Math.sin(angle) * rad;
      const sz = 3 + r * 0.2;
      d.style.width = d.style.height = `${sz}px`;
      d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
      d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
      d.style.animationDelay = `${r * 0.2 + (i / count) * 0.5}s`;
      // Assign color from the wheel, offset by ring and dot index for variety
      const colorIdx = (i + r * 4) % colorArr.length;
      d.style.background = colorArr[colorIdx];
      c.appendChild(d);
    }
  }
}

function setupExpandingLines() {
  const c = document.getElementById("anim6");
  if (!c) return;
  c.innerHTML = "";
  const cd = document.createElement("div");
  cd.className = "dot";
  cd.style.width = cd.style.height = "6px";
  cd.style.left = "calc(50% - 3px)";
  cd.style.top = "calc(50% - 3px)";
  cd.style.background = "rgba(255,255,255,0.8)";
  c.appendChild(cd);

  // Color wheel for the lines
  function hueWheel(steps) {
    let colors = [];
    const startHue = 0;
    const endHue = 360;
    const sat = 50;
    const light = 66;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  for (let g = 0; g < 3; g++) {
    const lc = document.createElement("div");
    lc.className = "line-container";
    lc.style.animationDuration = `${8 + g * 4}s`;
    lc.style.animationDirection = g % 2 ? "reverse" : "normal";
    for (let i = 0; i < 10; i++) {
      const line = document.createElement("div");
      line.className = "expanding-line";
      line.style.animationDelay = `${(i / 12) * 2}s`;
      line.style.transform = `rotate(${(360 / 12) * i}deg)`;

      const dot = document.createElement("div");
      dot.className = "dot";
      dot.style.width = dot.style.height = "4px";
      dot.style.left = "70px";
      dot.style.top = "calc(50% - 1.5px)";
      // Assign color from the wheel, offset by group and line index for variety
      const colorIdx = (i + g * 4) % colorArr.length;
      dot.style.background = colorArr[colorIdx];

      line.appendChild(dot);
      lc.appendChild(line);
    }
    c.appendChild(lc);
  }
}

function setupBreathingGrid() {
const c = document.getElementById("anim7");
if (!c) return;
c.innerHTML = "";
const grid = 9,
    spacing = 16,
    ds = 4;
const offset = -(spacing * (grid - 1)) / 2;
for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
    const d = document.createElement("div");
    d.className = "dot breathing-dot";
    const px = offset + x * spacing,
        py = offset + y * spacing;
    d.style.width = d.style.height = `${ds}px`;
    d.style.left = `calc(50% + ${px}px - ${ds / 2}px)`;
    d.style.top = `calc(50% + ${py}px - ${ds / 2}px)`;
    const center = (grid - 1) / 2;
    const dist = Math.hypot(x - center, y - center);
    const maxD = Math.hypot(center, center);
    d.style.animationDelay = `${(dist / maxD) * 1.5}s`;
    d.style.background = `rgba(255,255,255,${
        (90 - (dist / maxD) * 40) / 100
    })`;
    c.appendChild(d);
    }
}
}

function setupRippleEffect() {
  const c = document.getElementById("anim8");
  if (!c) return;
  c.innerHTML = "";

  // Center dot
  const cd = document.createElement("div");
  cd.className = "dot";
  cd.style.width = cd.style.height = "8px";
  cd.style.left = "calc(50% - 4px)";
  cd.style.top = "calc(50% - 4px)";
  cd.style.background = "rgba(255,255,255,0.9)";
  cd.style.zIndex = "10";
  c.appendChild(cd);

  // Ripple container
  const rc = document.createElement("div");
  rc.className = "ripple-container";
  c.appendChild(rc);

  // Create ripple rings
  const numRipples = 6;
  const rippleDuration = 4; // seconds

  for (let i = 0; i < numRipples; i++) {
    const r = document.createElement("div");
    r.className = "ripple-ring";
    r.style.animationDelay = `${i * (rippleDuration / numRipples)}s`;
    rc.appendChild(r);
  }

  // Color wheel for the dots (same as halftone/circular waves)
  function hueWheel(steps) {
    let colors = [];
    const startHue = 50;
    const endHue = 200;
    const sat = 52;
    const light = 76;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  // Create dots that will react to the ripple
  const numRings = 4;
  const maxRadius = 60;

  for (let ring = 0; ring < numRings; ring++) {
    const radius = 30 + (ring * (maxRadius - 15)) / (numRings - 1);
    const numDots = 9 + ring * 3;

    for (let i = 0; i < numDots; i++) {
      const angle = (i / numDots) * 2 * Math.PI;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Calculate distance from center (normalized to 0-1)
      const distanceFromCenter = Math.sqrt(x * x + y * y) / maxRadius;

      // Create the dot
      const d = document.createElement("div");
      d.className = "ripple-wave-dot";

      // Size decreases as we move outward
      const size = 3 - ring * 0.5;
      d.style.width = d.style.height = `${size}px`;
      d.style.left = `calc(50% + ${x}px - ${size / 2}px)`;
      d.style.top = `calc(50% + ${y}px - ${size / 2}px)`;

      // Set animation
      d.style.animation = "rippleWave 1s infinite ease-in-out";

      // Delay based on distance from center - this creates the wave effect
      // Multiply by rippleDuration to match the ripple timing
      d.style.animationDelay = `${
        distanceFromCenter * (rippleDuration / 1.2)
      }s`;

      // Assign color from the wheel, offset by ring and dot index for variety
      const colorIdx = (i + ring * 4) % colorArr.length;
      d.style.background = colorArr[colorIdx];

      c.appendChild(d);
    }
  }
}


function setupFibonacciSpiral() {
  const c = document.getElementById("anim9");
  if (!c) return;
  c.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "fibonacci-container";
  c.appendChild(wrap);
  const cd = document.createElement("div");
  cd.className = "dot";
  cd.style.width = cd.style.height = "6px";
  cd.style.left = "calc(50% - 3px)";
  cd.style.top = "calc(50% - 3px)";
  cd.style.background = "hsl(50, 0%, 100.00%)";
  wrap.appendChild(cd);
  const golden = Math.PI * (3 - Math.sqrt(5)),
    N = 120,
    scale = 2;

  // Store dot references and their phase
  const dots = [];
  for (let i = 0; i < N; i++) {
    const angle = i * golden,
      rad = scale * Math.sqrt(i) * 4;
    const x = Math.cos(angle) * rad,
      y = Math.sin(angle) * rad;
    const sz = 6 - (i / N) * 1.5;
    if (sz < 1) continue;
    const d = document.createElement("div");
    d.className = "fibonacci-dot";
    d.style.width = d.style.height = `${sz}px`;
    d.style.left = `calc(50% + ${x}px - ${sz / 2}px)`;
    d.style.top = `calc(50% + ${y}px - ${sz / 2}px)`;
    d.style.animationDelay = `${(i / N) * 3}s`;
    wrap.appendChild(d);
    dots.push({ el: d, phase: i / N });
  }

  // Animate color using HSL, matching sunflower spiral's range
  const startHue = 120;
  const endHue = 200;
  const sat =52;
  const light = 56;
  const duration = 30; // seconds for a full cycle

  function animateColors(time) {
    const t = ((time / 1000) % duration) / duration;
    dots.forEach(({ el, phase }) => {
      // Offset each dot's color phase for a moving effect
      const hue =
        startHue +
        ((endHue - startHue) * ((t + phase) % 1));
      el.style.background = `hsl(${hue},${sat}%,${light}%)`;
    });
    requestAnimationFrame(animateColors);
  }
  requestAnimationFrame(animateColors);
}

function setupHalftoneGradient() {
  const c = document.getElementById("anim10");
  if (!c) return;
  c.innerHTML = "";
  const w = document.createElement("div");
  w.className = "halftone-container";
  c.appendChild(w);

  // Use the same color pattern as requested
  function hueWheel(steps) {
    let colors = [];
    const startHue = 50;
    const endHue = 200;
    const sat = 52;
    const light = 76;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  const radii = [20, 40, 60, 80];
  radii.forEach((radius, i) => {
    const count = 12 + i * 8,
      size = 5 - i;
    for (let j = 0; j < count; j++) {
      const d = document.createElement("div");
      d.className = "halftone-dot";
      d.style.width = d.style.height = `${size}px`;
      const angle = (j / count) * 2 * Math.PI;
      const x = Math.cos(angle) * radius,
        y = Math.sin(angle) * radius;
      d.style.left = `calc(50% + ${x}px - ${size / 2}px)`;
      d.style.top = `calc(50% + ${y}px - ${size / 2}px)`;
      d.style.animationDelay = `${(i * 0.3 + j / count).toFixed(2)}s`;
      // Assign color from the wheel, offset by ring and dot index for variety
      const colorIdx = (j + i * 4) % colorArr.length;
      d.style.background = colorArr[colorIdx];
      w.appendChild(d);
    }
  });
}

function setupSilverSpiral() {
  const c = document.getElementById("anim11");
  if (!c) return;
  c.innerHTML = "";
  const w = document.createElement("div");
  w.className = "silver-container";
  c.appendChild(w);
  const N = 150,
    angleStep = Math.PI * (2 - Math.sqrt(2)),
    scale = 1.1;

  // Use the same color pattern as halftone/circular waves
  function hueWheel(steps) {
    let colors = [];
    const startHue = 50;
    const endHue = 200;
    const sat = 52;
    const light = 76;
    for (let i = 0; i <= steps; i++) {
      const hue = startHue + ((endHue - startHue) * i) / steps;
      colors.push(`hsl(${hue},${sat}%,${light}%)`);
    }
    return colors;
  }
  const colorArr = hueWheel(24);

  for (let i = 0; i < N; i++) {
    const angle = i * angleStep,
      rad = scale * Math.sqrt(i) * 6;
    const size = 5 - (i / N) * 2;
    if (size < 1) continue;
    const d = document.createElement("div");
    d.className = "silver-dot";
    d.style.width = d.style.height = `${size}px`;
    d.style.left = `calc(50% + ${Math.cos(angle) * rad}px - ${size / 2}px)`;
    d.style.top = `calc(50% + ${Math.sin(angle) * rad}px - ${size / 2}px)`;
    d.style.animationDelay = `${(i / N) * 2}s`;
    // Assign color from the wheel, offset by index for variety
    const colorIdx = i % colorArr.length;
    d.style.background = colorArr[colorIdx];
    w.appendChild(d);
  }
}

// 12. Sunflower Spiral (perfect SVG + SMIL)
function setupFibonacciConcentric() {
  const c = document.getElementById("anim12");
  if (!c) return;
  c.innerHTML = "";
  const N = 200;
  const SIZE = 500;
  const DOT_RADIUS = 6;
  const MARGIN = 3;
  const CENTER = SIZE / 2;
  const MAX_RADIUS = CENTER - MARGIN - DOT_RADIUS;
  const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
  const DURATION = 3;
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", SIZE);
  svg.setAttribute("height", SIZE);
  svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);
  c.appendChild(svg);

  // Generate a hue wheel for smooth color animation
function hueWheel(steps) {
  let colors = [];
    const startHue = 50;
    const endHue = 200;
    const sat = 52;
    const light = 76;
  for (let i = 0; i <= steps; i++) {
    const hue = startHue + ((endHue - startHue) * i) / steps;
    colors.push(`hsl(${hue},${sat}%,${light}%)`);
  }
  return colors.join(";");
}
  const colorValues = hueWheel(24); // 24 steps for smoothness

  for (let i = 0; i < N; i++) {
    const idx = i + 0.5;
    const frac = idx / N;
    const r = Math.sqrt(frac) * MAX_RADIUS;
    const theta = idx * GOLDEN_ANGLE;
    const x = CENTER + r * Math.cos(theta);
    const y = CENTER + r * Math.sin(theta);

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", DOT_RADIUS);
    circle.setAttribute("fill", "hsl(0, 0.00%, 100.00%)");
    circle.setAttribute("opacity", "0.6");
    svg.appendChild(circle);

    // radius pulse
    const animR = document.createElementNS(svgNS, "animate");
    animR.setAttribute("attributeName", "r");
    animR.setAttribute(
      "values",
      `${DOT_RADIUS * 0.5};${DOT_RADIUS * 1.5};${DOT_RADIUS * 0.5}`
    );
    animR.setAttribute("dur", `${DURATION}s`);
    animR.setAttribute("begin", `${frac * DURATION}s`);
    animR.setAttribute("repeatCount", "indefinite");
    animR.setAttribute("calcMode", "spline");
    animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
    circle.appendChild(animR);

    // opacity pulse
    const animO = document.createElementNS(svgNS, "animate");
    animO.setAttribute("attributeName", "opacity");
    animO.setAttribute("values", "0.3;1;0.3");
    animO.setAttribute("dur", `${DURATION}s`);
    animO.setAttribute("begin", `${frac * DURATION}s`);
    animO.setAttribute("repeatCount", "indefinite");
    animO.setAttribute("calcMode", "spline");
    animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
    circle.appendChild(animO);

    // moving color animation through the full hue wheel
    const animColor = document.createElementNS(svgNS, "animate");
    animColor.setAttribute("attributeName", "fill");
    animColor.setAttribute("values", colorValues);
    animColor.setAttribute("dur", "30s"); // Adjust duration
    animColor.setAttribute("repeatCount", "indefinite");
    animColor.setAttribute("begin", `${(frac * 2).toFixed(2)}s`);
    circle.appendChild(animColor);
  }
}

// Add corner decorations to all animation containers
function addCornerDecorations() {
document.querySelectorAll(".animation-container").forEach((container) => {
    // Create corner SVG elements
    const corners = ["top-left", "top-right", "bottom-left", "bottom-right"];

    corners.forEach((position) => {
    const corner = document.createElement("div");
    corner.className = `corner ${position}`;

    // Use the plus symbol SVG
    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 512 512");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // Create plus symbol polygon
    const polygon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
    );
    polygon.setAttribute(
        "points",
        "448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288"
    );
    polygon.setAttribute("fill", "currentColor");

    svg.appendChild(polygon);
    corner.appendChild(svg);
    container.appendChild(corner);
    });
});
}

window.addEventListener("load", () => {
setupPulsatingCircles();
setupRotatingCircles();
setupSequentialRings();
setupConcentricRotations();
setupCircularWaves();
setupExpandingLines();
setupBreathingGrid();
setupRippleEffect();
setupFibonacciSpiral();
setupHalftoneGradient();
setupSilverSpiral();
setupFibonacciConcentric();
addCornerDecorations(); // Add the corner decorations
});

export {
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
};