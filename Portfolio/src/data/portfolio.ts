export interface Skill {
  name: string;
  count?: number;
  icon: string;
  description: string;
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
  resume: "https://drive.google.com/file/d/1zC7YZAFqyQJCz9qWp4dKX0CzCLZOXSqy/view?usp=sharing",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", description: "Mastery in ES6+, asynchronous programming, and DOM manipulation." },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Strong type-safety, interfaces, and advanced generics for robust code." },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", description: "Deep understanding of memory management, STL, and OOP principles." },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", description: "Foundational knowledge in system-level programming and data structures." },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Expertise in Hooks, Context API, and building high-performance SPAs." },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "Building scalable backend services and RESTful APIs with performance." },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", description: "Crafting beautiful, responsive UIs with utility-first CSS speed." },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", description: "Semantic structure and modern web standards for accessibility." },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", description: "Modern layouts with Flexbox, Grid, and smooth CSS animations." },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", description: "Predictable state management for complex React applications." },
    ],
  },
  {
    title: "Databases & Backend",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", description: "NoSQL DB management with complex aggregations and indexing." },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", description: "Leveraging real-time databases and authentication for speed." },
      { name: "REST APIs", icon: "https://cdn.simpleicons.org/swagger", description: "Designing and consuming secure, well-documented API endpoints." },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invertDark: true, description: "Middleware-driven backend architecture for fast web apps." },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", invertDark: true, description: "Deploying and scaling applications using EC2, S3, and Lambda." },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", description: "Utilizing cloud functions and storage for global scalability." },

      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invertDark: true, description: "Optimized deployment pipelines for frontend speed and reliability." },
      { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", description: "Seamless CI/CD workflows for modern static and dynamic sites." },

      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", description: "Advanced version control with rebasing, branching, and merging." },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invertDark: true, description: "Collaborative development and managing large open-source projects." },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/46E3B7", description: "Cloud platform for building and running apps with ease." },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", description: "Thorough API testing and documentation for seamless integration." },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", description: "Translating high-fidelity designs into pixel-perfect frontend code." },
      { name: "Notion", icon: "https://cdn.simpleicons.org/notion", invertDark: true, description: "Efficient project management and documentation for tech teams." },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", description: "Optimized development environment with custom workflows." },
      { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", description: "Managing complex package dependencies and custom scripts." },
    ],
  },
  {
    title: "Specialized",
    skills: [

      { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", description: "Creating high-performance 3D graphics and immersive animations in the browser.", invertDark: true },
    ],
  },
];

export const interests = [
  { name: "Coding", icon: "💻" },
  { name: "Gaming", icon: "🎮" },
  { name: "Video Editing", icon: "🎬" },
  { name: "Chess", icon: "♟️" },
];

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  youtubeUrl?: string; // New field for video demos
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Honda Clone",
    description: "A high-fidelity landing page clone of Honda's official site, featuring smooth GSAP animations, a responsive product showcase, and premium typography.",
    image: "/honda_mockup.png",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "https://clonehonda.netlify.app/",
    githubUrl: "https://github.com/DhruvOzha85/Honda_Clone",
    youtubeUrl: "https://youtu.be/gwQ3pjXZNGE?si=Z6cjNDYtRF3riCI4",
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
  {
    id: 5,
    title: "Logitech Clone",
    description: "A sleek, interactive clone of the Logitech homepage, highlighting precise animations and a modern consumer electronics aesthetic.",
    image: "/logitech_mockup.png",
    techStack: ["HTML", "CSS", "JavaScript", "ScrollTrigger"],
    liveUrl: "https://clonelogitech.netlify.app/",
    githubUrl: "https://github.com/DhruvOzha85/Logitech_Clone/tree/master",
    youtubeUrl: "https://youtu.be/ZnkePykHz5A?si=A15m3JFgmUbdHBHJ",
    featured: true,
  },
  {
    id: 6,
    title: "Photoroom Clone",
    description: "A pixel-perfect recreation of the Photoroom landing page, focusing on clean layouts, high-quality image processing UI, and fluid transitions.",
    image: "/photoroom_mockup.png",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "https://clonephotoroom.netlify.app/",
    githubUrl: "https://github.com/DhruvOzha85/Photoroom_Clone",
    youtubeUrl: "https://youtu.be/SobzlUf4YYs?si=NCzV0kiCktNxD8KB",
    featured: true,
  },
  {
    id: 7,
    title: "Stacks Clone",
    description: "A contemporary design clone for Stacks, showcasing modern typography, complex grid layouts, and interactive component states.",
    image: "/stacks_mockup.png",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "https://clonestacks.netlify.app/",
    githubUrl: "https://github.com/DhruvOzha85/Stacks_Clone/tree/master",
    youtubeUrl: "https://youtu.be/ZqdwV_ah_Lk?si=kPCDNDe_LL0HU3fy",
    featured: true,
  },
  {
    id: 8,
    title: "The Farmer Dog Clone",
    description: "A vibrant and brand-accurate clone of The Farmer's Dog, featuring engaging storytelling through scroll-based animations and clean UI.",
    image: "/farmerdog_mockup.png",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "https://clonethefarmerdog.netlify.app/",
    githubUrl: "https://github.com/DhruvOzha85/TheFarmerDog_Clone",
    youtubeUrl: "https://youtu.be/I770RKE69IQ?si=Cht4uL8Pbxh_f7WX",
    featured: true,
  },
  {
    id: 9,
    title: "Zepto Clone",
    description: "A high-performance clone of the Zepto delivery platform UI, optimized for quick navigation and a mobile-first commercial experience.",
    image: "/zepto_mockup.png",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    liveUrl: "https://clone-zepto.netlify.app/",
    githubUrl: "https://github.com/DhruvOzha85/Zepto_Clone/tree/master",
    youtubeUrl: "https://youtu.be/01tgMMf891Q?si=ysIizkspTnXRBh5b",
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
    url: "https://res.cloudinary.com/dyahoqmz5/image/upload/v1774419414/SU_HACKATHON_gqgfzn.jpg",
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
    title: "Fortune '26 - FinWiz",
    issuer: "ASSETS, Delhi Technological University",
    description: "Participation in the FinWiz competition organized by ASSETS at Delhi Technological University.",
    date: "6-7 April, 2026",
    url: "https://res.cloudinary.com/dyahoqmz5/image/upload/v1776231166/Fortune_26_b1wdag.png",
  },
  {
    id: 4,
    title: "Solution Architecture Job Simulation",
    issuer: "aws-Forage",
    description: "Cloud architecture and design principles for scalable applications.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/aws_b0q1nf.png",
  },
  {
    id: 5,
    title: "be10X - AI Tools Workshop Bootcamp",
    issuer: "be10X",
    description: "Hands-on experience with popular AI tools and their applications in software development.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378458/be10X_m0i8ux.png",
  },
  {
    id: 6,
    title: "Front-End Software Engineering Job Simulation",
    issuer: "Skyscanner-Forage",
    description: "Building responsive user interfaces and implementing frontend best practices.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/Skyscanner_lwosws.png",
  },
  {
    id: 7,
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart-Forage",
    description: "Advanced software development concepts, including design patterns and system architecture.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/Walmart_i1wslf.png",
  },
  {
    id: 8,
    title: "Software Engineering Job Simulation",
    issuer: "Wells Fargo-Forage",
    description: "Comprehensive software engineering principles, including coding, testing, and deployment.",
    date: "2026",
    url: "https://res.cloudinary.com/dd80on9gu/image/upload/v1770378457/Wells_Fargo_kctplx.png",
  },
];

export interface FigmaDesign {
  id: number;
  title: string;
  description: string;
  image: string;
  figmaUrl: string;
  category: string;
}

export const figmaDesigns: FigmaDesign[] = [
  {
    id: 1,
    title: "Portfolio Prototype",
    description: "The architectural blueprint and visual design system for high-performance portfolio environments.",
    image: "/Figma2.png",
    figmaUrl: "https://www.figma.com/design/bgSrRdEZSc0gkymmpwo2N0/Portfolio?node-id=0-1&t=bl4ZGdKXpatRGcFg-1",
    category: "Product Design"
  },
  {
    id: 2,
    title: "Modular Interface 1",
    description: "Exploration of modular grid systems and atomic design principles for scalable web interfaces.",
    image: "/Figma4.png",
    figmaUrl: "https://www.figma.com/design/0rMQgd2GQ8CWuFVhsTzVYf/Untitled?node-id=0-1&t=N3vXOrm4xzc5KykG-1",
    category: "UI Exploration"
  },
  {
    id: 3,
    title: "Modular Interface 2",
    description: "Iterative testing of user flows and navigation patterns in modern responsive web environments.",
    image: "/Figma3.png",
    figmaUrl: "https://www.figma.com/design/mSQ0A2pefx1nsIySbRnhzk/Untitled?node-id=0-1&t=YFs3JK3rEF80glRN-1",
    category: "UX Research"
  },
  {
    id: 4,
    title: "Assignment S",
    description: "A comprehensive UI exploration focused on layout hierarchy and component architecture for semi-complex information systems.",
    image: "/Figma1.png",
    figmaUrl: "https://www.figma.com/design/ud9WMRtPRi3REDVcDuSxXC/Assigment-s?node-id=0-1&t=6K9Ddjx5Vpmjhpqk-1",
    category: "Academic Assessment"
  },
  {
    id: 5,
    title: "SU Semester 1 Assignment",
    description: "Foundational UI/UX projects completed during the first semester, focusing on accessibility and usability standards.",
    image: "/Figma5.png",
    figmaUrl: "https://www.figma.com/design/I0oRvwSWnh3O3DmrjPssMe/Assignment-SU-Sem1?node-id=0-1&t=wjR0kilCj0wEip5v-1",
    category: "Semester Project"
  }
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Achievements", href: "/achievements" },
  { label: "Designs", href: "/designs" },
  { label: "Projects", href: "/projects" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];
