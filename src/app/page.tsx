// sections
import Hero from "./hero";
import { PackageCards } from "./package-cards";
import "./globals.css";
import ThemeCards from "./theme-cards";
import { Carousel, Divider } from "antd";
import VenueCards from "./venue-cards";
export default function RootApplication() {
  return (
    <div className="container mx-auto">
      <Hero />

      <VenueCards />
      <Divider className="mt-10" />
      <PackageCards />
      <Divider className="mt-10" />
    </div>
  );
}
