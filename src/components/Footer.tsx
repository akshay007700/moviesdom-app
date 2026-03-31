import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    ["Audio Description", "Help Center", "Gift Cards", "Media Center"],
    ["Investor Relations", "Jobs", "Terms of Use", "Privacy"],
    ["Legal Notices", "Cookie Preferences", "Corporate Information", "Contact Us"],
  ];

  return (
    <footer className="bg-background text-gray-500 py-12 px-4 md:px-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-6 text-white">
          <Facebook className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          <Instagram className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          <Twitter className="w-6 h-6 cursor-pointer hover:text-gray-300" />
          <Youtube className="w-6 h-6 cursor-pointer hover:text-gray-300" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {footerLinks.map((column, i) => (
            <div key={i} className="flex flex-col gap-3">
              {column.map((link) => (
                <Link key={link} to="#" className="hover:underline">
                  {link}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 text-xs">
          <p>© 1997-2026 MoviesDom, Inc.</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:underline">Service Code</Link>
            <Link to="#" className="hover:underline">Ad Choices</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
