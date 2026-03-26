import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-10 bg-card">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="font-display text-xl font-bold tracking-wider">
        VELO<span className="text-gradient">CITY</span>
      </Link>
      <p className="font-body text-sm text-muted-foreground">
        © 2026 Velocity Motors. All rights reserved.
      </p>
      <div className="flex gap-6">
        {["Privacy", "Terms", "Support"].map((l) => (
          <button key={l} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            {l}
          </button>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
