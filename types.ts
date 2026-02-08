
export interface TeacherProfile {
  id: string;
  name: string;
  grade: string;
  group: string; // 추가된 필드
  food: string;
  dream: string;
  hobby: string;
  motto: string;
  bucketList: string;
  selfPraise: string;
  wishToHear: string;
  greeting: string;
  createdAt: number;
}

export type AppStep = 'HOME' | 'PROFILE' | 'QUIZ' | 'GALLERY';

export interface QuizQuestion {
  targetProfile: TeacherProfile;
  questionField: keyof TeacherProfile;
  options: string[];
}
