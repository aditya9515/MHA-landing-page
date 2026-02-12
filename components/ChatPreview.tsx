// components/ChatPreview.tsx
"use client";

import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function ChatPreview() {
  const data = [
    {
      title: "Casual Conversations",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-6">
            Emily is always ready for friendly, natural conversations. Share your thoughts, unwind after a long day, or just chat about anything on your mind—without judgment.
          </p>

          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm mb-8">
            <li>• Engaging, human-like interactions</li>
            <li>• Safe space for open dialogue</li>
            <li>• Available anytime, anywhere</li>
          </ul>

          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="/chat1.png"
              alt="friendly chat preview"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
            <Image
              src="/chat2.png"
              alt="ai chat interface"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
          </div> */}
        </div>
      ),
    },

    {
      title: "Emotional Well-Being",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-6">
            Emily provides empathetic support to help you manage stress, anxiety, and daily challenges. Receive calm, understanding guidance whenever you need it.
          </p>

          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm mb-8">
            <li>• Emotion-sensitive responses</li>
            <li>• Helps reduce stress and tension</li>
            <li>• Fully private and secure</li>
          </ul>

          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="/emotion1.png"
              alt="emotional support"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
            <Image
              src="/emotion2.png"
              alt="mental health ai"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
          </div> */}
        </div>
      ),
    },

    {
      title: "Crisis & Emergency Guidance",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm font-normal mb-6">
            In urgent situations, Emily can help connect you with trusted contacts or professional support. It monitors critical cues responsibly to ensure you’re never alone during high-stress moments.
          </p>

          <ul className="space-y-2 text-neutral-700 dark:text-neutral-300 text-sm mb-8">
            <li>• Detects high-risk emotional patterns</li>
            <li>• Suggests immediate support actions</li>
            <li>• Escalates responsibly in emergencies</li>
          </ul>

          {/* <div className="grid grid-cols-2 gap-4">
            <Image
              src="/emergency1.png"
              alt="emergency support"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
            <Image
              src="/emergency2.png"
              alt="contact support"
              width={500}
              height={500}
              className="rounded-lg object-cover w-full h-40"
            />
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-full py-24">
      <Timeline data={data} />
    </section>
  );
}
