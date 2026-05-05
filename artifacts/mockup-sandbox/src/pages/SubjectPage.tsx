import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { getSubjectData } from "@/data/subjects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackgroundOrbs } from "@/components/shared/BackgroundOrbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LucideIcon,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Hexagon,
  Layers,
  Compass,
  Zap,
  Brain,
  Rocket,
  Telescope,
  FlaskConical,
  Calculator,
  BookText,
  Palette,
  Globe,
  Trophy,
  Briefcase,
  Music,
  Laptop,
  TreePine,
  Target,
  Gamepad2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
const getIconComponent = (iconName: string, className?: string) => {
  const icons: Record<string, LucideIcon> = {
    "fa-calculator": Calculator,
    "fa-brain": Brain,
    "fa-book-open": BookText,
    "fa-flask": FlaskConical,
    "fa-palette": Palette,
    "fa-globe": Globe,
    "fa-trophy": Trophy,
    "fa-briefcase": Briefcase,
    "fa-music": Music,
    "fa-laptop-code": Laptop,
    "fa-tree": TreePine,
    "fa-rocket": Rocket,
    "fa-microscope": Telescope,
    "fa-square-root-variable": Calculator,
    "fa-chart-pie": Calculator,
    "fa-shapes": Hexagon,
    "fa-layer-group": Layers,
    "fa-compass": Compass,
    "fa-bolt": Zap,
    "fa-paint-brush": Palette,
  };
  const Icon = icons[iconName] || BookText;
  return <Icon className={className || "w-6 h-6"} />;
};
export function SubjectPage() {
  const { ageGroup = "", subject = "" } = useParams();
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>(
    {},
  );
  
  const [activeMonth, setActiveMonth] = useState<string>("");

  const data = ageGroup && subject ? getSubjectData(ageGroup, subject) : undefined;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ageGroup, subject]);
  if (!data)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Subject Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The pathway youre looking for doesnt exist.
          </p>
          <Link href="/">
            <span className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
              Return Home
            </span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  const months = Object.keys(data.curriculum);
  const firstMonth = months[0] || "";
  const toggleWeek = (monthId: string, weekIdx: number) => {
    const key = `${monthId}-${weekIdx}`;
    setExpandedWeeks((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <BackgroundOrbs />
      <main className="flex-1">
        <div 
          className="sticky top-[60px] z-40"
          style={{
            background: 'rgba(4, 4, 14, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            padding: '14px 24px'
          }}
        >
          <div className="max-w-[1100px] mx-auto flex items-center justify-between">
            <Link href="/">
              <span className="flex items-center gap-[10px] text-[14px] font-medium text-white/65 hover:text-white transition-colors cursor-pointer">
                <div 
                  className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center text-[14px] text-white"
                  style={{ background: `linear-gradient(135deg, ${data.colors.a1}, ${data.colors.a2})` }}
                >
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">{data.headerName}</div>
                  <div className="text-[11px] text-white/40">{data.headerAge}</div>
                </div>
              </span>
            </Link>
            
            <div className="flex items-center gap-2">
              <span 
                className="px-[14px] py-[5px] rounded-[20px] text-[12px] font-semibold tracking-[0.04em]"
                style={{
                  background: `rgba(${data.colors.a1.replace('#', '')}, 0.12)`, // approximate
                  border: `1px solid rgba(${data.colors.a1.replace('#', '')}, 0.25)`,
                  color: data.colors.al
                }}
              >
                {getIconComponent(data.subjectIcon, "w-3 h-3 inline mr-[5px]")}
                {data.subjectName}
              </span>
            </div>

            <div className="flex items-center gap-[10px]">
              <span 
                className="px-[14px] py-[5px] rounded-[20px] text-[12px] font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${data.colors.a1}, ${data.colors.a2})` }}
              >
                {data.headerAge}
              </span>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1100px] mx-auto px-[24px] pt-[48px]">
          <section className="text-center mb-[56px]">
            <p className="section-label">{data.headerName} · {data.headerAge}</p>
            <h2 
              className="text-[2.5rem] font-extrabold tracking-[-0.035em] mb-[12px] bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${data.colors.a1}, ${data.colors.a2})` }}
            >
              {data.heroTitle}
            </h2>
            <p className="text-[15px] text-white/50 max-w-[600px] mx-auto leading-[1.75]">
              {data.heroDesc}
            </p>
          </section>
          
          <section className="mb-[48px]">
            <div className="mb-[20px]">
              <p className="section-label">Core Skills Overview</p>
              <h3 className="text-[18px] font-bold">What They'll Learn</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px]">
              {data.skillCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-[20px] rounded-[14px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div
                    className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center mb-[12px]"
                    style={{
                      backgroundColor: card.iconBg,
                      color: card.iconColor,
                    }}
                  >
                    {getIconComponent(card.icon, "w-[15px] h-[15px]")}
                  </div>
                  <div className="font-bold text-[14px] mb-[4px]">{card.title}</div>
                  <div className="text-[12px] text-white/45">
                    {card.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        <section className="py-12 bg-muted/20 border-t border-border/40">
          <div className="container mx-auto px-4">
            <Tabs 
              value={activeMonth || firstMonth} 
              onValueChange={setActiveMonth}
              className="w-full"
            >
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 hide-scrollbar">
                <TabsList className="h-auto p-1 bg-background border border-border/50">
                  {months.map((month) => (
                    <TabsTrigger
                      key={month}
                      value={month}
                      className="px-6 py-3 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
                    >
                      {month}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {months.map((month, idx) => {
                const monthData = data.curriculum[month];
                const colorClass = monthData.color || "";
                
                const prevMonth = idx > 0 ? months[idx - 1] : null;
                const nextMonth = idx < months.length - 1 ? months[idx + 1] : null;

                return (
                  <TabsContent
                    key={month}
                    value={month}
                    className="mt-0 focus-visible:outline-none"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-4 mb-6">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${colorClass} text-white`}
                          >
                            {getIconComponent(monthData.icon, "w-6 h-6")}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">
                              {monthData.focus}
                            </h3>
                            <p className="text-muted-foreground">
                              Monthly Focus
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {monthData.weeks.map((week, idx) => {
                            const isExpanded = expandedWeeks[`${month}-${idx}`];
                            const hasDetail = week.objective || week.warmup || week.mainActivity || week.game || week.assessment || week.differentiation || week.parentNotes;
                            return (
                              <div
                                key={idx}
                                className="rounded-xl border border-border/50 bg-card overflow-hidden transition-all duration-300"
                              >
                                <button
                                  onClick={() => toggleWeek(month, idx)}
                                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                                >
                                  <div className="flex items-start gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0 mt-0.5">
                                      {idx + 1}
                                    </span>
                                    <div className="flex flex-col flex-1 text-left">
                                      <span className="text-[13px] text-foreground/80 leading-snug">
                                        {week.title}
                                      </span>
                                      {hasDetail && (
                                        <span className="text-[11px] text-muted-foreground mt-1">
                                          Tap for details
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                  />
                                </button>
                                {hasDetail && (
                                  <div
                                    className={`grid transition-all duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                  >
                                    <div className="overflow-hidden">
                                      <div className="p-4 pt-2 border-t border-border/50 bg-background/30 flex flex-col gap-3">
                                        {week.objective && (
                                          <div className="flex gap-3">
                                            <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Objective</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.objective}</p>
                                            </div>
                                          </div>
                                        )}
                                        {week.warmup && (
                                          <div className="flex gap-3">
                                            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-amber-500 uppercase tracking-wider">Warm-Up</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.warmup}</p>
                                            </div>
                                          </div>
                                        )}
                                        {week.mainActivity && (
                                          <div className="flex gap-3">
                                            <BookText className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Main Activity</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.mainActivity}</p>
                                            </div>
                                          </div>
                                        )}
                                        {week.game && (
                                          <div className="flex gap-3">
                                            <Gamepad2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Game / Practice</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.game}</p>
                                            </div>
                                          </div>
                                        )}
                                        {week.assessment && (
                                          <div className="flex gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-violet-400 uppercase tracking-wider">Check Understanding</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.assessment}</p>
                                            </div>
                                          </div>
                                        )}
                                        {week.differentiation && (
                                          <div className="flex gap-3">
                                            <Layers className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">Leveled Support</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.differentiation}</p>
                                            </div>
                                          </div>
                                        )}
                                        {week.parentNotes && (
                                          <div className="flex gap-3">
                                            <Users className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                            <div>
                                              <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Parent / Teacher Notes</span>
                                              <p className="text-xs text-muted-foreground leading-relaxed">{week.parentNotes}</p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-card border border-border/50">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-primary" />
                            Key Skills
                          </h4>
                          <ul className="space-y-3">
                            {monthData.skills.map((skill, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-sm"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-muted-foreground">
                                  {skill}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                          <h4 className="font-bold mb-3 flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-indigo-400" />
                            Monthly Project
                          </h4>
                          <p className="text-sm leading-relaxed text-indigo-900 dark:text-indigo-200">
                            {monthData.project}
                          </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-card border border-border/50">
                          <h4 className="font-bold mb-4 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-primary" />
                            Materials Needed
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {monthData.materials.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium text-muted-foreground"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Prev/Next Navigation */}
                    <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/50">
                      <button
                        onClick={() => prevMonth && setActiveMonth(prevMonth)}
                        disabled={!prevMonth}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium ${
                          !prevMonth ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      
                      <button
                        onClick={() => nextMonth && setActiveMonth(nextMonth)}
                        disabled={!nextMonth}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm font-medium ${
                          !nextMonth ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
