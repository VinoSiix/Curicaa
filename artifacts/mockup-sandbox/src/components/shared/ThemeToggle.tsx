import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="w-[34px] h-[34px]" />;
  }
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-[34px] h-[34px] rounded-lg flex items-center justify-center transition-all duration-200"
      style={{
        border: '1px solid rgba(255,255,255,0.09)',
        background: 'rgba(255,255,255,0.04)',
        color: 'rgba(255,255,255,0.5)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
      }}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-[13px] w-[13px]" />
      ) : (
        <Sun className="h-[13px] w-[13px]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
