import { motion } from "framer-motion";
import { Shield, Award, Headphones, Wrench } from "lucide-react";

const features = [
  { icon: Shield, title: "Premium Quality", desc: "Every vehicle undergoes 200+ point inspection." },
  { icon: Award, title: "Award Winning", desc: "Recognized as the top dealership 5 years running." },
  { icon: Headphones, title: "24/7 Support", desc: "Our team is always ready to assist you." },
  { icon: Wrench, title: "Free Service", desc: "Complimentary maintenance for the first 2 years." },
];

const AboutSection = () => (
  <section id="about" className="py-24 gradient-hero">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">Why Choose Us</p>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Built on <span className="text-gradient">Trust</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-panel rounded-xl p-6 text-center group cursor-pointer"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full gradient-accent flex items-center justify-center group-hover:animate-pulse-glow transition-shadow">
              <f.icon size={24} className="text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-bold mb-2">{f.title}</h3>
            <p className="font-body text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
