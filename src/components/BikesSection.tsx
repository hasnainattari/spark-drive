import { motion } from "framer-motion";
import { useState } from "react";
import { Bike, Gauge, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import sportImg from "@/assets/bike-sport.jpg";
import cruiserImg from "@/assets/bike-cruiser.jpg";
import electricImg from "@/assets/bike-electric.jpg";

const bikes = [
  {
    name: "Raptor 900",
    type: "Sportbike",
    price: "$18,900",
    rent: "$85 / day",
    img: sportImg,
    hp: "180 HP",
    speed: "2.9s 0-60",
    engine: "999cc Inline-4",
  },
  {
    name: "Iron Cruiser",
    type: "Cruiser",
    price: "$22,400",
    rent: "$95 / day",
    img: cruiserImg,
    hp: "120 HP",
    speed: "3.8s 0-60",
    engine: "1800cc V-Twin",
  },
  {
    name: "Pulse EV",
    type: "Electric",
    price: "$15,600",
    rent: "$70 / day",
    img: electricImg,
    hp: "150 HP",
    speed: "3.1s 0-60",
    engine: "Dual Motor EV",
  },
];

type Mode = "buy" | "rent";

const BikesSection = () => {
  const [mode, setMode] = useState<Mode>("buy");

  return (
    <section id="bikes" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">Two Wheels</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Bikes for <span className="text-gradient">{mode === "buy" ? "Sale" : "Rent"}</span>
          </h2>
        </motion.div>

        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 rounded-full border border-border bg-background/60">
            {(["buy", "rent"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative px-7 py-2 rounded-full font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
                  mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="bike-mode-pill"
                    className="absolute inset-0 rounded-full gradient-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{m === "buy" ? "Buy" : "Rent"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bikes.map((bike, i) => (
            <motion.div
              key={bike.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="gradient-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer group"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={bike.img}
                  alt={`${bike.name} ${bike.type} motorcycle available to ${mode === "buy" ? "buy" : "rent"}`}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 gradient-accent px-3 py-1 rounded-full font-display text-xs font-semibold text-primary-foreground">
                  {bike.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-1">{bike.name}</h3>
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-xl text-primary font-semibold mb-4"
                >
                  {mode === "buy" ? bike.price : bike.rent}
                </motion.p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                    <Zap size={16} className="text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{bike.hp}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                    <Gauge size={16} className="text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{bike.speed}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                    <Bike size={16} className="text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{bike.engine}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    toast({
                      title: mode === "buy" ? "Purchase request sent" : "Rental request sent",
                      description: `${bike.name} — ${mode === "buy" ? bike.price : bike.rent}. Our team will contact you shortly.`,
                    })
                  }
                  className="w-full mt-5 gradient-accent py-3 rounded-md font-display font-semibold uppercase tracking-wider text-sm text-primary-foreground"
                >
                  {mode === "buy" ? "Buy Now" : "Rent Now"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BikesSection;
