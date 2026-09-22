import VehicleSection from "@/components/VehicleSection";
import { bikes } from "@/data/vehicles";

const BikesSection = () => (
  <VehicleSection
    id="bikes"
    eyebrow="Two Wheels"
    titlePrefix="Bikes"
    vehicles={bikes}
    subtitle="From superbikes to scramblers — every machine comes with gear, insurance options and flexible rental lengths."
  />
);

export default BikesSection;
