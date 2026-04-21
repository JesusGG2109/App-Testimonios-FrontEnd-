import { useState, useEffect, useCallback } from "react";
import testimonios from "./data";
import Testimonial from "./components/Testimonial";
import Controls from "./components/Controls";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const total = testimonios.length;

  const changeTo = useCallback(
    (newIndex, dir = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setIndex(newIndex);
        setAnimating(false);
      }, 350);
    },
    [animating]
  );

  const next = useCallback(() => {
    changeTo((index + 1) % total, "next");
  }, [index, total, changeTo]);

  const prev = useCallback(() => {
    changeTo((index - 1 + total) % total, "prev");
  }, [index, total, changeTo]);

  const random = useCallback(() => {
    let r = Math.floor(Math.random() * total);
    if (r === index) r = (r + 1) % total;
    changeTo(r, "next");
  }, [index, total, changeTo]);

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [next]);

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "dark";
});

useEffect(() => {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}, [theme]);

  return (
    <div className="scene">
      {/* Blobs animados de fondo */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />

      <div className="glass-card">
        <div className="card-header">
  <button 
    className="theme-toggle"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  >
    {theme === "dark" ? "☀️" : "🌙"}
  </button>

  <span className="chip">✦ Testimonios</span>

  <h1 className="headline">
    Lo que dicen<br />nuestros clientes
  </h1>
</div>

        <div
          className={`testimonial-wrapper ${
            animating ? `exit-${direction}` : `enter-${direction}`
          }`}
        >
          <Testimonial item={testimonios[index]} />
        </div>

        <div className="card-footer">
          <Controls prev={prev} next={next} random={random} />
          <div className="counter">
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? "dot-active" : ""}`}
                onClick={() => changeTo(i, i > index ? "next" : "prev")}
              />
            ))}
          </div>
          <p className="auto-note">
            <span className="pulse-dot" /> Cambia cada 5 seg
          </p>
        </div>
      </div>
    </div>
  );
}
