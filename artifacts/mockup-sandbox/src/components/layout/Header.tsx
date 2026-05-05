import { Link } from "wouter";
import { ThemeToggle } from "../shared/ThemeToggle";
import { GraduationCap, ArrowRight, Menu } from "lucide-react";

export function Header() {
  return (
    <header 
      className="sticky top-0 z-50 transition-colors"
      style={{
        background: 'rgba(9, 9, 11, 0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[64px] relative z-10">

          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group logo-wrap">
              <div className="relative shrink-0">
                <div 
                  className="absolute -inset-1 rounded-[12px] blur-[8px] opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}
                ></div>
                <div 
                  className="relative w-8 h-8 rounded-[10px] flex items-center justify-center z-10"
                  style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)' }}
                >
                  <GraduationCap className="h-4 w-4 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <div className="font-bold text-[16px] tracking-[-0.03em] leading-none text-white">
                  Curicaa
                </div>
              </div>
            </div>
          </Link>

          {/* Nav links (center) */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#pathways" className="nav-link text-sm px-4 py-2 hover:text-white transition-colors">Pathways</a>
            <a href="#features" className="nav-link text-sm px-4 py-2 hover:text-white transition-colors">Features</a>
            <a href="#about" className="nav-link text-sm px-4 py-2 hover:text-white transition-colors">About</a>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                color: 'rgba(255,255,255,0.7)'
              }}
            >
              <Menu className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <a 
              href="#pathways"
              className="hidden md:inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-[13px] px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              Start Learning <ArrowRight className="h-3 w-3" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
