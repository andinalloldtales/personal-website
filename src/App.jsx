import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import './index.css'

const projects = [
  { name: "React Product Tool", url: "https://github.com/andinalloldtales/react-product-tool", year: "6/4/2026" },
  { name: "Product Tool API", url: "https://github.com/andinalloldtales/backend-product-tool", year: "6/4/2026" },
  { name: "SM64 CoopDX Mods", url: "https://github.com/andinalloldtales", year: "2025" },
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

export default function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => window.dispatchEvent(new Event("gsap-loaded"));
    document.head.appendChild(script);
  }, []);
//
  return (
    <>
      <Doodles />
      <main style={{ position: "relative", zIndex: 1, background: "transparent", minHeight: "100vh", color: "#fff", fontFamily: "sans-serif", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "160px" }}>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "48px", fontStyle: "italic", fontWeight: 700, letterSpacing: "-1px", marginBottom: "12px" }}>ams</h1>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <a href="https://github.com/andinalloldtales" target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
              github
            </a>
            {/*<a href="https://linkedin.com/in/" target="_blank" rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
              linkedin
            </a>*/}
          </div>
        </motion.div>

        <div style={{ width: "100%", maxWidth: "500px", padding: "0 24px" }}>
          {projects.map((p, i) => (
            <motion.a key={p.name} href={p.url} target="_blank" rel="noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              style={{ display: "flex", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}
              whileHover={{ color: "#fff", x: 4 }}
            >
              <span>{p.name}</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{p.year}</span>
            </motion.a>
          ))}
        </div>
      </main>
    </>
  );
}
