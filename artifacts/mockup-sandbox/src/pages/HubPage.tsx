import { useState, useEffect } from "react";
import { ageGroups, features, aboutCards } from "@/data/ageGroups";
import { AgeGroupConfig } from "@/data/types";
import { SubjectModal } from "@/components/shared/SubjectModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundOrbs } from "@/components/shared/BackgroundOrbs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Target,
  Users,
  Sparkles,
  Globe,
  Award,
  Laptop,
  Heart,
  Puzzle,
  Compass,
  Rocket,
  Flag,
  Eye,
  Map,
  ShieldCheck,
  Star,
  Calendar,
  Wrench,
  Palette,
  Smartphone,
  TrendingUp,
  Printer,
  Presentation,
  CheckCircle2,
  FlaskConical,
  Music,
  CircleDollarSign,
  Sprout,
  Baby,
  GraduationCap,
  Trophy,
  Shield,
  Clock
} from "lucide-react";
import { LucideIcon } from "lucide-react";

const getIconComponent = (iconName: string | undefined, className: string = "w-6 h-6") => {
  if (!iconName) return <Star className={className} />;
  const icons: Record<string, LucideIcon> = {
    Brain, BookOpen, Target, Users, Sparkles, Globe, Award, Laptop,
    Heart, Puzzle, Compass, Rocket, Flag, Eye, Map, ShieldCheck,
    Calendar, Wrench, Palette, Smartphone, TrendingUp, Printer,
    Presentation, CheckCircle2, FlaskConical, Music, CircleDollarSign,
    Sprout, Baby, GraduationCap, Trophy, Shield, Clock
  };
  const Icon = icons[iconName] || Star;
  return <Icon className={className} />;
};

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
};

export function HubPage() {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (ageGroup: AgeGroupConfig) => {
    setSelectedAgeGroup(ageGroup);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BackgroundOrbs />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
            <motion.div 
              className="max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <div className="hero-badge">
                  <span className="badge-label">NEW</span>
                  <span className="px-2">Comprehensive K-12 Curriculum</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="hero-title text-5xl md:text-7xl lg:text-[80px] mb-8"
              >
                Every child deserves a <br className="hidden md:block"/>
                <span className="hero-accent">world-class education.</span>
              </motion.h1>

              <motion.p 
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed"
              >
                A complete, rigorous, and engaging homeschool curriculum designed for modern families. From first letters to college prep, built to inspire.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-16">
                <a href="#pathways" className="btn-primary group">
                  Explore Curriculum 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#features" className="btn-secondary">
                  How it works
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-8 md:gap-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">7 Levels</div>
                    <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">K-12 Covered</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">4 Core</div>
                    <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Subjects</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">40 Weeks</div>
                    <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">Per Subject</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* LOGOS / SOCIAL PROOF BAR */}
        <section className="py-10 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-6 max-w-[1200px]">
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] mb-8">
              Designed for modern homeschooling families
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-medium text-sm">Standards Aligned</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-sm">Evidence Based</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="font-medium text-sm">Flexible Pacing</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="w-5 h-5 text-rose-400" />
                <span className="font-medium text-sm">Engaging Content</span>
              </div>
            </div>
          </div>
        </section>

        {/* PATHWAYS SECTION */}
        <section id="pathways" className="py-24 relative z-10">
          <div className="container mx-auto px-6 max-w-[1200px]">
            <div className="mb-16 reveal">
              <span className="section-label">Pathways</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Journey</h2>
              <p className="text-gray-400 text-lg max-w-2xl">From early foundations to advanced placement, select the perfect starting point for your learner.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ageGroups.map((group, index) => (
                <div
                  key={group.id}
                  onClick={() => handleOpenModal(group)}
                  className={`card card-${group.color} group reveal`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${group.gradientStart}20, ${group.gradientEnd}20)`, color: group.gradientStart }}
                    >
                      {getIconComponent(group.icon, `w-6 h-6`)}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white tracking-wider">
                      {group.grade}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10">{group.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {(group.subjects ?? []).map((subject, i) => (
                      <span key={i} className="subject-tag">
                        {subject.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm font-semibold text-gray-500 group-hover:text-white transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-24 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-6 max-w-[1200px]">
            <div className="text-center mb-16 reveal">
              <span className="section-label">Platform Features</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Everything you need.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">A comprehensive toolkit designed to make homeschooling effective, structured, and enjoyable.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="feature-card reveal"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: feature.iconBg }}
                  >
                    {getIconComponent(feature.icon, `w-6 h-6 ${feature.iconColorClass || 'text-white'}`)}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.text}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 overflow-hidden relative">
           <div className="container mx-auto px-6 max-w-[1200px]">
               <div className="text-center max-w-2xl mx-auto reveal">
                  <span className="section-label">Our Mission</span>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                    World-class curriculum,<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                      accessible to everyone.
                    </span>
                  </h2>
                  <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                    <p>
                      Curicaa provides open-and-go lesson plans from age 5 through SAT prep, using materials you already have at home. Every lesson is laid out week by week so you can focus on teaching, not planning.
                    </p>
                    <p>
                      If you can read, you can teach with this.
                    </p>
                  </div>
              </div>
           </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-24 border-t border-white/5 cta-section">
          <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10 reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Start your learning journey today.</h2>
            <p className="text-xl text-indigo-200/60 mb-10 max-w-2xl mx-auto">
              Join thousands of families who have transformed their homeschooling experience.
            </p>
            <a href="#pathways" className="btn-primary text-lg px-8 py-4">
              Explore Curriculum Pathways
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
      
      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ageGroup={selectedAgeGroup}
      />
    </div>
  );
}
