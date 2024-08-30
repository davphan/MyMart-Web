'use client';

import Footer from "@/libs/components/Footer";
import Details from "@/libs/components/home/Details";
import Hero from "@/libs/components/home/Hero";

export default function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <Details />
      <Footer />
    </div>
  )
}
