import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import './index.css'

const projects = [
  { name: "Covo | Real-Time Messaging Platform", description: "Real-time chat, group rooms, presence", url: "https://covochat.vercel.app/", year: "6/12/2026" },
  { name: "AI Research Assistant", description: "Agentic web research w/ Llama 4 Scout", url: "https://amsresearch.vercel.app/", year: "6/7/2026" },
  { name: "React Product Tool", description: "Inventory manager, full CRUD + search", url: "https://github.com/andinalloldtales/react-product-tool", year: "6/4/2026" },
  { name: "Product Tool API", description: "REST API backend, MongoDB + Mongoose", url: "https://github.com/andinalloldtales/backend-product-tool", year: "6/4/2026" },
];

const Doodles = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.gsap) return;
    const gsap = window.gsap;
    const paths = ref.current.querySelectorAll("path, line, circle, polyline, rect");
    paths.forEach(p => {
      if (p.tagName === "circle") return;
      const len = p.getTotalLength ? p.getTotalLength() : 60;
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.to(ref.current.querySelectorAll("path, line, polyline"), {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      stagger: 0.15,
      delay: 0.8,
    });
    gsap.to(ref.current.querySelectorAll("circle"), {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out",
      stagger: 0.1,
      delay: 1.2,
    });
    gsap.to(ref.current, { opacity: 1, duration: 0.1 });
  }, []);

  const s = { fill: "none", stroke: "rgba(255,255,255,0.12)", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  const sc = { fill: "rgba(255,255,255,0.1)", opacity: 0, scale: 0, transformOrigin: "center" };

  return (
    <svg ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0 }} xmlns="http://www.w3.org/2000/svg">

      {/* stick figure top left */}
      <circle cx="80" cy="120" r="10" style={sc} />
      <line x1="80" y1="130" x2="80" y2="165" style={s} />
      <line x1="80" y1="140" x2="60" y2="155" style={s} />
      <line x1="80" y1="140" x2="100" y2="155" style={s} />
      <line x1="80" y1="165" x2="65" y2="185" style={s} />
      <line x1="80" y1="165" x2="95" y2="185" style={s} />

      {/* laptop doodle top right */}
      <rect x="1300" y="100" width="80" height="52" rx="4" style={s} />
      <line x1="1285" y1="152" x2="1395" y2="152" style={s} />
      <polyline points="1310,120 1320,135 1330,125 1340,140 1350,128 1360,138" style={s} />

      {/* star top right corner */}
      <path d="M1380 60 L1383 70 L1393 70 L1385 76 L1388 86 L1380 80 L1372 86 L1375 76 L1367 70 L1377 70 Z" style={s} />

      {/* squiggle bottom left */}
      <path d="M40 700 Q60 680 80 700 Q100 720 120 700 Q140 680 160 700" style={s} />

      {/* arrow pointing right bottom left */}
      <line x1="40" y1="760" x2="120" y2="760" style={s} />
      <polyline points="105,750 120,760 105,770" style={s} />
      <line x1="40" y1="780" x2="70" y2="780" style={{...s, stroke: "rgba(255,255,255,0.06)"}} />

      {/* small stars scattered */}
      <path d="M200 300 L202 307 L209 307 L203 311 L205 318 L200 314 L195 318 L197 311 L191 307 L198 307 Z" style={s} />
      <path d="M1350 400 L1352 406 L1358 406 L1353 410 L1355 416 L1350 412 L1345 416 L1347 410 L1342 406 L1348 406 Z" style={s} />

      {/* speech bubble bottom right */}
      <path d="M1320 650 Q1320 630 1360 630 Q1400 630 1400 650 Q1400 670 1360 670 L1345 685 L1350 670 Q1320 670 1320 650 Z" style={s} />
      <line x1="1335" y1="645" x2="1385" y2="645" style={s} />
      <line x1="1335" y1="655" x2="1375" y2="655" style={s} />

      {/* rocket doodle mid left */}
      <path d="M60 450 Q60 410 80 400 Q100 410 100 450 L95 470 L80 475 L65 470 Z" style={s} />
      <path d="M65 465 Q55 475 55 490 L80 480 L105 490 Q105 475 95 465" style={s} />
      <circle cx="80" cy="435" r="8" style={sc} />
      <line x1="80" y1="475" x2="80" y2="495" style={{...s, strokeDasharray:"3 3"}} />

      <circle cx="300" cy="200" r="2" style={{fill:"rgba(255,255,255,0.08)"}} />
      <circle cx="1200" cy="300" r="2" style={{fill:"rgba(255,255,255,0.08)"}} />
      <circle cx="150" cy="550" r="2" style={{fill:"rgba(255,255,255,0.08)"}} />
      <circle cx="1400" cy="500" r="2" style={{fill:"rgba(255,255,255,0.08)"}} />

      <path d="M1380 350 Q1390 340 1400 350 Q1410 360 1420 350 Q1430 340 1440 350" style={s} />

      {/* heart bottom left */}
      <path d="M100 820 Q100 810 110 810 Q120 810 120 820 Q120 810 130 810 Q140 810 140 820 Q140 835 120 848 Q100 835 100 820 Z" style={s} />
    </svg>
  );
};

const TITLE_LETTERS = ["a", "m", "s"];

const AnimatedTitle = () => {
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    const start = () => {
      if (!window.gsap || !ref.current) { raf = requestAnimationFrame(start); return; }
      const gsap = window.gsap;
      const letters = ref.current.querySelectorAll(".letter");

      gsap.set(letters, { opacity: 0, y: 28, rotateZ: -6 });
      gsap.to(letters, {
        opacity: 1,
        y: 0,
        rotateZ: 0,
        duration: 0.9,
        ease: "back.out(1.6)",
        stagger: 0.08,
        delay: 0.15,
      });

      gsap.to(ref.current, {
        letterSpacing: "1px",
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.4,
      });
    };
    start();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <h1 ref={ref} style={{ fontSize: "48px", fontStyle: "italic", fontWeight: 700, letterSpacing: "-1px", marginBottom: "12px", display: "inline-flex" }}>
      {TITLE_LETTERS.map((l, i) => (
        <span key={i} className="letter" style={{ display: "inline-block" }}>{l}</span>
      ))}
    </h1>
  );
};

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => window.dispatchEvent(new Event("gsap-loaded"));
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <Doodles />
      <main style={{ position: "relative", zIndex: 1, background: "transparent", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "160px", paddingBottom: "80px" }}>

        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <AnimatedTitle />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <motion.a href="https://github.com/andinalloldtales" target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}
              whileHover={{ color: "#fff", letterSpacing: "0.5px" }}
              transition={{ duration: 0.25 }}>
              github
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          style={{ width: "100%", maxWidth: "560px", padding: "0 24px" }}
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
          }}
        >
          {projects.map((p) => (
            <motion.div key={p.name}
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              whileHover={{ x: 4 }}
              style={{ padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <motion.a href={p.url} target="_blank" rel="noreferrer"
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", textDecoration: "none", backgroundImage: "linear-gradient(currentColor, currentColor)", backgroundSize: "0% 1px", backgroundPosition: "0 100%", backgroundRepeat: "no-repeat", paddingBottom: "2px" }}
                  whileHover={{ backgroundSize: "100% 1px", color: "#fff" }}
                  transition={{ duration: 0.3 }}>
                  {p.name}
                </motion.a>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", flexShrink: 0, marginLeft: "16px" }}>{p.year}</span>
              </div>
              <div style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.32)", marginTop: "3px" }}>
                {p.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
}