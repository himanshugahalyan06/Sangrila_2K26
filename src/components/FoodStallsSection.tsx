"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Utensils } from "lucide-react";

const foodPartners = [
    { name: "Chaska Chaap Corner", logo: "/sponsors/rahmat-fast-food.jpg" },
    { name: "Om Jee Sweets", logo: "/sponsors/om-jee-sweets.jpg" },
    { name: "Hotel Urban Veins", logo: "/sponsors/hotel-urban-veins.jpg" },
    { name: "Mehfil by Yum", logo: "/sponsors/mehfil-yumfuel.jpg" },
];

export function FoodStallsSection() {
    // Duplicate items for seamless infinite scroll
    const items = [...foodPartners, ...foodPartners, ...foodPartners, ...foodPartners];

    return (
        <section className="relative z-10 py-12 md:py-16 overflow-hidden">
            {/* Header */}
            <div className="text-center mb-10 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] mb-4"
                >
                    <Utensils className="w-3.5 h-3.5" />
                    Food Partners
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase"
                >
                    FOOD{" "}
                    <span className="gradient-text">STALLS</span>
                </motion.h2>
            </div>

            {/* Scrolling Marquee */}
            <div className="relative w-full overflow-hidden">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#020410] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#020410] to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div className="flex items-center gap-12 md:gap-20 animate-marquee">
                    {items.map((partner, i) => (
                        <div
                            key={`${partner.name}-${i}`}
                            className="flex-shrink-0 flex flex-col items-center gap-3"
                        >
                            <div className="relative w-[200px] h-[100px] md:w-[280px] md:h-[130px] rounded-2xl overflow-hidden glass-card p-4 flex items-center justify-center"
                                style={{
                                    background: "linear-gradient(135deg, rgba(241,90,36,0.04), rgba(255,255,255,0.02))",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={250}
                                    height={120}
                                    unoptimized
                                    className="object-contain max-h-full"
                                />
                            </div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider">
                                {partner.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
