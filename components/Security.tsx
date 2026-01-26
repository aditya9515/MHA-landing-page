'use client';

import React from 'react';
import {
  Lock,
  EyeOff,
  Trash2,
  ShieldCheck,
  Database,
  Fingerprint,
} from 'lucide-react';

import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/grid-feature-cards';

const features = [
  {
    title: 'End-to-End Encryption',
    icon: Lock,
    description:
      'All conversations are protected with strong end-to-end encryption to ensure complete privacy.',
  },
  {
    title: 'No Model Training',
    icon: EyeOff,
    description:
      'Your chats are never used to train AI models. Your data remains fully private.',
  },
  {
    title: 'Full Data Control',
    icon: Trash2,
    description:
      'Delete your conversations and stored data anytime with permanent removal.',
  },
  {
    title: 'Secure Infrastructure',
    icon: ShieldCheck,
    description:
      'Built on secure systems designed to protect user data at every layer.',
  },
  {
    title: 'Isolated Storage',
    icon: Database,
    description:
      'Each user’s data is logically isolated to prevent unauthorized access.',
  },
  {
    title: 'Privacy by Design',
    icon: Fingerprint,
    description:
      'Security and privacy are built into the architecture from day one.',
  },
];

export default function Security() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">

        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
            Data Privacy & Security
          </h2>

          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Your conversations, data, and interactions are protected with
            enterprise-grade security standards.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </AnimatedContainer>

      </div>
    </section>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>['className'];
  children: React.ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
