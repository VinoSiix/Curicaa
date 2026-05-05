import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface StarData {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function BackgroundOrbs() {
  const { theme } = useTheme();
  const [stars, setStars] = useState<StarData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Generate fewer stars for a cleaner look
    const newStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      size: Math.random() * 1.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.4 + 0.05,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
    
    setStars(newStars);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
      >
        {mounted && theme === "dark" && (
          <>
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  opacity: star.opacity,
                  animation: `twinkle ${star.duration}s infinite ${star.delay}s alternate`,
                }}
              />
            ))}
            <div 
              className="fixed rounded-full pointer-events-none"
              style={{
                width: '800px', 
                height: '800px', 
                background: '#4f46e5', 
                top: '-400px', 
                left: '-200px',
                filter: 'blur(140px)',
                opacity: 0.08,
                zIndex: 0
              }}
            />
            <div 
              className="fixed rounded-full pointer-events-none"
              style={{
                width: '600px', 
                height: '600px', 
                background: '#7c3aed', 
                bottom: '-200px', 
                right: '-100px',
                filter: 'blur(140px)',
                opacity: 0.08,
                zIndex: 0
              }}
            />
            <div 
              className="fixed rounded-full pointer-events-none"
              style={{
                width: '500px', 
                height: '500px', 
                background: '#0ea5e9', 
                top: '40%', 
                left: '35%',
                filter: 'blur(140px)',
                opacity: 0.06,
                zIndex: 0
              }}
            />
          </>
        )}
        {mounted && theme === "light" && (
          <>
            <div 
              className="fixed rounded-full pointer-events-none"
              style={{
                width: '700px', 
                height: '700px', 
                background: '#6366f1', 
                top: '-300px', 
                left: '-200px',
                filter: 'blur(120px)',
                opacity: 0.06,
                zIndex: 0
              }}
            />
            <div 
              className="fixed rounded-full pointer-events-none"
              style={{
                width: '600px', 
                height: '600px', 
                background: '#7c3aed', 
                bottom: '-150px', 
                right: '-150px',
                filter: 'blur(120px)',
                opacity: 0.06,
                zIndex: 0
              }}
            />
            <div 
              className="fixed rounded-full pointer-events-none"
              style={{
                width: '400px', 
                height: '400px', 
                background: '#0891b2', 
                top: '35%', 
                left: '38%',
                filter: 'blur(120px)',
                opacity: 0.06,
                zIndex: 0
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
