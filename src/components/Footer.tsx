import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-6 px-6 bg-background">
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
          <nav className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 lg:gap-7">
            <Link
              to="/"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              to="/domestic"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Domestic
            </Link>
            <Link
              to="/international"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              International
            </Link>
            <Link
              to="/hotels"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Hotels
            </Link>
            <Link
              to="/experiences"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Experiences
            </Link>
            <Link
              to="/about"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              About
            </Link>
            <Link
              to="/faq"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              FAQs
            </Link>
            <Link
              to="/enquire"
              className="text-sm font-secondary text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <div className="flex items-center shrink-0">
            <p className="text-sm font-secondary text-muted-foreground whitespace-nowrap">
              © 2026 Triponomic. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
