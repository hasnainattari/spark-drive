import { motion } from "framer-motion";
import { Gauge, MapPin, ShoppingCart, Zap } from "lucide-react";
import { formatCurrency, stockLabel, type Vehicle } from "@/data/vehicles";
import { useCart, type PurchaseMode } from "@/context/CartContext";

const stockStyles: Record<Vehicle["stock"], string> = {
  "in-stock": "bg-primary/15 text-primary border-primary/30",
  limited: "bg-accent/15 text-accent border-accent/30",
  "pre-order": "bg-secondary text-muted-foreground border-border",
};

interface Props {
  vehicle: Vehicle;
  mode: PurchaseMode;
  index: number;
  onOpenDetails: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, mode, index, onOpenDetails }: Props) => {
  const { addItem } = useCart();
  const onSale = vehicle.msrp > vehicle.price;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      className="group flex flex-col gradient-card rounded-2xl overflow-hidden border border-border hover-lift"
    >
      <button
        type="button"
        onClick={() => onOpenDetails(vehicle)}
        className="relative block h-56 w-full overflow-hidden text-left"
        aria-label={`View details for ${vehicle.name}`}
      >
        <img
          src={vehicle.img}
          alt={`${vehicle.name} ${vehicle.type}`}
          loading="lazy"
          width={1200}
          height={912}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-border/60 bg-background/70 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider backdrop-blur">
          {vehicle.type}
        </span>
        <span
          className={`absolute top-4 right-4 rounded-full border px-3 py-1 font-body text-xs font-medium backdrop-blur ${stockStyles[vehicle.stock]}`}
        >
          {stockLabel[vehicle.stock]}
        </span>
        {onSale && mode === "buy" && (
          <span className="absolute bottom-4 left-4 rounded-full gradient-accent px-3 py-1 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground">
            Save {formatCurrency(vehicle.msrp - vehicle.price)}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-bold leading-tight">{vehicle.name}</h3>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              {vehicle.year} · {vehicle.engine}
            </p>
          </div>
        </div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 flex items-end gap-3"
        >
          <span className="font-display text-2xl font-bold text-primary">
            {mode === "buy" ? formatCurrency(vehicle.price) : `${formatCurrency(vehicle.rentPerDay)}`}
          </span>
          {mode === "rent" ? (
            <span className="font-body text-sm text-muted-foreground">/ day</span>
          ) : (
            onSale && (
              <span className="font-body text-sm text-muted-foreground line-through">{formatCurrency(vehicle.msrp)}</span>
            )
          )}
        </motion.div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { icon: Zap, value: vehicle.hp },
            { icon: Gauge, value: vehicle.speed },
            { icon: MapPin, value: `${vehicle.unitsAvailable} avail.` },
          ].map(({ icon: Icon, value }) => (
            <div key={value} className="flex flex-col items-center gap-1 rounded-xl bg-secondary/50 p-2.5">
              <Icon size={15} className="text-primary" />
              <span className="font-body text-[11px] text-muted-foreground">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => onOpenDetails(vehicle)}
            className="flex-1 rounded-lg border border-border py-3 font-display text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Details
          </button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => addItem(vehicle, mode)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg gradient-accent py-3 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground"
          >
            <ShoppingCart size={15} />
            Add
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default VehicleCard;
