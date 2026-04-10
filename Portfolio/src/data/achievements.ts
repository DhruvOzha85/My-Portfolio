export interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
  avatar?: string;
}

export interface Achievement {
  id: number;
  title: string;
  event: string;
  date: string;
  location: string;
  position: string;
  isLatest?: boolean;
  projectDescription: string;
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    devpost?: string;
  };
  photos: string[];
  detailedInfo?: {
    challenge: string;
    solution: string;
    impact: string;
  };
  team: TeamMember[];
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Won 3rd Place — SU_HACKATHON,2026",
    event: "SU_HACKATHON,2026",
    date: "14-15 March 2026",
    location: "Sangam University, Bhilwara, Rajasthan",
    position: "Runner-up 🥉",
    isLatest: true,
    projectDescription: "Developed CropPilot, a smart crop decision engine designed for Indian farmers. The platform uses real-time weather data and budget analysis to recommend optimal crops, helping farmers improve yield and sustainability. Implemented a unique 6-factor scoring algorithm to provide clear, data-driven insights.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    links: {
      github: "https://github.com/DhruvOzha85/SU_Hack",
      demo: "https://croppilot-su.vercel.app/"
    },
    photos: [
      "/Su2.jpg",
      "/Su4.jpg",
      "/Su3.jpg",
      "/Su5.jpg"
    ],
    detailedInfo: {
      challenge: "Indian farmers often struggle with crop selection due to unpredictable weather and local market volatility, leading to poor yields and financial instability.",
      solution: "Developed an intelligent engine that aggregates 6 critical variables—Budget, Soil Type, Market Price, Rainfall, Temperature, and Season—to provide real-time, data-backed crop recommendations.",
      impact: "Empowers small-scale farmers with enterprise-grade analytics, potentially increasing seasonal profitability by 25-30% through optimized resource allocation."
    },
    team: [
      { name: "Dhruv Ozha", role: "Git & Github", linkedin: "https://www.linkedin.com/in/dhruv-ozha-bb378639b/" },
      { name: "Ritesh Gabale", role: "Frontend Dev", linkedin: "https://www.linkedin.com/in/ritesh-gabale-59a2b5365/" },
      { name: "Maharshi Patel", role: "UI/UX Designer", linkedin: "https://www.linkedin.com/in/maharshi-patel-1b08b0395/?skipRedirect=true" },
      { name: "Mahi Patel", role: "Backend Dev", linkedin: "https://www.linkedin.com/in/mahi-patel-1663b8367/" }
    ]
  }
];
