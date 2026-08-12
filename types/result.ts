export interface SubjectScore {
  subject: string;
  score: number;
  grade: string;
}

export interface StudentResult {
  id: string;
  student_id: string;
  pin: string;
  student_name: string;
  term: string;
  class_name: string;
  subjects: SubjectScore[];
  created_at: string;
}

export type ActionResponse = 
  | { success: true; data: StudentResult; error?: undefined }
  | { success: false; error: string; data?: undefined };