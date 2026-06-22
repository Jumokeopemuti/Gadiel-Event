import AboutSection from "@/components/AboutSection";
import FriendlyService from "@/components/FriendlyService";
import Hero from "@/components/Hero";
import NextEvents from "@/components/NextEvents";
import PortfolioGallery from "@/components/PortfolioGallery";
import StatsSection from "@/components/StatsSection";
import TestimonialHover from "@/components/TestimonialHover";
import VideoPreview from "@/components/VideoPreview";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FriendlyService />
      <WhatWeDo />
       <PortfolioGallery />
       <TestimonialHover/>
      <VideoPreview />
     
      <StatsSection />
      <NextEvents />
      
    </>
  );
}