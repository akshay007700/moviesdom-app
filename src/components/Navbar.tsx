import { Search, Bell, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300 px-4 py-3 md:px-12 md:py-4 flex items-center justify-between",
        isScrolled ? "bg-background" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center gap-8">
        <Link to="/" className="text-primary text-2xl md:text-3xl font-bold tracking-tighter">
          MOVIESDOM
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gray-300",
                location.pathname === link.path ? "text-white" : "text-gray-400"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300 hidden md:block" />
        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center cursor-pointer">
          <User className="w-5 h-5 text-white" />
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-t border-white/10 flex flex-col p-4 md:hidden animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="py-3 text-lg font-medium border-b border-white/5 last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
