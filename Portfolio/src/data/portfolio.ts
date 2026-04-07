export interface Skill {
  name: string;
  icon: string;
  invertDark?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const socialLinks = {
  github: "https://github.com/DhruvOzha85",
  linkedin: "https://www.linkedin.com/in/dhruv-ozha-bb378639b/",
  instagram: "https://www.instagram.com/dhruv.ozha/",
  youtube: "https://www.youtube.com/@DhruvOzha",
  leetcode: "https://leetcode.com/u/DhruvOzha/",
  email: "ozhadhruv@gmail.com",
  twitter: "https://x.com/dhruvozha85",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    ],
  },
  {
    title: "Databases & Backend",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "REST APIs", icon: "https://cdn.simpleicons.org/swagger" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertDark: true },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invertDark: true },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invertDark: true },
      { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
      { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertDark: true },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Notion", icon: "https://cdn.simpleicons.org/notion", invertDark: true },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
    ],
  },
  {
    title: "Specialized",
    skills: [
      { name: "3D Web Environments", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", invertDark: true },
      { name: "UI/UX Interactive Design", icon: "https://cdn.simpleicons.org/framer/0055FF" },
    ],
  },
];

export const interests = [
  { name: "Coding", icon: "💻" },
  { name: "Gaming", icon: "🎮" },
  { name: "Video Editing", icon: "🎬" },
  { name: "Chess", icon: "♟️" },
];

export const projects = [
  {
    id: 1,
    title: "Web Clone Project",
    description: "A pixel-perfect clone of a popular website showcasing frontend development skills with responsive design and modern CSS techniques.",
    image: "/image.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://clonewebsite-one.vercel.app/",
    githubUrl: "https://github.com/DhruvOzha85/Clone_Website",
    featured: true,
  },
  {
    id: 2,
    title: "CropPilot",
    description: "A smart crop decision engine that helps Indian farmers choose the best crops using real-time weather data, budget analysis, and a 6-factor scoring algorithm.",
    image: "/croppilot.png",
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl: "https://croppilot-su.vercel.app/",
    githubUrl: "https://github.com/DhruvOzha85/SU_Hack",
    featured: true,
  },
  {
    id: 3,
    title: "AI Adaptive Onboarding Engine",
    description: "An AI-powered platform that analyzes resumes, matches job requirements, detects skill gaps, and generates personalized onboarding roadmaps.",
    image: "/onboarding.png",
    techStack: ["React", "FastAPI", "Tailwind CSS"],
    liveUrl: "https://iisc-hack.vercel.app/",
    githubUrl: "https://github.com/DhruvOzha85/IISC_HACK",
    featured: true,
  },
  {
    id: 4,
    title: "PinIndia",
    description: "A full-stack Indian PIN code explorer that lets you instantly search any 6-digit postal code, browse pincodes by state/district/taluk, view live stats through interactive charts, calculate distances between pincodes, and export data as CSV.",
    image: "/pinindia.png",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://pin-india.vercel.app/",
    githubUrl: "https://github.com/DhruvOzha85/PinIndia",
    featured: true,
  },
];

export const certificates = [
  {
    id: 1,
    title: "SU_HACKATHON - 2026",
    issuer: "Sangam University",
    description: "Secured III position by developing the CropPilot website for Innovation and Technological Advancement.",
    date: "15 March, 2026",
    url: "https://res.cloudinary.com/dyahoqmz5/image/upload/v1774419414/SU_Hackathon_gqgfzn.jpg",
  },
  {
    id: 2,
    title: "ArtPark_CodeForge_Hackathon",
    issuer: "Indian Institute of Science (IISc), Bangalore",
    description: "Participation in the Prototype Development Round of the ArtPark CodeForge Hackathon.",
    date: "1 April, 2026",
    url: "https://res.cloudinary.com/dyahoqmz5/image/upload/v1775024770/ArtPark_CodeForge_Hackathon_jxzl0t.png",
  },
  {
    id: 3,
    title: "Solution Architecture Job Simulation",
    issuer: "aws-Forage",
    description: "Cloud architecture and design principles for scalable applications.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/aws_b0q1nf.png",
  },
  {
    id: 4,
    title: "be10X - AI Tools Workshop Bootcamp",
    issuer: "be10X",
    description: "Hands-on experience with popular AI tools and their applications in software development.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378458/be10X_m0i8ux.png",
  },
  {
    id: 5,
    title: "Front-End Software Engineering Job Simulation",
    issuer: "Skyscanner-Forage",
    description: "Building responsive user interfaces and implementing frontend best practices.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/Skyscanner_lwosws.png",
  },
  {
    id: 6,
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart-Forage",
    description: "Advanced software development concepts, including design patterns and system architecture.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/Walmart_i1wslf.png",
  },
  {
    id: 7,
    title: "Software Engineering Job Simulation",
    issuer: "Wells Fargo-Forage",
    description: "Comprehensive software engineering principles, including coding, testing, and deployment.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/Wells_Fargo_kctplx.png",
  },
  {
    id: 8,
    title: "Comming Soon",
    issuer: "Comming Soon",
    description: "Stay tuned for upcoming certifications that will enhance my skills and knowledge.",
    date: "2026",
    url: "#",
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
