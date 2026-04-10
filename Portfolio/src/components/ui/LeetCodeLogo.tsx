import { cn } from "@/lib/utils";

export function LeetCodeLogo({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-5 w-5", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>LeetCode</title>
      <path d="M16.105 18.567l.01-.007 3.333-3.048c.515-.472.518-1.24.004-1.714l-8.627-7.962a1.18 1.18 0 00-1.6 0l-1.233 1.139a1.18 1.18 0 000 1.637l7.567 6.985a.443.443 0 010 .665l-2.903 2.67a.443.443 0 01-.611 0l-7.567-6.985a1.18 1.18 0 00-1.6 0l-1.233 1.139a1.18 1.18 0 000 1.636l8.627 7.962a1.18 1.18 0 001.6 0l3.733-3.433zM21.574 13.91l-10.898.016a1.18 1.18 0 00-1.18 1.18l.004 1.68a1.18 1.18 0 001.18 1.18l10.898-.016a1.18 1.18 0 001.18-1.18l-.004-1.68a1.18 1.18 0 00-1.18-1.18z" />
    </svg>
  );
}
