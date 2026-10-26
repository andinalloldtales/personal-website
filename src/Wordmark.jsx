import { useLayoutEffect, useRef } from "react";
import { brushes } from "./brushes.js";
import { mark } from "./markPaths.js";

const FPS = 12;
const FRAME_MS = 1000 / FPS;
const STAGGER_FRAMES = 4;
const LAST_FRAME = Math.max(...brushes.map((brush) => brush.start + brush.frames));

function shown(frame, start, frames) {
  const t = (frame - start) / frames;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - (1 - t) ** 2;
}

function brushPoints(brush, progress) {
  if (progress <= 0) return "0,0 0,0 0,0";
  const x0 = brush.x + brush.x0;
  const y0 = brush.y0;
  const x1 = brush.x + brush.x1;
  const y1 = brush.y1;
  const dx = x1 - x0;
  const dy = y1 - y0;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const px = (-uy * brush.w) / 2;
  const py = (ux * brush.w) / 2;
  const ex = ux * 14;
  const ey = uy * 14;
  const tip = Math.min(1, progress);
  const sx = x0 - ex;
  const sy = y0 - ey;
  const tx = x0 + dx * progress + ex * tip;
  const ty = y0 + dy * progress + ey * tip;
  return [
    [sx + px, sy + py],
    [tx + px, ty + py],
    [tx - px, ty - py],
    [sx - px, sy - py],
  ]
    .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
}

export default function Wordmark() {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    if (!svg) return undefined;

    const ink = svg.querySelector("[data-ink]");
    const base = svg.querySelector("[data-base]");
    const erase = [...svg.querySelectorAll("[data-erase]")];
    const draw = [...svg.querySelectorAll("[data-draw]")];
    let timers = [];
    let playing = false;
    let complete = false;

    const clear = () => {
      timers.forEach((id) => clearInterval(id));
      timers = [];
    };

    const paint = (frame, hover) => {
      base.setAttribute("fill", hover ? "#fff" : "#000");
      brushes.forEach((brush, index) => {
        const drawProgress = shown(frame - (hover ? STAGGER_FRAMES : 0), brush.start, brush.frames);
        const eraseProgress = hover ? shown(frame, brush.start, brush.frames) : 0;
        draw[index].setAttribute("points", brushPoints(brush, drawProgress));
        erase[index].setAttribute("points", brushPoints(brush, eraseProgress));
      });
    };

    const run = (hover) => {
      playing = true;
      complete = false;
      ink.setAttribute("mask", "url(#ams-draw)");
      const total = LAST_FRAME + (hover ? STAGGER_FRAMES : 0);
      let frame = 0;
      paint(0, hover);
      const id = setInterval(() => {
        frame += 1;
        paint(frame, hover);
        if (frame >= total) {
          clearInterval(id);
          playing = false;
          complete = true;
          ink.removeAttribute("mask");
        }
      }, FRAME_MS);
      timers.push(id);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ink.removeAttribute("mask");
      complete = true;
    } else {
      run(false);
    }

    const onEnter = () => {
      if (!complete || playing) return;
      clear();
      run(true);
    };

    svg.addEventListener("mouseenter", onEnter);
    return () => {
      clear();
      svg.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  const { view, letters } = mark;
  const viewBox = `${view.x} ${-(view.y + view.h)} ${view.w} ${view.h}`;
  const mask = {
    x: view.x - 80,
    y: view.y - 80,
    width: view.w + 160,
    height: view.h + 160,
  };

  return (
    <svg ref={ref} className="mark" viewBox={viewBox} aria-hidden="true">
      <g transform="scale(1 -1)">
        <mask id="ams-draw" maskUnits="userSpaceOnUse" {...mask}>
          <rect data-base="" fill="#000" {...mask} />
          {brushes.map((brush, index) => (
            <polygon key={`erase-${index}`} data-erase="" fill="#000" points="0,0 0,0 0,0" />
          ))}
          {brushes.map((brush, index) => (
            <polygon key={`draw-${index}`} data-draw="" fill="#fff" points="0,0 0,0 0,0" />
          ))}
        </mask>
        <g data-ink="" mask="url(#ams-draw)">
          {letters.map((letter) => (
            <path key={letter.x} d={letter.d} transform={`translate(${letter.x} 0)`} fill="#000" />
          ))}
        </g>
      </g>
    </svg>
  );
}
