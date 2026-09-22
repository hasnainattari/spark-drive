import { useState } from "react";
import { motion } from "framer-motion";
import VehicleCard from "@/components/VehicleCard";
import VehicleDetailDialog from "@/components/VehicleDetailDialog";
import type { Vehicle } from "@/data/vehicles";
import type { PurchaseMode } from "@/context/CartContext";

interface Props {
  id: string;
  eyebrow: string;
  titlePrefix: string;
  vehicles: Vehicle[];
  subtitle: string;
}

const VehicleSection = ({ id, eyebrow, titlePrefix, vehicles, subtitle }: Props) => {
  const [mode, setMode] = useState<PurchaseMode>("buy");
  const [selected, setSelected] = useState<Vehicle | null>(null);

  return (
    <section id={id} className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
          <h2 className="font-display text-4xl font-bold md:text-5xl">
            {titlePrefix} for <span className="text-gradient">{mode === "buy" ? "Sale" : "Rent"}</span>
          </h2>
          <p className="mt-4 font-body text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="my-12 flex justify-center">
          <div className="inline-flex rounded-full border border-border bg-secondary/40 p-1">
            {(["buy", "rent"] as PurchaseMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`relative px-8 py-2.5 font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
                  mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId={`${id}-mode-pill`}
                    className="absolute inset-0 rounded-full gradient-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{m === "buy" ? "Buy" : "Rent"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} mode={mode} index={i} onOpenDetails={setSelected} />
          ))}
        </div>
      </div>

      <VehicleDetailDialog vehicle={selected} initialMode={mode} onClose={() => setSelected(null)} />
    </section>
  );
};

export default VehicleSection;
