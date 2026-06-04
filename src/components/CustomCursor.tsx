"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringWrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setMounted(true);

    const tick = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * 0.1;
      pos.current.ry += (pos.current.my - pos.current.ry) * 0.1;

      dotRef.current?.style.setProperty(
        "transform",
        `translate(${pos.current.mx}px, ${pos.current.my}px)`
      );
      ringWrapRef.current?.style.setProperty(
        "transform",
        `translate(${pos.current.rx}px, ${pos.current.ry}px)`
      );
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const attach = () => {
      document.querySelectorAll("a, button, [role='button'], label").forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    attach();
    raf.current = requestAnimationFrame(tick);

    // Re-attach on DOM mutations (for dynamically added elements)
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          borderRadius: "50%",
          background: "#C9A84C",
          opacity: hovering ? 0 : 1,
          transform: "scale(1)",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Ring wrapper — lerp follow */}
      <div
        ref={ringWrapRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
      >
        {/* Ring inner — handles size transitions centred via -50% -50% */}
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) scale(${clicking ? 0.85 : 1})`,
            width: hovering ? 44 : 28,
            height: hovering ? 44 : 28,
            borderRadius: "50%",
            border: `1.5px solid ${hovering ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.3)"}`,
            background: hovering ? "rgba(201,168,76,0.07)" : "transparent",
            backdropFilter: hovering ? "blur(2px)" : "none",
            transition:
              "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, background 0.25s ease, transform 0.15s ease",
          }}
        />
      </div>
    </>
  );
}
