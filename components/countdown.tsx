"use client"

import React from "react"
import { Puzzle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

import AnimatedNumberCountdown from "@/components/countdown-number"

const AnimatedNumberCountDownDemo = () => {
    return (
        <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl tracking-tight">The website will launch in,</h3>
        <AnimatedNumberCountdown
            endDate={new Date("2026-2-30")}
            className="my-4"
        />
        </div>
    )
}

export default AnimatedNumberCountDownDemo;