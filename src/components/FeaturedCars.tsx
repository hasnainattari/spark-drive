import VehicleSection from "@/components/VehicleSection";
import { cars } from "@/data/vehicles";

const FeaturedCars = () => (
  <VehicleSection
    id="cars"
    eyebrow="Our Fleet"
    titlePrefix="Cars"
    vehicles={cars}
    subtitle="Nine hand-picked models with live pricing, full specifications and same-week availability. Open any car for the full gallery."
  />
);

export default FeaturedCars;
