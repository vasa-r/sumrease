import BgGradient from "@/components/common/bg-gradient";
import CtaSection from "@/components/home/cta-section";
import DemoSection from "@/components/home/demo-section";
import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works-section";
import PriceSection from "@/components/home/price-section";
import React from "react";

const Home = () => {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorks />
        <PriceSection />
        <CtaSection />
      </div>
    </div>
  );
};

export default Home;
