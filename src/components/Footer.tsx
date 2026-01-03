import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-16 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-border/50">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-script text-2xl font-semibold text-logo italic">
              Triponomic
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/enquire"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 Triponomic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
