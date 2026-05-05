import { Link } from "wouter";
import { GraduationCap } from "lucide-react";
import { ageGroups } from "../../data/ageGroups";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background/80 backdrop-blur-sm mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-8 h-8 rounded-[10px] flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc)' }}
              >
                <GraduationCap className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Curicaa</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Empowering families with world-class, comprehensive K-12 homeschool curriculum designed for modern learning.
            </p>
          </div>

          {/* Pathways Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Pathways</h3>
            <ul className="space-y-3">
              {ageGroups.slice(0, 5).map(group => (
                <li key={group.id}>
                  <a href="#pathways" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                    {group.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#about" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Parent Guide</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Subject Overviews</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Curicaa Education. All rights reserved.
          </p>
          <div className="text-sm text-gray-500">
            Built with ❤️ for homeschooling families
          </div>
        </div>
      </div>
    </footer>
  );
}
