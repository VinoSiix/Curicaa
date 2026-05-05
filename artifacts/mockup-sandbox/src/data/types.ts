export interface SkillCard {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  iconBg: string;
}
export interface WeekData {
  title: string;
  objective: string;
  warmup: string;
  mainActivity: string;
  game: string;
  assessment: string;
  differentiation: string;
  parentNotes: string;
}
export interface MonthData {
  icon: string;
  color: string;
  focus: string;
  skills: string[];
  weeks: WeekData[];
  project: string;
  materials: string[];
}
export interface CurriculumData {
  [month: string]: MonthData;
}
export interface SubjectData {
  file: string;
  ageGroup: string;
  subject: string;
  colors: { a1: string; a2: string; al: string };
  pageTitle: string;
  headerName: string;
  headerAge: string;
  subjectIcon: string;
  subjectName: string;
  heroTitle: string;
  heroDesc: string;
  skillCards: SkillCard[];
  curriculum: CurriculumData;
}
export interface AgeGroupConfig {
  id: string;
  name: string;
  grade: string;
  color: string;
  description: string;
  route: string;
  gradient: string;
  gradientStart?: string;
  gradientEnd?: string;
  titleColor?: string;
  badgeColor?: string;
  icon?: string;
  subjects?: { name: string }[];
}
