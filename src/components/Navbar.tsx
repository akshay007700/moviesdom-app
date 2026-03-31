import { Search, Menu, X, Settings, Info, Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-4 py-3 md:px-12 md:py-4 flex items-center justify-between",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/90 to-transparent"
      )}
    >
      <div className="flex items-center gap-8">
        <Link to="/" className="text-primary text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform">
          MoviesDom
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-gray-300"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <form onSubmit={handleSearch} className="relative hidden sm:block group">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-full py-2 px-6 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 md:w-72 transition-all focus:bg-white/10 focus:w-80"
          />
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" />
        </form>
        
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 hover:bg-white/10 rounded-full transition-all active:scale-90"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-4 w-64 bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-4 animate-in fade-in zoom-in duration-200 overflow-hidden">
              <div className="md:hidden px-4 py-4 border-b border-white/5 mb-4 space-y-4">
                <form onSubmit={handleSearch} className="relative sm:hidden">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </form>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-2 text-sm font-bold uppercase tracking-widest hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="space-y-1 px-2">
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" /> 
                  Admin Panel
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Info className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" /> 
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" /> 
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
