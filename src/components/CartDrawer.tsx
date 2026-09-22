import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { getLineTotal, useCart } from "@/context/CartContext";
import { formatCurrency } from "@/data/vehicles";
import { toast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const { isOpen, closeCart, items, subtotal, count, removeItem, updateQuantity, updateDays, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col border-l border-border bg-card"
          >
            <header className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingCart size={18} className="text-primary" />
                <h2 className="font-display text-xl font-bold uppercase tracking-wider">
                  Your Cart {count > 0 && <span className="text-primary">({count})</span>}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingCart size={40} className="text-muted-foreground/40" />
                  <p className="mt-4 font-display text-lg font-semibold">Your cart is empty</p>
                  <p className="mt-1 font-body text-sm text-muted-foreground">
                    Browse the fleet and add a car or bike to buy or rent.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4 rounded-xl border border-border bg-secondary/30 p-3"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        width={1200}
                        height={912}
                        className="h-20 w-24 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-base font-bold leading-tight">{item.name}</p>
                            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                              {item.type} · {item.mode === "buy" ? "Purchase" : "Rental"}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-muted-foreground transition-colors hover:text-primary"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-2 py-1">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-muted-foreground hover:text-foreground"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="min-w-6 text-center font-display text-xs font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-muted-foreground hover:text-foreground"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {item.mode === "rent" && (
                            <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-2 py-1">
                              <button
                                type="button"
                                aria-label="Fewer days"
                                onClick={() => updateDays(item.id, item.days - 1)}
                                className="p-1 text-muted-foreground hover:text-foreground"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="min-w-14 text-center font-display text-xs font-semibold">
                                {item.days} {item.days === 1 ? "day" : "days"}
                              </span>
                              <button
                                type="button"
                                aria-label="More days"
                                onClick={() => updateDays(item.id, item.days + 1)}
                                className="p-1 text-muted-foreground hover:text-foreground"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                        <p className="mt-3 font-display text-sm font-bold text-primary">
                          {formatCurrency(getLineTotal(item))}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="border-t border-border px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <p className="mt-1 font-body text-xs text-muted-foreground">
                  Taxes, delivery and insurance confirmed by our team before payment.
                </p>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    toast({
                      title: "Order request sent",
                      description: `${count} item${count === 1 ? "" : "s"} · ${formatCurrency(subtotal)}. Our team will call you to confirm.`,
                    });
                    clearCart();
                    closeCart();
                  }}
                  className="mt-4 w-full rounded-lg gradient-accent py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground"
                >
                  Checkout
                </motion.button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="mt-3 w-full font-body text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear cart
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
