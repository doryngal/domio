import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Cases from "@/components/sections/Cases";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <main>
        <Navbar />
        <Hero />
        <Marquee />
        <HowItWorks />
        <Features />
        <Pricing />
        <Cases />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
