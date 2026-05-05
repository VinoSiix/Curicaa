import { AgeGroupConfig } from "./types";

export const colorMap: Record<string, { bg: string; text: string; border: string; shadow: string; gradient: string; ring: string; dot: string; }> = {
  purple: {
    bg: "bg-purple-500/20",
    text: "text-purple-400 dark:text-purple-300",
    border: "border-purple-500/50",
    shadow: "shadow-purple-500/20",
    gradient: "from-purple-500 to-fuchsia-500",
    ring: "ring-purple-500/30",
    dot: "bg-purple-500",
  },
  blue: {
    bg: "bg-blue-500/20",
    text: "text-blue-400 dark:text-blue-300",
    border: "border-blue-500/50",
    shadow: "shadow-blue-500/20",
    gradient: "from-blue-500 to-cyan-500",
    ring: "ring-blue-500/30",
    dot: "bg-blue-500",
  },
  emerald: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-400 dark:text-emerald-300",
    border: "border-emerald-500/50",
    shadow: "shadow-emerald-500/20",
    gradient: "from-emerald-500 to-teal-500",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-500",
  },
  orange: {
    bg: "bg-orange-500/20",
    text: "text-orange-400 dark:text-orange-300",
    border: "border-orange-500/50",
    shadow: "shadow-orange-500/20",
    gradient: "from-orange-500 to-amber-500",
    ring: "ring-orange-500/30",
    dot: "bg-orange-500",
  },
  indigo: {
    bg: "bg-indigo-500/20",
    text: "text-indigo-400 dark:text-indigo-300",
    border: "border-indigo-500/50",
    shadow: "shadow-indigo-500/20",
    gradient: "from-indigo-500 to-blue-500",
    ring: "ring-indigo-500/30",
    dot: "bg-indigo-500",
  },
  rose: {
    bg: "bg-rose-500/20",
    text: "text-rose-400 dark:text-rose-300",
    border: "border-rose-500/50",
    shadow: "shadow-rose-500/20",
    gradient: "from-rose-500 to-pink-500",
    ring: "ring-rose-500/30",
    dot: "bg-rose-500",
  },
  yellow: {
    bg: "bg-yellow-500/20",
    text: "text-yellow-400 dark:text-yellow-300",
    border: "border-yellow-500/50",
    shadow: "shadow-yellow-500/20",
    gradient: "from-yellow-500 to-amber-500",
    ring: "ring-yellow-500/30",
    dot: "bg-yellow-500",
  }
};

export const ageGroups: AgeGroupConfig[] = [
  {
    id: "ages-5-7",
    name: "Early Elementary",
    grade: "Ages 5–7",
    color: "purple",
    description: "Foundation building",
    route: "/ages-5-7",
    gradient: "from-purple-500/20 to-fuchsia-500/20",
    gradientStart: "#a855f7",
    gradientEnd: "#ec4899",
    titleColor: "#d8b4fe",
    badgeColor: "#c4b5fd",
    icon: "Baby",
    subjects: [{name: "Basic reading"}, {name: "Number sense"}, {name: "Science discovery"}, {name: "Creative arts"}]
  },
  {
    id: "age-8",
    name: "Grade 3",
    grade: "Age 8",
    color: "blue",
    description: "Skill development",
    route: "/age-8",
    gradient: "from-blue-500/20 to-cyan-500/20",
    gradientStart: "#3b82f6",
    gradientEnd: "#06b6d4",
    titleColor: "#93c5fd",
    badgeColor: "#93c5fd",
    icon: "Star",
    subjects: [{name: "Fluent reading"}, {name: "Multiplication"}, {name: "Scientific method"}, {name: "Art techniques"}]
  },
  {
    id: "age-9",
    name: "Grade 4",
    grade: "Age 9",
    color: "green",
    description: "Knowledge expansion",
    route: "/age-9",
    gradient: "from-emerald-500/20 to-teal-500/20",
    gradientStart: "#10b981",
    gradientEnd: "#34d399",
    titleColor: "#6ee7b7",
    badgeColor: "#6ee7b7",
    icon: "BookOpen",
    subjects: [{name: "Comprehension"}, {name: "Division"}, {name: "Lab reports"}, {name: "Creative projects"}]
  },
  {
    id: "age-10",
    name: "Grade 5",
    grade: "Age 10",
    color: "orange",
    description: "Advanced basics",
    route: "/age-10",
    gradient: "from-orange-500/20 to-amber-500/20",
    gradientStart: "#f97316",
    gradientEnd: "#ef4444",
    titleColor: "#fdba74",
    badgeColor: "#fdba74",
    icon: "Rocket",
    subjects: [{name: "Essay writing"}, {name: "Fractions/decimals"}, {name: "Research skills"}, {name: "Art analysis"}]
  },
  {
    id: "ages-11-12",
    name: "Middle School",
    grade: "Ages 11–12",
    color: "indigo",
    description: "Preparation focus",
    route: "/ages-11-12",
    gradient: "from-indigo-500/20 to-blue-500/20",
    gradientStart: "#6366f1",
    gradientEnd: "#8b5cf6",
    titleColor: "#a5b4fc",
    badgeColor: "#a5b4fc",
    icon: "Brain",
    subjects: [{name: "Research essays"}, {name: "Pre-algebra"}, {name: "Advanced labs"}, {name: "Digital arts"}]
  },
  {
    id: "age-14",
    name: "High School",
    grade: "Age 14",
    color: "red",
    description: "Critical thinking",
    route: "/age-14",
    gradient: "from-rose-500/20 to-pink-500/20",
    gradientStart: "#ef4444",
    gradientEnd: "#ec4899",
    titleColor: "#fca5a5",
    badgeColor: "#fca5a5",
    icon: "GraduationCap",
    subjects: [{name: "Academic writing"}, {name: "Algebra I"}, {name: "Scientific analysis"}, {name: "Advanced art"}]
  },
  {
    id: "ages-15-16",
    name: "GED",
    grade: "Ages 15–16",
    color: "yellow",
    description: "GED preparation",
    route: "/ages-15-16",
    gradient: "from-yellow-500/20 to-amber-500/20",
    gradientStart: "#eab308",
    gradientEnd: "#f97316",
    titleColor: "#fde047",
    badgeColor: "#fde047",
    icon: "Award",
    subjects: [{name: "English"}, {name: "Science"}, {name: "Math"}, {name: "Social Studies"}]
  },
  {
    id: "ages-17-18",
    name: "SAT",
    grade: "Ages 17–18",
    color: "orange",
    description: "SAT preparation",
    route: "/ages-17-18",
    gradient: "from-orange-500/20 to-red-500/20",
    gradientStart: "#f97316",
    gradientEnd: "#ef4444",
    titleColor: "#fb923c",
    badgeColor: "#fb923c",
    icon: "Trophy",
    subjects: [{name: "SAT/ACT strategies"}, {name: "College readiness"}, {name: "Practice exams"}, {name: "College applications"}]
  },
];
export const features = [
  { 
    icon: "Calendar", 
    text: "Monthly Themes",
    description: "Sep–Jun structure",
    iconBg: "rgba(99,102,241,0.14)",
    iconColorClass: "text-[#818cf8]"
  },
  { 
    icon: "Wrench", 
    text: "Low-Budget Projects",
    description: "Accessible materials",
    iconBg: "rgba(16,185,129,0.14)",
    iconColorClass: "text-[#34d399]"
  },
  { 
    icon: "Palette", 
    text: "Interactive Design",
    description: "Modern interface",
    iconBg: "rgba(168,85,247,0.14)",
    iconColorClass: "text-[#c084fc]"
  },
  { 
    icon: "Smartphone", 
    text: "Works Everywhere",
    description: "Any device, any time",
    iconBg: "rgba(234,179,8,0.14)",
    iconColorClass: "text-[#fbbf24]"
  },
  { 
    icon: "TrendingUp", 
    text: "Progress Tracking",
    description: "See growth over time",
    iconBg: "rgba(6,182,212,0.14)",
    iconColorClass: "text-[#22d3ee]"
  },
  { 
    icon: "Printer", 
    text: "Printable Worksheets",
    description: "Print & go, no prep",
    iconBg: "rgba(244,114,182,0.14)",
    iconColorClass: "text-[#f472b6]"
  },
  { 
    icon: "Presentation", 
    text: "Parent Guides",
    description: "Step-by-step lessons",
    iconBg: "rgba(251,146,60,0.14)",
    iconColorClass: "text-[#fb923c]"
  },
  { 
    icon: "CheckCircle2", 
    text: "Review Quizzes",
    description: "Built-in assessments",
    iconBg: "rgba(74,222,128,0.12)",
    iconColorClass: "text-[#4ade80]"
  },
  { 
    icon: "BookOpen", 
    text: "Reading Lists",
    description: "Age-matched books",
    iconBg: "rgba(96,165,250,0.14)",
    iconColorClass: "text-[#60a5fa]"
  },
  { 
    icon: "FlaskConical", 
    text: "STEM Projects",
    description: "Hands-on science",
    iconBg: "rgba(168,85,247,0.14)",
    iconColorClass: "text-[#c084fc]"
  },
  { 
    icon: "Music", 
    text: "Music & Arts",
    description: "Creative expression",
    iconBg: "rgba(236,72,153,0.14)",
    iconColorClass: "text-[#f472b6]"
  },
  { 
    icon: "Award", 
    text: "Achievement Badges",
    description: "Reward progress",
    iconBg: "rgba(250,204,21,0.14)",
    iconColorClass: "text-[#facc15]"
  }
];
export const aboutCards = [
  {
    title: "Made with Care",
    description:
      "Every lesson, activity, and project is thoughtfully designed to spark joy and curiosity in learning.",
    icon: "Heart",
    iconColor: "#818cf8",
    iconBg: "rgba(99,102,241,0.12)",
  },
  {
    title: "For Everyone",
    description:
      "Inclusive and adaptable for various learning styles, abilities, and family schedules.",
    icon: "Users",
    iconColor: "#34d399",
    iconBg: "rgba(16,185,129,0.12)",
  },
  {
    title: "Budget-Friendly",
    description:
      "High-quality education shouldn't break the bank. We use everyday items for most activities.",
    icon: "CircleDollarSign",
    iconColor: "#fb923c",
    iconBg: "rgba(249,115,22,0.12)",
  },
  {
    title: "Grows With You",
    description:
      "From kindergarten to college prep, our curriculum builds a seamless, continuous foundation.",
    icon: "Sprout",
    iconColor: "#c084fc",
    iconBg: "rgba(168,85,247,0.12)",
  },
];
