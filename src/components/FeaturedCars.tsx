import { motion } from "framer-motion";
import { useState } from "react";
import { Fuel, Gauge, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import sedanImg from "@/assets/car-sedan.jpg";
import suvImg from "@/assets/car-suv.jpg";
import coupeImg from "@/assets/car-coupe.jpg";
import hatchImg from "@/assets/car-hatch.jpg";
import convertibleImg from "@/assets/car-convertible.jpg";

const cars = [
  {
    name: "Shadow GT",
    type: "Sedan",
    price: "$89,900",
    rent: "$220 / day",
    img: sedanImg,
    hp: "450 HP",
    speed: "3.2s 0-60",
    fuel: "Hybrid",
  },
  {
    name: "Atlas X",
    type: "SUV",
    price: "$72,500",
    rent: "$180 / day",
    img: suvImg,
    hp: "380 HP",
    speed: "4.1s 0-60",
    fuel: "Electric",
  },
  {
    name: "Apex RS",
    type: "Coupe",
    price: "$124,000",
    rent: "$340 / day",
    img: coupeImg,
    hp: "620 HP",
    speed: "2.8s 0-60",
    fuel: "V8 Twin Turbo",
  },
  {
    name: "Volt S",
    type: "Hatchback",
    price: "$54,300",
    rent: "$130 / day",
    img: hatchImg,
    hp: "320 HP",
    speed: "4.6s 0-60",
    fuel: "Electric",
  },
  {
    name: "Zephyr Roadster",
    type: "Convertible",
    price: "$148,700",
    rent: "$410 / day",
    img: convertibleImg,
    hp: "580 HP",
    speed: "3.0s 0-60",
    fuel: "Flat-6",
  },
  {
    name: "Titan Sport",
    type: "Crossover",
    price: "$96,400",
    rent: "$250 / day",
    img: suvImg,
    hp: "500 HP",
    speed: "3.7s 0-60",
    fuel: "Hybrid",
  },
];

type Mode = "buy" | "rent";

const FeaturedCars = () => {
  const [mode, setMode] = useState<Mode>("buy");

  return (
    <section id="cars" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">Our Fleet</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Cars for <span className="text-gradient">{mode === "buy" ? "Sale" : "Rent"}</span>
          </h2>
        </motion.div>

        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 rounded-full border border-border bg-secondary/40">
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
                    layoutId="car-mode-pill"
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
          {cars.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.15 }}
              className="gradient-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer group"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={car.img}
                  alt={`${car.name} ${car.type} available to ${mode === "buy" ? "buy" : "rent"}`}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 gradient-accent px-3 py-1 rounded-full font-display text-xs font-semibold text-primary-foreground">
                  {car.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold mb-1">{car.name}</h3>
                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-xl text-primary font-semibold mb-4"
                >
                  {mode === "buy" ? car.price : car.rent}
                </motion.p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                    <Zap size={16} className="text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{car.hp}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                    <Gauge size={16} className="text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{car.speed}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-secondary/50">
                    <Fuel size={16} className="text-primary" />
                    <span className="font-body text-xs text-muted-foreground">{car.fuel}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    toast({
                      title: mode === "buy" ? `Purchase request sent` : `Rental request sent`,
                      description: `${car.name} — ${mode === "buy" ? car.price : car.rent}. Our team will contact you shortly.`,
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

export default FeaturedCars;
