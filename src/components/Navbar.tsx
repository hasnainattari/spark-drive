import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Cars", path: "/#cars" },
  { label: "About", path: "/#about" },
  { label: "Contact", path: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const scrollToSection = (hash: string) => {
    setIsOpen(false);
    if (hash.startsWith("/#")) {
      const id = hash.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="font-display text-2xl font-bold tracking-wider text-foreground">
          VELO<span className="text-gradient">CITY</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.path.startsWith("/#")) {
                  scrollToSection(link.path);
                } else {
                  window.location.href = link.path;
                }
              }}
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-widest"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/login"
            className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase tracking-widest"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="gradient-accent px-5 py-2 rounded-md font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-panel overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    if (link.path.startsWith("/#")) {
                      scrollToSection(link.path);
                    } else {
                      window.location.href = link.path;
                    }
                  }}
                  className="font-body text-muted-foreground hover:text-foreground transition-colors text-left uppercase tracking-widest text-sm"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="font-body text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="gradient-accent px-5 py-2 rounded-md font-display font-semibold text-sm uppercase tracking-wider text-primary-foreground text-center"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
