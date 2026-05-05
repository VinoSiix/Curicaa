import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link } from "wouter";
import { AgeGroupConfig } from "@/data/types";
import { getAllSubjectsForAgeGroup } from "@/data/subjects";
import { Calculator, BookText, FlaskConical, Palette } from "lucide-react";
import { colorMap } from "@/data/ageGroups";
import { cn } from "@/lib/utils";

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageGroup: AgeGroupConfig | null;
}

export function SubjectModal({ isOpen, onClose, ageGroup }: SubjectModalProps) {
  if (!ageGroup) return null;
  const subjects = getAllSubjectsForAgeGroup(ageGroup.id);
  const colors = colorMap[ageGroup.color] || colorMap.purple;

  const getSubjectIcon = (subjectId: string) => {
    if (subjectId.includes("math"))
      return (
        <Calculator className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
      );
    if (subjectId.includes("english"))
      return (
        <BookText className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
      );
    if (subjectId.includes("science"))
      return (
        <FlaskConical className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
      );
    return (
      <Palette className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-3xl overflow-hidden p-0 border-white/10 bg-[#09090b]"
        style={{
          borderRadius: '24px',
          animation: 'modalIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        <div className="p-8 pb-6 border-b border-white/5 relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none rounded-full blur-3xl"
            style={{ background: ageGroup.gradientStart, transform: 'translate(30%, -30%)' }}
          ></div>
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ 
                  background: ageGroup.gradientStart, 
                  boxShadow: `0 0 12px ${ageGroup.gradientStart}` 
                }}
              />
              <span
                className={cn("text-xs font-bold tracking-[0.15em] uppercase", colors.text)}
              >
                {ageGroup.name}
              </span>
            </div>
            <DialogTitle className="text-3xl font-extrabold tracking-tight text-white">
              Choose your subject
            </DialogTitle>
            <DialogDescription className="text-base text-gray-400 mt-2 max-w-lg">
              Explore our specialized curriculum pathways designed for{" "}
              {ageGroup.grade}.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 bg-[#09090b]/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjects.map((subject) => (
              <Link
                key={subject.subject}
                href={`/${ageGroup.id}/${subject.subject}`}
              >
                <div
                  className="subject-btn group relative flex flex-col p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={onClose}
                  style={{ textAlign: 'left' }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none ${ageGroup.gradient}`}
                  />
                  <div className={colors.text}>
                    {getSubjectIcon(subject.subject)}
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-white group-hover:text-white transition-colors">
                    {subject.subjectName}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {subject.heroTitle}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-semibold opacity-60 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300" style={{ color: ageGroup.gradientStart }}>
                    Explore Pathway{" "}
                    <span className="ml-1.5 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
