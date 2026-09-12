import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-16 px-6 mt-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-border/50">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Triponomic Logo" 
              className="h-8 w-auto"
            />
            <span className="font-primary text-xl font-semibold text-foreground">
              Triponomic
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              Hotels
            </Link>
            <Link
              to="/enquire"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm font-secondary text-muted-foreground">
            © 2026 Triponomic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
