import { motion } from "framer-motion";
import { useState } from "react";
import { Fuel, Gauge, Zap } from "lucide-react";
import sedanImg from "@/assets/car-sedan.jpg";
import suvImg from "@/assets/car-suv.jpg";
import coupeImg from "@/assets/car-coupe.jpg";

const cars = [
  {
    name: "Shadow GT",
    type: "Sedan",
    price: "$89,900",
    img: sedanImg,
    hp: "450 HP",
    speed: "3.2s 0-60",
    fuel: "Hybrid",
  },
  {
    name: "Atlas X",
    type: "SUV",
    price: "$72,500",
    img: suvImg,
    hp: "380 HP",
    speed: "4.1s 0-60",
    fuel: "Electric",
  },
  {
    name: "Apex RS",
    type: "Coupe",
    price: "$124,000",
    img: coupeImg,
    hp: "620 HP",
    speed: "2.8s 0-60",
    fuel: "V8 Twin Turbo",
  },
];

const FeaturedCars = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="cars" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">Our Fleet</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Featured <span className="text-gradient">Vehicles</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cars.map((car, i) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="gradient-card rounded-xl overflow-hidden border border-border hover-lift cursor-pointer group"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={car.img}
                  alt={car.name}
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
                <p className="font-display text-xl text-primary font-semibold mb-4">{car.price}</p>

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
                  className="w-full mt-5 gradient-accent py-3 rounded-md font-display font-semibold uppercase tracking-wider text-sm text-primary-foreground"
                >
                  View Details
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
