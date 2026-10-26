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

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;
}

function PosterUnderline({
  as: Tag = "span",
  className,
  children,
  held = false,
  heldRef,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const lineRef = useRef(null);
  const running = useRef(null);
  const progress = useRef(0);
  const targetRef = useRef(0);
  const hovering = useRef(false);
  const syncRef = useRef(() => {});

  const paint = (value) => {
    progress.current = value;
    const line = lineRef.current;
    if (!line) return;
    const parent = line.parentElement;
    const scale = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    const fontSize = parseFloat(getComputedStyle(parent).fontSize) || 16;
    const thickness = Math.round(1.5 * scale) / scale;
    const text = [...parent.childNodes].find((node) => node.nodeType === 3 && node.textContent.trim());
    let anchor = rect.bottom;
    if (text) {
      const range = document.createRange();
      range.selectNodeContents(text);
      anchor = range.getBoundingClientRect().bottom;
    }
    const snapped = Math.round((anchor + fontSize * 0.07) * scale) / scale;
    line.style.transform = "";
    line.style.top = `${snapped - rect.top}px`;
    line.style.height = `${thickness}px`;
    const placed = line.getBoundingClientRect().top;
    const correction = Math.round(placed * scale) / scale - placed;
    if (Math.abs(correction) > 0.01) line.style.transform = `translateY(${correction}px)`;
    line.style.width = `${Math.round(rect.width * value * scale) / scale}px`;
  };

  const animateTo = (target) => {
    const arrived = Math.abs(progress.current - target) < 0.001;
    if (targetRef.current === target && (running.current || arrived)) return;
    targetRef.current = target;
    if (running.current) clearInterval(running.current);
    running.current = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || arrived) {
      paint(target);
      return;
    }
    const from = progress.current;
    let frame = 0;
    running.current = setInterval(() => {
      frame += 1;
      const t = Math.min(1, frame / FRAMES);
      paint(from + (target - from) * easeInOutQuad(t));
      if (t >= 1) {
        clearInterval(running.current);
        running.current = null;
        paint(target);
      }
    }, FRAME_MS);
  };

  useEffect(
    () => () => {
      if (running.current) clearInterval(running.current);
    },
    [],
  );

  const sync = () => animateTo(hovering.current || Boolean(heldRef?.current) ? 1 : 0);
  syncRef.current = sync;

  useEffect(() => {
    syncRef.current();
  }, [held]);

  return (
    <Tag
      {...rest}
      className={className ? `poster ${className}` : "poster"}
      onClick={(event) => {
        onClick?.(event);
        sync();
      }}
      onMouseEnter={(event) => {
        hovering.current = true;
        sync();
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        hovering.current = false;
        sync();
        onMouseLeave?.(event);
      }}
    >
      {children}
      <span ref={lineRef} className="poster-line" aria-hidden="true" />
    </Tag>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
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
    const next = !openRef.current;
    openRef.current = next;
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
        <span>
          founder @{" "}
          <PosterUnderline as="a" className="covo" href="https://covochat.vercel.app/">
            covo
          </PosterUnderline>
        </span>
        <PosterUnderline
          as="button"
          type="button"
          aria-expanded={open}
          held={open}
          heldRef={openRef}
          onClick={toggle}
        >
          about <span ref={chevronRef} className="chevron">›</span>
        </PosterUnderline>
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
