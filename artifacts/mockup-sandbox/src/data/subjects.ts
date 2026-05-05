import { SubjectData } from "./types";
import extractedData from "./extracted.json";
const typedData = extractedData as SubjectData[];
export function getSubjectData(
  ageGroup: string,
  subject: string,
): SubjectData | undefined {
  return typedData.find(
    (data) => data.ageGroup === ageGroup && data.subject === subject,
  );
}
export function getAllSubjectsForAgeGroup(ageGroup: string): SubjectData[] {
  return typedData.filter((data) => data.ageGroup === ageGroup);
}
export function getAllSubjects(): SubjectData[] {
  return typedData;
}
