import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      scrollVelocity.current = Math.min(Math.max(delta * 0.15, -15), 15);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 40 floating particles
    const particleCount = 40;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseSize: Math.random() * 1.5 + 0.5,
      size: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.18 + 0.04,
      phase: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity smoothly
      scrollVelocity.current *= 0.92;

      // Soft healthcare emerald green particle tone
      const particleColor = '34, 197, 94';

      particles.forEach((p) => {
        p.phase += 0.01;
        p.x += p.speedX + Math.sin(p.phase) * 0.1;
        p.y += p.speedY + Math.cos(p.phase * 0.7) * 0.1 - scrollVelocity.current * 0.3;

        // Gentle cursor push/reaction
        const dx = p.x - mousePos.current.x;
        const dy = p.y - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const force = ((140 - dist) / 140) * 0.4;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
          p.size = p.baseSize * 1.6;
        } else {
          p.size = p.baseSize;
        }

        // Screen wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        ctx.fill();
      });

      // Draw faint connections between nearby particles
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${particleColor}, ${0.035 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Soft Ambient Green (#22C55E) & Soft Blue Healthcare Glows */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 25, 40, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-20 h-[650px] w-[650px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/12 blur-[130px]"
      />

      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, -30, -15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-20 h-[700px] w-[700px] rounded-full bg-blue-600/08 dark:bg-blue-600/10 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, 40, -25, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-emerald-600/06 dark:bg-emerald-600/08 blur-[120px]"
      />

      {/* Subtle Grid Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

      {/* Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
    </div>
  );
};
