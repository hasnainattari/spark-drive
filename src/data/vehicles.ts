import sedanImg from "@/assets/car-sedan.jpg";
import suvImg from "@/assets/car-suv.jpg";
import coupeImg from "@/assets/car-coupe.jpg";
import hatchImg from "@/assets/car-hatch.jpg";
import convertibleImg from "@/assets/car-convertible.jpg";
import bikeSportImg from "@/assets/bike-sport.jpg";
import bikeCruiserImg from "@/assets/bike-cruiser.jpg";
import bikeElectricImg from "@/assets/bike-electric.jpg";
import bikeTouringImg from "@/assets/bike-touring.jpg";
import bikeCafeImg from "@/assets/bike-cafe.jpg";
import bikeDirtImg from "@/assets/bike-dirt.jpg";

export type Category = "car" | "bike";

export interface Vehicle {
  id: string;
  name: string;
  category: Category;
  type: string;
  price: number;
  rentPerDay: number;
  img: string;
  hp: string;
  speed: string;
  drivetrain: string;
  engine: string;
  topSpeed: string;
  seats: string;
  year: string;
  description: string;
  features: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: "shadow-gt",
    name: "Shadow GT",
    category: "car",
    type: "Sedan",
    price: 89900,
    rentPerDay: 220,
    img: sedanImg,
    hp: "450 HP",
    speed: "3.2s 0-60",
    drivetrain: "All-Wheel Drive",
    engine: "3.0L Hybrid Inline-6",
    topSpeed: "186 mph",
    seats: "5 seats",
    year: "2026",
    description:
      "A executive-grade performance sedan that pairs whisper-quiet hybrid cruising with track-ready launch response.",
    features: ["Adaptive air suspension", "Nappa leather interior", "Matrix LED lighting", "360° driver assist"],
  },
  {
    id: "atlas-x",
    name: "Atlas X",
    category: "car",
    type: "SUV",
    price: 72500,
    rentPerDay: 180,
    img: suvImg,
    hp: "380 HP",
    speed: "4.1s 0-60",
    drivetrain: "Dual Motor AWD",
    engine: "Dual Motor Electric",
    topSpeed: "155 mph",
    seats: "7 seats",
    year: "2026",
    description:
      "A fully electric family SUV with 410 miles of range, three rows of space and a panoramic glass roof.",
    features: ["410 mi range", "Panoramic glass roof", "Heated 3-row seating", "Autonomous highway pilot"],
  },
  {
    id: "apex-rs",
    name: "Apex RS",
    category: "car",
    type: "Coupe",
    price: 124000,
    rentPerDay: 340,
    img: coupeImg,
    hp: "620 HP",
    speed: "2.8s 0-60",
    drivetrain: "Rear-Wheel Drive",
    engine: "4.0L V8 Twin Turbo",
    topSpeed: "205 mph",
    seats: "2 seats",
    year: "2026",
    description:
      "Track-bred aerodynamics, carbon-ceramic brakes and a twin-turbo V8 tuned for pure driver engagement.",
    features: ["Carbon-ceramic brakes", "Active rear wing", "Launch control", "Alcantara racing buckets"],
  },
  {
    id: "volt-s",
    name: "Volt S",
    category: "car",
    type: "Hatchback",
    price: 54300,
    rentPerDay: 130,
    img: hatchImg,
    hp: "320 HP",
    speed: "4.6s 0-60",
    drivetrain: "Front-Wheel Drive",
    engine: "Single Motor Electric",
    topSpeed: "149 mph",
    seats: "5 seats",
    year: "2026",
    description:
      "A compact electric hot hatch built for the city — quick charging, agile handling and premium finish throughout.",
    features: ["18-min fast charge", "Sport-tuned chassis", "Wireless CarPlay", "Ambient cabin lighting"],
  },
  {
    id: "zephyr-roadster",
    name: "Zephyr Roadster",
    category: "car",
    type: "Convertible",
    price: 148700,
    rentPerDay: 410,
    img: convertibleImg,
    hp: "580 HP",
    speed: "3.0s 0-60",
    drivetrain: "Rear-Wheel Drive",
    engine: "4.0L Flat-6",
    topSpeed: "198 mph",
    seats: "2 seats",
    year: "2026",
    description:
      "An open-top grand tourer with a 12-second soft top, rear-axle steering and a naturally aspirated flat-six soundtrack.",
    features: ["12s soft top", "Rear-axle steering", "Sport exhaust", "Heated neck-level vents"],
  },
  {
    id: "titan-sport",
    name: "Titan Sport",
    category: "car",
    type: "Crossover",
    price: 96400,
    rentPerDay: 250,
    img: suvImg,
    hp: "500 HP",
    speed: "3.7s 0-60",
    drivetrain: "All-Wheel Drive",
    engine: "3.5L Hybrid V6",
    topSpeed: "174 mph",
    seats: "5 seats",
    year: "2026",
    description:
      "The performance crossover — coupe silhouette, hybrid torque fill and an adaptive chassis for every surface.",
    features: ["Adaptive damping", "Head-up display", "Bowers audio", "Towing package"],
  },

  {
    id: "raptor-900",
    name: "Raptor 900",
    category: "bike",
    type: "Sportbike",
    price: 18900,
    rentPerDay: 85,
    img: bikeSportImg,
    hp: "180 HP",
    speed: "2.9s 0-60",
    drivetrain: "Chain Drive",
    engine: "999cc Inline-4",
    topSpeed: "186 mph",
    seats: "2 seats",
    year: "2026",
    description:
      "A homologated superbike with race electronics, quickshifter and a full-carbon fairing package.",
    features: ["6-axis IMU", "Up/down quickshifter", "Öhlins suspension", "Carbon fairings"],
  },
  {
    id: "iron-cruiser",
    name: "Iron Cruiser",
    category: "bike",
    type: "Cruiser",
    price: 22400,
    rentPerDay: 95,
    img: bikeCruiserImg,
    hp: "120 HP",
    speed: "3.8s 0-60",
    drivetrain: "Belt Drive",
    engine: "1800cc V-Twin",
    topSpeed: "125 mph",
    seats: "2 seats",
    year: "2026",
    description:
      "Big-bore V-twin torque, blacked-out chrome and a low-slung stance built for long highway pulls.",
    features: ["Torque-rich V-twin", "Cruise control", "Bagger-ready mounts", "Custom pipes"],
  },
  {
    id: "pulse-ev",
    name: "Pulse EV",
    category: "bike",
    type: "Electric",
    price: 15600,
    rentPerDay: 70,
    img: bikeElectricImg,
    hp: "150 HP",
    speed: "3.1s 0-60",
    drivetrain: "Direct Drive",
    engine: "Dual Motor EV",
    topSpeed: "140 mph",
    seats: "1 seat",
    year: "2026",
    description:
      "Silent, instant torque and zero maintenance — the electric naked bike with 160 miles of city range.",
    features: ["160 mi range", "Regenerative braking", "App connectivity", "Ride modes"],
  },
  {
    id: "nomad-adv",
    name: "Nomad ADV",
    category: "bike",
    type: "Touring",
    price: 24800,
    rentPerDay: 110,
    img: bikeTouringImg,
    hp: "160 HP",
    speed: "3.4s 0-60",
    drivetrain: "Shaft Drive",
    engine: "1250cc Boxer Twin",
    topSpeed: "137 mph",
    seats: "2 seats",
    year: "2026",
    description:
      "An adventure tourer with hard luggage, long-travel suspension and heated everything for continent crossing.",
    features: ["Hard panniers", "Heated grips & seat", "Semi-active suspension", "Off-road ride mode"],
  },
  {
    id: "vintage-cafe",
    name: "Vintage Café",
    category: "bike",
    type: "Café Racer",
    price: 13200,
    rentPerDay: 60,
    img: bikeCafeImg,
    hp: "95 HP",
    speed: "4.2s 0-60",
    drivetrain: "Chain Drive",
    engine: "865cc Parallel Twin",
    topSpeed: "118 mph",
    seats: "2 seats",
    year: "2026",
    description:
      "Hand-finished retro styling with modern brakes and fuelling — a café racer you can actually ride daily.",
    features: ["Brushed alloy tank", "Clip-on bars", "Brembo front brakes", "Bar-end mirrors"],
  },
  {
    id: "trail-450",
    name: "Trail 450",
    category: "bike",
    type: "Dirt Bike",
    price: 9800,
    rentPerDay: 45,
    img: bikeDirtImg,
    hp: "55 HP",
    speed: "4.8s 0-60",
    drivetrain: "Chain Drive",
    engine: "450cc Single",
    topSpeed: "103 mph",
    seats: "1 seat",
    year: "2026",
    description:
      "A lightweight enduro machine — 12 inches of travel, street-legal lighting and a featherweight frame.",
    features: ["12in suspension travel", "Street-legal kit", "Aluminium frame", "Traction control"],
  },
];

export const cars = vehicles.filter((v) => v.category === "car");
export const bikes = vehicles.filter((v) => v.category === "bike");

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
