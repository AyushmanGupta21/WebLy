import { Button } from "@/components/ui/button";
import  Header  from "./_components/Header";
import Image from "next/image";
import Hero from "./_components/Hero";
import FloatingLines from "@/components/FloatingLines";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0" style={{ pointerEvents: 'auto' }}>
        <FloatingLines 
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={5}
          lineDistance={5}
          bendRadius={5.0}
          bendStrength={-1.5}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="relative z-10" style={{ pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <Header />
          <Hero />
        </div>
      </div>
    </div>
  );
}
