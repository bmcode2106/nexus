"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Code, Book, Send } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const mainNavLinks = [
  { href: "/", label: "Generator", icon: <Code className="w-4 h-4" /> },
  { href: "/docs", label: "Docs", icon: <Book className="w-4 h-4" /> },
];

const communityLink = {
  href: "https://t.me/your_telegram_group", // Ganti dengan link Telegram Anda
  label: "Community",
  icon: <Send className="w-4 h-4" />,
  target: "_blank",
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const NavLink = ({ href, label, icon, target, onClick }: any) => (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group relative flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md active:animate-click-pulse"
    >
      {icon}
      <span className="z-10">{label}</span>
      {/* Animated underline dengan gradien */}
      <span className="absolute bottom-[6px] left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 group-hover:w-full group-active:w-full"></span>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Nexus
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
          {mainNavLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <Separator orientation="vertical" className="h-6 mx-2" />
          <NavLink {...communityLink} />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu Button & Panel Container */}
          <div className="md/hidden" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Menu Panel */}
            {isMenuOpen && (
              <Card className="absolute top-16 right-4 w-52 p-2 shadow-lg animate-in fade-in-20 slide-in-from-top-4">
                <nav className="flex flex-col">
                  {mainNavLinks.map((link) => (
                    <NavLink key={link.href} {...link} onClick={() => setIsMenuOpen(false)} />
                  ))}
                  <Separator className="my-2" />
                  <NavLink {...communityLink} onClick={() => setIsMenuOpen(false)} />
                </nav>
              </Card>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
