import { useEffect, useRef, useState } from "react";
import Wordmark from "./Wordmark.jsx";
import "./index.css";

const FPS = 12;
const FRAME_MS = 1000 / FPS;
const FRAMES = 12;

function ageFrom(date) {
  let age = date.getFullYear() - 2008;
  const before = date.getMonth() < 7 || (date.getMonth() === 7 && date.getDate() < 24);
  return before ? age - 1 : age;
}

function easeOutQuint(t) {
  return 1 - (1 - t) ** 5;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState(() => ageFrom(new Date()));
  const panelRef = useRef(null);
  const innerRef = useRef(null);
  const chevronRef = useRef(null);
  const running = useRef(null);

  useEffect(() => {
    const update = () => setAge(ageFrom(new Date()));
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const paint = (progress, height) => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    panel.style.height = `${height * progress}px`;
    inner.style.opacity = String(progress);
    inner.style.transform = `translateY(${(1 - progress) * -1.35}rem)`;
    chevronRef.current.style.transform = `rotate(${progress * 90}deg)`;
  };

  const measure = () => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    const previous = panel.style.height;
    panel.style.height = "auto";
    const height = inner.getBoundingClientRect().height;
    panel.style.height = previous;
    return height;
  };

  const toggle = () => {
    if (running.current) clearInterval(running.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const panel = panelRef.current;
    const next = !open;
    setOpen(next);
    const height = measure();

    if (reduce) {
      paint(next ? 1 : 0, height);
      panel.style.height = next ? "auto" : "0px";
      return;
    }

    if (next) panel.style.height = "0px";
    else panel.style.height = `${height}px`;

    let frame = 0;
    paint(next ? 0 : 1, height);
    running.current = setInterval(() => {
      frame += 1;
      const t = Math.min(1, frame / FRAMES);
      const eased = easeOutQuint(t);
      paint(next ? eased : 1 - eased, height);
      if (t >= 1) {
        clearInterval(running.current);
        running.current = null;
        panel.style.height = next ? "auto" : "0px";
      }
    }, FRAME_MS);
  };

  return (
    <main>
      <h1>
        <Wordmark />
        <span className="sr-only">ams</span>
      </h1>

      <p className="tagline">
        <span>{age}</span>
        <span>no degree</span>
        <span>self employed swe</span>
        <button type="button" aria-expanded={open} onClick={toggle}>
          about <span ref={chevronRef} className="chevron">›</span>
        </button>
      </p>

      <div ref={panelRef} className="about-panel" aria-hidden={!open}>
        <div ref={innerRef} className="about-panel-inner">
          <p>
            I build software with a purpose. I am interested in the study of music,
            polyphony and philosophy. I also love art of all kinds and photography.
          </p>
        </div>
      </div>
    </main>
  );
}
