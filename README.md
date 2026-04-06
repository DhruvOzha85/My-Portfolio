# 🚀 Advanced 3D Portfolio Experience

A state-of-the-art, immersive portfolio website built with **React**, **Three.js**, and **Framer Motion**. This project features 3D physics-based interactions, real-time data visualization, and an AI-powered voice assistant.

### 🌐 Live Demo
**[https://dhruvozha-portfolio.vercel.app/](https://dhruvozha-portfolio.vercel.app/)**

---

## ✨ Key Features

- **🎮 Arcade Mode**: Physics-based, gamified interactions using **Matter.js** for an engaging user experience.
- **🎙️ Voice Assistant**: An integrated AI-powered voice assistant that guides users through the portfolio.
- **📊 LeetCode Integration**: Dynamic data visualization of LeetCode stats using **Recharts** and real-time heatmaps.
- **🏗️ 3D Resume Assembly**: A unique, cinematic animation sequence that "assembles" the resume in 3D space.
- **💧 Liquid Transitions**: Smooth, high-performance page transitions using **Framer Motion** and **GSAP**.
- **🃏 Holographic Cards**: Modern, glassmorphism-inspired UI components with interactive hover effects.
- **🌗 Theme Picker**: A vibrant, customizable UI with multiple high-quality color themes.

---

## 🛠️ Tech Stack

### **Frontend & Core**
- **Framework**: [React 18](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest)

### **Animation & Graphics**
- **3D Rendering**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Physics**: [Matter.js](https://brm.io/matter-js/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)

### **Backend & Services**
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Contact Form**: [EmailJS](https://www.emailjs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```bash
/src
  /components
    /sections       # Individual page segments (Hero, LeetCode, Resume, etc.)
    /ui             # Shadcn-based UI components
    - ArcadeMode.tsx     # Physics-based interaction layer
    - Background3D.tsx   # Three.js global background
    - VoiceAssistant.tsx # AI-powered voice interaction
  /data             # Static content and resume data
  /integrations     # Supabase client and service initializations
  /lib              # Utility functions and shared helpers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DhruvOzha85/My-Portfolio.git
   cd My-Portfolio/Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `Portfolio` directory and add your Supabase and EmailJS keys:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_EMAILJS_SERVICE_ID=your_id
   VITE_EMAILJS_TEMPLATE_ID=your_id
   VITE_EMAILJS_PUBLIC_KEY=your_id
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by [Dhruv Ozha](https://github.com/DhruvOzha85)**