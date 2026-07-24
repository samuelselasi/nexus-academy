export type UserRole = 'student' | 'tutor' | 'parent' | 'admin';

export type CurriculumType = 'GES' | 'CAMBRIDGE' | 'MONTESSORI';

export type PaymentMethodType = 'MTN_MOMO' | 'VODAFONE_CASH' | 'AIRTEL_TIGO' | 'CARD';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  timezone: string;
  phone?: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  headline: string;
  bio: string;
  curricula: CurriculumType[];
  subjects: string[];
  hourlyRateGHS: number;
  hourlyRateUSD: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  verificationBadge: string; // e.g. "GES Licensed Teacher #GES-8832", "Cambridge International Certified"
  location: string;
  languages: string[];
  googleCalendarConnected: boolean;
  availableSlots: string[]; // ISO strings
  introVideoUrl?: string;
  introAudioUrl?: string;
  introTranscript?: string;
}

export interface Session {
  id: string;
  studentId: string;
  studentName: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  curriculum: CurriculumType;
  subject: string;
  startTime: string; // ISO UTC string
  endTime: string;   // ISO UTC string
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  meetLink?: string;
  googleEventId?: string;
  amountPaidGHS: number;
  paymentMethod: PaymentMethodType;
  transactionRef: string;
  topic?: string;
  notes?: string;
  tutorFeedback?: string;
  attendanceStatus?: 'ATTENDED' | 'LATE' | 'ABSENT';
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  curriculum: CurriculumType;
  dueDate: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  grade?: string;
  tutorName: string;
}

export interface CurriculumProgress {
  curriculum: CurriculumType;
  title: string;
  completedModules: number;
  totalModules: number;
  percentage: number;
  badges: string[];
}

export interface PastPaperResource {
  id: string;
  title: string;
  curriculum: CurriculumType;
  subject: string;
  year: number;
  examType: string; // e.g., "WASSCE Paper 2", "IGCSE Paper 4", "Montessori Assessment"
  paperType: 'Theory' | 'Objectives' | 'Practical' | 'Marking Scheme';
  questionsCount: number;
  downloadUrl: string;
  questions: {
    id: string;
    questionNumber: number;
    questionText: string;
    options?: string[];
    correctOptionIndex?: number;
    workedSolution: string;
    markingSchemePoints: string[];
  }[];
}

export interface WardReport {
  id: string;
  studentName: string;
  gradeLevel: string;
  schoolName: string;
  attendanceRate: number;
  completedClasses: number;
  gpaProgress: string;
  recentTutorFeedback: {
    tutorName: string;
    subject: string;
    date: string;
    rating: number;
    comment: string;
  }[];
  monthlyBillingGHS: number;
}

export interface DiagnosticQuestion {
  id: string;
  curriculum: CurriculumType;
  subject: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  difficulty: 'Basic' | 'Intermediate' | 'WASSCE_Standard' | 'Cambridge_Extended';
  topicTag: string;
}

export interface DiagnosticResult {
  scorePercentage: number;
  predictedGrade: string; // e.g., "A1 (Distinction)" or "B2 (Very Good)"
  confidenceScore: number;
  strengthTopics: string[];
  weaknessTopics: string[];
  recommendedTutorIds: string[];
}

export interface StudyGroupThread {
  id: string;
  authorName: string;
  authorRole: 'Student' | 'Certified Tutor' | 'Moderator';
  avatar: string;
  timestamp: string;
  title: string;
  content: string;
  attachedPaperRef?: string;
  upvotes: number;
  repliesCount: number;
  tags: string[];
}

export interface StudyGroup {
  id: string;
  name: string;
  curriculum: CurriculumType;
  subject: string;
  membersCount: number;
  description: string;
  isOfficialGroup: boolean;
  activeThreads: StudyGroupThread[];
}

export interface SmsNotificationLog {
  id: string;
  recipientPhone: string;
  recipientName: string;
  type: 'LESSON_REMINDER' | 'PAYMENT_RECEIPT' | 'DIAGNOSTIC_ALERT' | 'TUTOR_CASHOUT';
  channel: 'WHATSAPP' | 'SMS_HUBTEL';
  messageBody: string;
  timestamp: string;
  status: 'DELIVERED' | 'DISPATCHED' | 'QUEUED';
  deliveryRef: string;
}

export interface TutorPayoutRecord {
  id: string;
  date: string;
  amountGHS: number;
  payoutMethod: 'MTN_MOMO' | 'BANK_TRANSFER_GCB' | 'BANK_TRANSFER_ECOBANK';
  accountDetails: string;
  status: 'COMPLETED' | 'PROCESSING';
  taxDeductionsGHS: number;
  netPayoutGHS: number;
}

