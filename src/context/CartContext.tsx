import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import type { Vehicle } from "@/data/vehicles";

export type PurchaseMode = "buy" | "rent";

export interface CartItem {
  id: string;
  vehicleId: string;
  name: string;
  type: string;
  img: string;
  mode: PurchaseMode;
  unitPrice: number;
  quantity: number;
  days: number;
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (vehicle: Vehicle, mode: PurchaseMode, days?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateDays: (id: string, days: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "velocity-cart";

const lineTotal = (item: CartItem) =>
  item.mode === "rent" ? item.unitPrice * item.days * item.quantity : item.unitPrice * item.quantity;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const addItem = useCallback((vehicle: Vehicle, mode: PurchaseMode, days = 3) => {
    const id = `${vehicle.id}-${mode}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id,
          vehicleId: vehicle.id,
          name: vehicle.name,
          type: vehicle.type,
          img: vehicle.img,
          mode,
          unitPrice: mode === "buy" ? vehicle.price : vehicle.rentPerDay,
          quantity: 1,
          days: mode === "rent" ? days : 1,
        },
      ];
    });
    setIsOpen(true);
    toast({
      title: mode === "buy" ? "Added to cart" : "Rental added to cart",
      description: `${vehicle.name} — ${vehicle.type}`,
    });
  }, []);

  const removeItem = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      setItems((prev) =>
        quantity <= 0
          ? prev.filter((i) => i.id !== id)
          : prev.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, 9) } : i)),
      ),
    [],
  );

  const updateDays = useCallback(
    (id: string, days: number) =>
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, days: Math.min(Math.max(days, 1), 90) } : i)),
      ),
    [],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: items.reduce((sum, i) => sum + lineTotal(i), 0),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      updateDays,
      clearCart,
    }),
    [items, isOpen, addItem, removeItem, updateQuantity, updateDays, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export const getLineTotal = lineTotal;
