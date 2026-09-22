import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, Gauge, MapPin, Minus, Plus, ShoppingCart, Timer, Users, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { formatCurrency, stockLabel, type Vehicle } from "@/data/vehicles";
import { useCart, type PurchaseMode } from "@/context/CartContext";

interface Props {
  vehicle: Vehicle | null;
  initialMode: PurchaseMode;
  onClose: () => void;
}

const VehicleDetailDialog = ({ vehicle, initialMode, onClose }: Props) => {
  const { addItem } = useCart();
  const [mode, setMode] = useState<PurchaseMode>(initialMode);
  const [days, setDays] = useState(3);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (vehicle) {
      setMode(initialMode);
      setDays(3);
      setActiveImg(0);
    }
  }, [vehicle, initialMode]);

  if (!vehicle) return null;

  const onSale = vehicle.msrp > vehicle.price;
  const total = mode === "buy" ? vehicle.price : vehicle.rentPerDay * days;

  const specs = [
    { icon: Zap, label: "Power", value: vehicle.hp },
    { icon: Gauge, label: "0-60 mph", value: vehicle.speed },
    { icon: Timer, label: "Top speed", value: vehicle.topSpeed },
    { icon: Users, label: "Capacity", value: vehicle.seats },
  ];

  const table = [
    ["Engine", vehicle.engine],
    ["Drivetrain", vehicle.drivetrain],
    ["Transmission", vehicle.transmission],
    ["Range", vehicle.range],
    ["Model year", vehicle.year],
    ["Body style", vehicle.type],
  ];

  return (
    <Dialog open={!!vehicle} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto border-border bg-card p-0">
        <div className="grid lg:grid-cols-2">
          {/* Gallery */}
          <div className="p-5 lg:p-6">
            <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/40">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={vehicle.gallery[activeImg]}
                  alt={`${vehicle.name} view ${activeImg + 1}`}
                  loading="lazy"
                  width={1200}
                  height={912}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[4/3] w-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute top-3 left-3 rounded-full border border-border/60 bg-background/75 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider backdrop-blur">
                {vehicle.type}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {vehicle.gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`overflow-hidden rounded-lg border transition-colors ${
                    activeImg === i ? "border-primary" : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${vehicle.name} thumbnail ${i + 1}`}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-border bg-secondary/40 p-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Icon size={15} />
                    <span className="font-body text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
                  </div>
                  <p className="mt-1 font-display text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Info + purchase */}
          <div className="border-t border-border p-5 lg:border-l lg:border-t-0 lg:p-6">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">
              {vehicle.category === "car" ? "Car" : "Motorcycle"}
            </p>
            <DialogTitle className="mt-2 font-display text-3xl font-bold">{vehicle.name}</DialogTitle>
            <DialogDescription className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              {vehicle.description}
            </DialogDescription>

            {/* Availability */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-body text-xs font-medium text-primary">
                {stockLabel[vehicle.stock]} · {vehicle.unitsAvailable} available
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 font-body text-xs text-muted-foreground">
                <MapPin size={12} /> {vehicle.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 font-body text-xs text-muted-foreground">
                <Calendar size={12} /> {vehicle.readyIn}
              </span>
            </div>

            {/* Mode toggle */}
            <div className="mt-6 inline-flex rounded-full border border-border bg-secondary/40 p-1">
              {(["buy", "rent"] as PurchaseMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`relative px-6 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
                    mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="detail-mode-pill"
                      className="absolute inset-0 rounded-full gradient-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{m === "buy" ? "Buy" : "Rent"}</span>
                </button>
              ))}
            </div>

            {/* Pricing */}
            <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4">
              {mode === "buy" ? (
                <>
                  <div className="flex items-end gap-3">
                    <span className="font-display text-3xl font-bold text-primary">{formatCurrency(vehicle.price)}</span>
                    {onSale && (
                      <span className="font-body text-sm text-muted-foreground line-through">
                        {formatCurrency(vehicle.msrp)}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-body text-xs text-muted-foreground">
                    Current price · taxes and registration calculated at checkout
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-end gap-2">
                    <span className="font-display text-3xl font-bold text-primary">
                      {formatCurrency(vehicle.rentPerDay)}
                    </span>
                    <span className="font-body text-sm text-muted-foreground">/ day</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-body text-sm text-muted-foreground">Rental length</span>
                    <div className="flex items-center gap-3 rounded-full border border-border bg-background/60 px-2 py-1">
                      <button
                        type="button"
                        aria-label="Fewer days"
                        onClick={() => setDays((d) => Math.max(1, d - 1))}
                        className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-[4.5rem] text-center font-display text-sm font-semibold">
                        {days} {days === 1 ? "day" : "days"}
                      </span>
                      <button
                        type="button"
                        aria-label="More days"
                        onClick={() => setDays((d) => Math.min(90, d + 1))}
                        className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="font-body text-sm text-muted-foreground">Total</span>
                <span className="font-display text-xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                addItem(vehicle, mode, days);
                onClose();
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg gradient-accent py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground"
            >
              <ShoppingCart size={16} />
              {mode === "buy" ? "Add to cart" : `Add ${days}-day rental`}
            </motion.button>

            {/* Features */}
            <div className="mt-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Highlights
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {vehicle.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 font-body text-sm text-foreground/90">
                    <Check size={15} className="mt-0.5 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Spec table */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              {table.map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-4 py-3 font-body text-sm ${
                    i % 2 === 0 ? "bg-secondary/30" : ""
                  }`}
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetailDialog;
