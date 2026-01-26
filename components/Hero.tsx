// components/Hero.tsx
import { ShaderAnimation } from "@/components/shader-animation";
import { Typewriter } from "@/components/typewriter";

export default function Hero() {
  const words = [
    "Your Private AI Mental Health Agent",
    "Confidential. Secure. Always Available.",
    "Meet Your AI Companion, Emily Hartman"
  ];

  return (
    <section className="pt-0 pb-0">
      <div className="relative flex h-[620px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border">
        <ShaderAnimation />

        <div className="absolute pointer-events-none z-10 text-center">
          {/* Typewriter text */}
          <h1 className="text-5xl font-semibold tracking-tighter leading-none text-white mb-4">
            <Typewriter
              words={words}
              speed={70}
              delayBetweenWords={1800}
              cursor={true}
              cursorChar="|"
            />
          </h1>

        </div>
      </div>
    </section>
  );
}
