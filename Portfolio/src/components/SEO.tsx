import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
}

export function SEO({ title, description }: SEOProps) {
  const { pathname } = useLocation();
  
  // Default values
  const defaultTitle = "Dhruv Ozha | Full Stack Developer & React Specialist";
  const defaultDescription = "Portfolio of Dhruv Ozha, a Full Stack Developer specialized in building premium React applications, 3D experiences, and scalable web solutions.";
  const siteUrl = "https://dhruvozha-portfolio.vercel.app"; // Updated to actual deployed URL

  // Map paths to user-friendly names for the title
  const pathTitles: Record<string, string> = {
    "/": "Home",
    "/about": "About Me",
    "/skills": "Technical Skills",
    "/achievements": "Achievements & Awards",
    "/projects": "Featured projects",
    "/certificates": "Certifications",
    "/contact": "Get in Touch",
  };

  const currentPathTitle = pathTitles[pathname] || "";
  const finalTitle = currentPathTitle && currentPathTitle !== "Home" 
    ? `${currentPathTitle} | Dhruv Ozha` 
    : defaultTitle;
  
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}${pathname}`} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${siteUrl}${pathname}`} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />

      {/* Canonical */}
      <link rel="canonical" href={`${siteUrl}${pathname}`} />
    </Helmet>
  );
}
