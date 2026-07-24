import { TutorProfile, Session, Assignment, CurriculumProgress, User, PastPaperResource, WardReport } from '../types';

export const mockUsers: Record<string, User> = {
  student: {
    id: 'user_std_01',
    name: 'Kofi Kwakye',
    email: 'kofi.kwakye@gmail.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timezone: 'Africa/Accra',
    phone: '+233 24 123 4567',
  },
  tutor: {
    id: 'user_tut_01',
    name: 'Dr. Abena Osei-Mensah',
    email: 'abena.osei@nexusacademy.com',
    role: 'tutor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    timezone: 'Africa/Accra',
    phone: '+233 20 987 6543',
  },
  parent: {
    id: 'user_prt_01',
    name: 'Mr. Emmanuel Kwakye',
    email: 'emmanuel.kwakye@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    timezone: 'Africa/Accra',
    phone: '+233 24 998 8776',
  },
  admin: {
    id: 'user_adm_01',
    name: 'Ebenezer Addo (Admin)',
    email: 'admin@nexusacademy.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timezone: 'Africa/Accra',
  }
};

export const mockTutors: TutorProfile[] = [
  {
    id: 'tut_01',
    userId: 'user_tut_01',
    name: 'Dr. Abena Osei-Mensah',
    email: 'abena.osei@nexusacademy.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    headline: 'Senior Mathematics & Physics Specialist | Cambridge & GES NaCCA Examiner',
    bio: 'PhD in Applied Mathematics with over 12 years teaching experience in top international academies across Accra & London. Specialized in Cambridge IGCSE, A-Levels, and GES SHS Core & Elective Mathematics.',
    curricula: ['GES', 'CAMBRIDGE'],
    subjects: ['Core Mathematics', 'Elective Mathematics', 'Physics', 'IGCSE Additional Maths'],
    hourlyRateGHS: 280,
    hourlyRateUSD: 22,
    rating: 4.95,
    reviewsCount: 84,
    isVerified: true,
    verificationBadge: 'GES Licensed #GES-2018-9943 & Cambridge CIE Master Trainer',
    location: 'Accra, Ghana (GMT)',
    languages: ['English', 'Twi'],
    googleCalendarConnected: true,
    availableSlots: [
      new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    ],
    introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-female-teacher-speaking-in-a-classroom-41315-large.mp4',
    introAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    introTranscript: "Akwaaba and welcome! I am Dr. Abena Osei-Mensah. My teaching methodology focuses on demystifying complex WASSCE and Cambridge IGCSE Calculus by grounding abstract equations into real-world engineering concepts. I look forward to guiding you to grade A1 distinction!"
  },
  {
    id: 'tut_02',
    userId: 'user_tut_02',
    name: 'Kwame Mensah-Bonsu',
    email: 'kwame.mb@nexusacademy.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    headline: 'Montessori Early Education Specialist & GES Basic Curriculum Pioneer',
    bio: 'Certified AMI Montessori Educator (3-12 years) and NaCCA Standards Expert. Helping young learners build deep logical intuition, phonics mastery, and creative problem-solving.',
    curricula: ['MONTESSORI', 'GES'],
    subjects: ['Montessori Literacy & Math', 'GES Basic Science', 'Social Studies', 'ICT Basics'],
    hourlyRateGHS: 220,
    hourlyRateUSD: 18,
    rating: 4.88,
    reviewsCount: 62,
    isVerified: true,
    verificationBadge: 'AMI Montessori Diploma & NaCCA Certified Basic Educator',
    location: 'Kumasi, Ghana (GMT)',
    languages: ['English', 'Asante Twi', 'Fante'],
    googleCalendarConnected: true,
    availableSlots: [
      new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
      new Date(Date.now() + 28 * 3600 * 1000).toISOString(),
    ],
    introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-teacher-reading-a-book-to-her-students-41318-large.mp4',
    introAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    introTranscript: "Hello parents and young scholars! I specialize in tactile Montessori learning materials that ignite curiosity and mathematical confidence in children aged 3 to 12."
  },
  {
    id: 'tut_03',
    userId: 'user_tut_03',
    name: 'Sarah Jenkins-Agyeman',
    email: 'sarah.j@nexusacademy.com',
    avatar: 'https://images.unsplash.com/photo-1580894732468-912f3089606d?w=300&auto=format&fit=crop&q=80',
    headline: 'Cambridge Lower Secondary & IGCSE English Literature Specialist',
    bio: 'Former head of English at Tema International School. Experienced in helping students excel in Cambridge Checkpoint, IGCSE English Language & Literature, and critical essay writing.',
    curricula: ['CAMBRIDGE'],
    subjects: ['IGCSE English Language', 'English Literature', 'Creative Writing', 'IELTS Prep'],
    hourlyRateGHS: 310,
    hourlyRateUSD: 25,
    rating: 4.98,
    reviewsCount: 112,
    isVerified: true,
    verificationBadge: 'Cambridge Assessment International Certified Educator',
    location: 'Accra, Ghana (GMT)',
    languages: ['English', 'French'],
    googleCalendarConnected: true,
    availableSlots: [
      new Date(Date.now() + 6 * 3600 * 1000).toISOString(),
      new Date(Date.now() + 32 * 3600 * 1000).toISOString(),
    ],
    introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-explaining-something-during-a-lesson-41316-large.mp4',
    introAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    introTranscript: "Greetings! In my sessions, we transform literature into vibrant debates, mastering Shakespearean analysis and Cambridge essay marking rubrics."
  },
  {
    id: 'tut_04',
    userId: 'user_tut_04',
    name: 'Ing. Emmanuel Quaye',
    email: 'emmanuel.quaye@nexusacademy.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    headline: 'GES SHS Integrated Science, Chemistry & Robotics Educator',
    bio: 'BSc Electrical Engineering (KNUST). 8 years guiding students to top grade A1 in WASSCE Integrated Science & Chemistry. Incorporates interactive simulations.',
    curricula: ['GES', 'CAMBRIDGE'],
    subjects: ['Integrated Science', 'Chemistry', 'Computer Science & Python', 'WASSCE Prep'],
    hourlyRateGHS: 250,
    hourlyRateUSD: 20,
    rating: 4.91,
    reviewsCount: 48,
    isVerified: true,
    verificationBadge: 'GES Certified Science Specialist & WASSCE Examiner',
    location: 'Takoradi, Ghana (GMT)',
    languages: ['English', 'Ga'],
    googleCalendarConnected: true,
    availableSlots: [
      new Date(Date.now() + 14 * 3600 * 1000).toISOString(),
    ],
    introVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-giving-a-presentation-in-front-of-a-blackboard-41314-large.mp4',
    introAudioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    introTranscript: "Welcome! Science is best learned by seeing it in motion. We use 3D molecular models and virtual lab experiments to ensure WASSCE mastery."
  }
];

export const mockSessions: Session[] = [
  {
    id: 'sess_live_now',
    studentId: 'user_std_01',
    studentName: 'Kofi Kwakye',
    tutorId: 'tut_01',
    tutorName: 'Dr. Abena Osei-Mensah',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    curriculum: 'GES',
    subject: 'Elective Mathematics',
    startTime: new Date(Date.now() + 8 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 68 * 60 * 1000).toISOString(),
    status: 'SCHEDULED',
    meetLink: 'https://meet.google.com/nex-us-edu1',
    googleEventId: 'cal_event_8834921',
    amountPaidGHS: 280,
    paymentMethod: 'MTN_MOMO',
    transactionRef: 'PAYSTACK_REF_9920148',
    topic: 'WASSCE Calculus: Integration by Parts & Differential Equations',
    notes: 'Please review vectors and integration formulas on page 142.',
    tutorFeedback: 'Kofi demonstrated exceptional mastery in partial fractions during last session.',
    attendanceStatus: 'ATTENDED'
  },
  {
    id: 'sess_upcoming_tomorrow',
    studentId: 'user_std_01',
    studentName: 'Kofi Kwakye',
    tutorId: 'tut_03',
    tutorName: 'Sarah Jenkins-Agyeman',
    tutorAvatar: 'https://images.unsplash.com/photo-1580894732468-912f3089606d?w=150&auto=format&fit=crop&q=80',
    curriculum: 'CAMBRIDGE',
    subject: 'IGCSE English Literature',
    startTime: new Date(Date.now() + 26 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() + 27 * 3600 * 1000).toISOString(),
    status: 'SCHEDULED',
    meetLink: 'https://meet.google.com/nex-us-edu2',
    googleEventId: 'cal_event_8834922',
    amountPaidGHS: 310,
    paymentMethod: 'CARD',
    transactionRef: 'FLUTTERWAVE_REF_1049281',
    topic: 'Shakespeare Drama Analysis: Macbeth Act 3',
    notes: 'Bring essay outline draft.',
    tutorFeedback: 'Strong analytical progression in introductory paragraphs.',
    attendanceStatus: 'ATTENDED'
  },
  {
    id: 'sess_completed_prev',
    studentId: 'user_std_01',
    studentName: 'Kofi Kwakye',
    tutorId: 'tut_02',
    tutorName: 'Kwame Mensah-Bonsu',
    tutorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    curriculum: 'MONTESSORI',
    subject: 'Montessori Logic & Mathematical Thinking',
    startTime: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    endTime: new Date(Date.now() - 47 * 3600 * 1000).toISOString(),
    status: 'COMPLETED',
    meetLink: 'https://meet.google.com/nex-us-edu3',
    googleEventId: 'cal_event_8834900',
    amountPaidGHS: 220,
    paymentMethod: 'MTN_MOMO',
    transactionRef: 'PAYSTACK_REF_8819032',
    topic: 'Sensorial Math Concrete Operations & Fractions',
    notes: 'Excellent performance in spatial reasoning test.',
    tutorFeedback: 'Completed all 5 tactile bead modules ahead of schedule.',
    attendanceStatus: 'ATTENDED'
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'asgn_01',
    subject: 'Elective Mathematics',
    title: 'WASSCE Past Questions 2023 - Quadratic & Polynomial Proofs',
    curriculum: 'GES',
    dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
    status: 'PENDING',
    tutorName: 'Dr. Abena Osei-Mensah',
  },
  {
    id: 'asgn_02',
    subject: 'IGCSE English Literature',
    title: 'Critical Essay: Theme of Ambition in Macbeth',
    curriculum: 'CAMBRIDGE',
    dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString(),
    status: 'PENDING',
    tutorName: 'Sarah Jenkins-Agyeman',
  },
  {
    id: 'asgn_03',
    subject: 'Integrated Science',
    title: 'GES SHS Chemistry Worksheet: Chemical Bonding & Stoichiometry',
    curriculum: 'GES',
    dueDate: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    status: 'GRADED',
    grade: 'A1 (94%)',
    tutorName: 'Ing. Emmanuel Quaye',
  }
];

export const mockCurriculumProgress: CurriculumProgress[] = [
  {
    curriculum: 'GES',
    title: 'GES SHS WASSCE Preparation (NaCCA Standard)',
    completedModules: 18,
    totalModules: 24,
    percentage: 75,
    badges: ['WASSCE Math Master', 'GES NaCCA Honor Scholar', 'Science Excellence']
  },
  {
    curriculum: 'CAMBRIDGE',
    title: 'Cambridge IGCSE & A-Level Certificate Track',
    completedModules: 12,
    totalModules: 20,
    percentage: 60,
    badges: ['CIE Distinction Scholar', 'IGCSE Essayist']
  },
  {
    curriculum: 'MONTESSORI',
    title: 'Montessori Practical Life & Cognitive Readiness',
    completedModules: 10,
    totalModules: 10,
    percentage: 100,
    badges: ['Montessori Foundation Graduate']
  }
];

export const mockPastPapers: PastPaperResource[] = [
  {
    id: 'pp_01',
    title: '2023 WASSCE Core Mathematics Paper 2 (Theory & Practical)',
    curriculum: 'GES',
    subject: 'Core Mathematics',
    year: 2023,
    examType: 'WASSCE SHS Final Examination',
    paperType: 'Theory',
    questionsCount: 12,
    downloadUrl: '#download-wassce-math-2023',
    questions: [
      {
        id: 'q1',
        questionNumber: 1,
        questionText: 'A sequence is given by Tn = 3n^2 - 5n + 2. (a) Find the first 3 terms. (b) Find the sum of the first 10 terms using formula summation.',
        workedSolution: '(a) T1 = 3(1)^2 - 5(1) + 2 = 0. T2 = 3(4) - 10 + 2 = 4. T3 = 3(9) - 15 + 2 = 14. (b) Σ(3n^2 - 5n + 2) = 3[n(n+1)(2n+1)/6] - 5[n(n+1)/2] + 2n = 1155 - 275 + 20 = 900.',
        markingSchemePoints: [
          'Correct substitution into Tn formula: 1 mark',
          'T1=0, T2=4, T3=14 calculation: 2 marks',
          'Summation formula expansion: 3 marks',
          'Final sum = 900: 2 marks'
        ]
      },
      {
        id: 'q2',
        questionNumber: 2,
        questionText: 'Given the curve y = 2x^3 - 9x^2 + 12x + 1, determine: (i) The stationary points, (ii) The nature of each stationary point.',
        workedSolution: 'dy/dx = 6x^2 - 18x + 12 = 6(x - 1)(x - 2). Stationary points at x = 1 (y = 6) and x = 2 (y = 5). d^2y/dx^2 = 12x - 18. At x=1, d^2y/dx^2 = -6 (<0, Maximum). At x=2, d^2y/dx^2 = 6 (>0, Minimum).',
        markingSchemePoints: [
          'Derivative calculation dy/dx = 6x^2 - 18x + 12: 2 marks',
          'Setting dy/dx = 0 and solving x = 1, x = 2: 2 marks',
          'Evaluating y-coordinates (1, 6) and (2, 5): 2 marks',
          'Second derivative test for max/min nature: 2 marks'
        ]
      }
    ]
  },
  {
    id: 'pp_02',
    title: '2024 Cambridge IGCSE Physics Paper 4 (Extended Theory)',
    curriculum: 'CAMBRIDGE',
    subject: 'Physics',
    year: 2024,
    examType: 'Cambridge IGCSE 0625',
    paperType: 'Theory',
    questionsCount: 10,
    downloadUrl: '#download-igcse-physics-2024',
    questions: [
      {
        id: 'q_ig_1',
        questionNumber: 1,
        questionText: 'A car of mass 1200 kg accelerates uniformly from rest to a speed of 25 m/s in a time of 8.0 s. Calculate: (a) The acceleration, (b) The resultant force, (c) The work done.',
        workedSolution: '(a) a = (v - u)/t = (25 - 0)/8.0 = 3.125 m/s^2. (b) F = ma = 1200 × 3.125 = 3750 N. (c) Work = ΔEk = 0.5 × m × v^2 = 0.5 × 1200 × 25^2 = 375,000 J = 375 kJ.',
        markingSchemePoints: [
          'a = 3.13 m/s^2 with correct units: 2 marks',
          'F = 3750 N with unit N: 2 marks',
          'Work done = 375 kJ or 3.75 × 10^5 J: 2 marks'
        ]
      }
    ]
  },
  {
    id: 'pp_03',
    title: 'AMI Montessori Sensory Math & Spatial Logic Assessment',
    curriculum: 'MONTESSORI',
    subject: 'Montessori Literacy & Math',
    year: 2023,
    examType: 'AMI Foundation Evaluation',
    paperType: 'Practical',
    questionsCount: 8,
    downloadUrl: '#download-montessori-2023',
    questions: [
      {
        id: 'q_mon_1',
        questionNumber: 1,
        questionText: 'Golden Bead Material Operation: Demonstrate addition of 3,421 and 2,156 using place-value cards and unit beads.',
        workedSolution: 'Combine Units: 1 + 6 = 7. Tens: 20 + 50 = 70. Hundreds: 400 + 100 = 500. Thousands: 3,000 + 2,000 = 5,000. Total = 5,577.',
        markingSchemePoints: [
          'Correct unit bead grouping: 2 marks',
          'Tens and Hundreds card alignment: 2 marks',
          'Final sum verification: 2 marks'
        ]
      }
    ]
  }
];

export const mockWardReports: WardReport[] = [
  {
    id: 'ward_01',
    studentName: 'Kofi Kwakye',
    gradeLevel: 'GES SHS 2 (Science Track)',
    schoolName: 'Presbyterian Boys\' Secondary School (Presec - Legon)',
    attendanceRate: 98,
    completedClasses: 24,
    gpaProgress: 'A1 (3.92 / 4.0)',
    recentTutorFeedback: [
      {
        tutorName: 'Dr. Abena Osei-Mensah',
        subject: 'Elective Mathematics',
        date: '2026-07-22',
        rating: 5,
        comment: 'Kofi demonstrated exceptional mastery in partial fractions and differential calculus. Very attentive!'
      },
      {
        tutorName: 'Ing. Emmanuel Quaye',
        subject: 'Integrated Science',
        date: '2026-07-18',
        rating: 5,
        comment: 'Outstanding score in Stoichiometry test (94%). Ready for WASSCE mock prep.'
      }
    ],
    monthlyBillingGHS: 1020
  },
  {
    id: 'ward_02',
    studentName: 'Ama Kwakye',
    gradeLevel: 'Cambridge Lower Secondary (Grade 8)',
    schoolName: 'Lincoln Community School (Accra)',
    attendanceRate: 95,
    completedClasses: 18,
    gpaProgress: 'A* Distinction',
    recentTutorFeedback: [
      {
        tutorName: 'Sarah Jenkins-Agyeman',
        subject: 'IGCSE English Literature',
        date: '2026-07-20',
        rating: 5,
        comment: 'Ama wrote a brilliant critical commentary on Shakespearean metaphors in Macbeth.'
      }
    ],
    monthlyBillingGHS: 930
  }
];

export const mockDiagnosticQuestions: any[] = [
  {
    id: 'diag_01',
    curriculum: 'GES',
    subject: 'Elective Mathematics',
    questionText: 'Evaluate the derivative dy/dx for y = (3x^2 + 2x)^4 at x = 1.',
    options: ['320', '160', '80', '640'],
    correctIndex: 0,
    difficulty: 'WASSCE_Standard',
    topicTag: 'Calculus & Chain Rule'
  },
  {
    id: 'diag_02',
    curriculum: 'GES',
    subject: 'Core Mathematics',
    questionText: 'If log10(x) + log10(x - 3) = 1, solve for x.',
    options: ['x = 5', 'x = 2', 'x = 10', 'x = -2'],
    correctIndex: 0,
    difficulty: 'Intermediate',
    topicTag: 'Logarithms & Indices'
  },
  {
    id: 'diag_03',
    curriculum: 'CAMBRIDGE',
    subject: 'Physics',
    questionText: 'A photon has a frequency of 6.0 × 10^14 Hz. Calculate its energy using Planck\'s constant (h = 6.63 × 10^-34 J s).',
    options: ['3.98 × 10^-19 J', '1.11 × 10^-48 J', '4.20 × 10^-20 J', '2.50 × 10^-18 J'],
    correctIndex: 0,
    difficulty: 'Cambridge_Extended',
    topicTag: 'Quantum Physics & Energy'
  },
  {
    id: 'diag_04',
    curriculum: 'GES',
    subject: 'Integrated Science',
    questionText: 'Calculate the molarity of a solution prepared by dissolving 10g of NaOH (Molar mass = 40g/mol) in 250 cm^3 of distilled water.',
    options: ['1.0 M', '0.25 M', '2.0 M', '0.5 M'],
    correctIndex: 0,
    difficulty: 'WASSCE_Standard',
    topicTag: 'Stoichiometry & Molarity'
  }
];

export const mockStudyGroups: any[] = [
  {
    id: 'sg_01',
    name: 'WASSCE 2026 Elective Math Distinction Squad',
    curriculum: 'GES',
    subject: 'Elective Mathematics',
    membersCount: 142,
    description: 'Peer study group for SHS 2 & 3 students preparing for WAEC Elective Mathematics. Daily past paper problem solving.',
    isOfficialGroup: true,
    activeThreads: [
      {
        id: 'th_01',
        authorName: 'Kofi Kwakye',
        authorRole: 'Student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        timestamp: '2 hours ago',
        title: 'Trigonometric Identities WASSCE 2022 Question 8 Proof help',
        content: 'Can someone walk me through proving sin(3θ) = 3sin(θ) - 4sin^3(θ) using compound angle formulas?',
        attachedPaperRef: '2022 WASSCE Elective Math Paper 2',
        upvotes: 18,
        repliesCount: 6,
        tags: ['Trigonometry', 'WASSCE2022', 'Proof']
      },
      {
        id: 'th_02',
        authorName: 'Dr. Abena Osei-Mensah',
        authorRole: 'Certified Tutor',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        timestamp: '5 hours ago',
        title: 'Weekly Marking Scheme Breakdown: Integration by Parts',
        content: 'I have uploaded the step-by-step WAEC examiner marking scheme for integration of x*e^(2x). Remember the +C constant!',
        upvotes: 42,
        repliesCount: 12,
        tags: ['Calculus', 'MarkingScheme', 'ExaminerTips']
      }
    ]
  },
  {
    id: 'sg_02',
    name: 'Cambridge IGCSE Physics & Add Maths Network',
    curriculum: 'CAMBRIDGE',
    subject: 'Physics',
    membersCount: 89,
    description: 'Collaborative forum for Cambridge Checkpoint & IGCSE Physics (0625) & Additional Mathematics.',
    isOfficialGroup: true,
    activeThreads: [
      {
        id: 'th_03',
        authorName: 'Sarah Jenkins-Agyeman',
        authorRole: 'Certified Tutor',
        avatar: 'https://images.unsplash.com/photo-1580894732468-912f3089606d?w=150&auto=format&fit=crop&q=80',
        timestamp: '1 day ago',
        title: 'Cambridge Paper 4 Thermal Physics Formula Cheat-Sheet',
        content: 'Review specific heat capacity q=mcΔT vs latent heat q=mL for upcoming paper 4 theory mocks.',
        upvotes: 29,
        repliesCount: 4,
        tags: ['IGCSE', 'Physics0625', 'ThermalPhysics']
      }
    ]
  }
];

export const mockSmsLogs: any[] = [
  {
    id: 'sms_991',
    recipientPhone: '+233 24 123 4567',
    recipientName: 'Kofi Kwakye',
    type: 'LESSON_REMINDER',
    channel: 'WHATSAPP',
    messageBody: 'Nexus Academy: Your live Google Meet class in Elective Mathematics with Dr. Abena Osei-Mensah starts in 10 minutes. Click to join: https://meet.google.com/nex-us-edu1',
    timestamp: '2026-07-24 14:20 GMT',
    status: 'DELIVERED',
    deliveryRef: 'HUBTEL_WA_981204'
  },
  {
    id: 'sms_992',
    recipientPhone: '+233 24 998 8776',
    recipientName: 'Mr. Emmanuel Kwakye (Guardian)',
    type: 'PAYMENT_RECEIPT',
    channel: 'SMS_HUBTEL',
    messageBody: 'Nexus Payment Confirmed: GH₵280.00 received via MTN MoMo for Kofi Kwakye tutoring session (Ref: PAYSTACK_REF_9920148). Receipt downloaded to Guardian Portal.',
    timestamp: '2026-07-24 12:15 GMT',
    status: 'DELIVERED',
    deliveryRef: 'HUBTEL_SMS_771902'
  }
];

export const mockTutorPayouts: any[] = [
  {
    id: 'po_01',
    date: '2026-07-20',
    amountGHS: 2400,
    payoutMethod: 'MTN_MOMO',
    accountDetails: '020 987 6543 (MTN MoMo - Dr. Abena Osei-Mensah)',
    status: 'COMPLETED',
    taxDeductionsGHS: 120,
    netPayoutGHS: 2280
  },
  {
    id: 'po_02',
    date: '2026-07-05',
    amountGHS: 1850,
    payoutMethod: 'BANK_TRANSFER_GCB',
    accountDetails: 'GCB Bank - High Street Accra #102948102',
    status: 'COMPLETED',
    taxDeductionsGHS: 92.50,
    netPayoutGHS: 1757.50
  }
];

