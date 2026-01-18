import React from "react";

export const Footer = () => {
  return (
    <footer className="py-6 mt-auto border-t border-border/40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
        <p className="flex items-center gap-1">
          Built by
          <a 
            className="font-semibold text-primary hover:underline transition-all hover:opacity-80" 
            target="_blank" 
            rel="noopener noreferrer"
            href="https://lszpilowski.com"
          >
            LSzpilowski
          </a>
        </p>
        <p className="text-xs flex items-center gap-1">
          Built with{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Next.js 16
          </a>
          {" • "}
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            React 19
          </a>
          {" • "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Tailwind CSS 4
          </a>
        </p>
      </div>
    </footer>
  );
};
