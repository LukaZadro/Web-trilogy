import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg shadow-sm h-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-40">
          <div className="flex items-center justify-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="logo_header.png" width={100} height={100} />
            </Link>
            <Link
              to="https://www.unizg.hr/"
              className="flex items-center gap-2 group"
            >
              <img src="sveuciliste_logo.png" width={200} height={100} />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              NASLOVNA
            </Link>
            <Link
              to="/student"
              className="text-foreground hover:text-primary transition-colors"
            >
              STUDENTI
            </Link>
            <Link
              to="/alumni"
              className="text-foreground hover:text-primary transition-colors"
            >
              ALUMNI
            </Link>
            <Link
              to="/poslodavac"
              className="text-foreground hover:text-primary transition-colors"
            >
              POSLODAVCI
            </Link>
            <Link
              to="/udruga"
              className="text-foreground hover:text-primary transition-colors"
            >
              UDRUGE
            </Link>
            <Button variant="default" size="sm" className="shadow-soft">
              Prijavi se
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/jobs"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Poslovi & Prakse
            </Link>
            <Link
              to="/organizations"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Studentske udruge
            </Link>
            <Link
              to="/mentorship"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Alumni mentorstvo
            </Link>
            <Link
              to="/cv-builder"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CV Builder
            </Link>
            <Button variant="default" size="sm" className="w-full">
              Prijavi se
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
