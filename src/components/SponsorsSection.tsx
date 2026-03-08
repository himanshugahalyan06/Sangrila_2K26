"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Sparkles, Building2 } from "lucide-react";

const bronzeSponsors = [
    { name: "Mehfil by Yum Fuel", logo: "/sponsors/mehfil-yumfuel.jpg" },
    { name: "Hotel Urban Veins", logo: "/sponsors/hotel-urban-veins.jpg" },
];

export function SponsorsSection() {
    return (
        <section className="relative z-10 py-16 md:py-20 px-6 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-black uppercase tracking-[0.3em] mb-4"
                    >
                        <Award className="w-3.5 h-3.5 fill-secondary" />
                        Our Partners
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase"
                    >
                        OUR{" "}
                        <span className="gradient-text">SPONSORS</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-white/40 text-sm mt-3 max-w-md mx-auto"
                    >
                        Proudly supported by our amazing sponsors
                    </motion.p>
                </div>

                {/* ═══ HOSPITALITY PARTNER ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    {/* Hospitality tier label */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px flex-1 max-w-[150px] bg-gradient-to-r from-transparent to-blue-400/30" />
                        <span className="text-blue-400 text-xs md:text-sm font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-400" />
                            Hospitality Partner
                        </span>
                        <div className="h-px flex-1 max-w-[150px] bg-gradient-to-l from-transparent to-blue-400/30" />
                    </div>

                    {/* Geeta Sarovar Portico */}
                    <div className="flex justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative group"
                        >
                            <div
                                className="relative w-[280px] h-[160px] md:w-[400px] md:h-[200px] rounded-3xl overflow-hidden glass-card p-4 flex items-center justify-center cursor-pointer bg-white/5"
                                style={{
                                    border: "1px solid rgba(59, 130, 246, 0.2)",
                                    background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(59, 130, 246, 0.05))"
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-400/10 rounded-3xl" />
                                </div>
                                <Image
                                    src="/sponsors/geeta-sarovar-portico.jpg"
                                    alt="Geeta Sarovar Portico - Hospitality Partner"
                                    width={350}
                                    height={180}
                                    unoptimized
                                    className="object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                />
                            </div>
                            <p className="text-center mt-4 text-white/90 text-lg md:text-xl font-bold tracking-wide">
                                Geeta Sarovar Portico
                            </p>
                            <p className="text-center text-blue-400/70 text-xs font-bold uppercase tracking-widest mt-1">
                                Official Hospitality Partner
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ═══ SILVER SPONSOR ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                >
                    {/* Silver tier label */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gray-400/30" />
                        <span className="text-gray-300 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-gray-300" />
                            Silver Sponsor
                        </span>
                        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gray-400/30" />
                    </div>

                    {/* Ahuja - Silver Sponsor (Big logo) */}
                    <div className="flex justify-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative group"
                        >
                            <div
                                className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-3xl overflow-hidden glass-card p-6 flex items-center justify-center cursor-pointer"
                                style={{
                                    background: "linear-gradient(135deg, rgba(192,192,192,0.08), rgba(255,255,255,0.03))",
                                    border: "1px solid rgba(192,192,192,0.15)",
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300/10 via-transparent to-gray-400/10 rounded-3xl" />
                                </div>
                                <Image
                                    src="/sponsors/ahuja-sweets.jpg"
                                    alt="Ahuja's Sweets - Silver Sponsor"
                                    width={220}
                                    height={220}
                                    unoptimized
                                    className="object-contain rounded-2xl relative z-10 drop-shadow-[0_0_20px_rgba(192,192,192,0.2)]"
                                />
                            </div>
                            <p className="text-center mt-3 text-white/70 text-sm font-bold">
                                Ahuja&apos;s Sweets
                            </p>
                            <p className="text-center text-gray-400/60 text-[10px] font-bold uppercase tracking-widest mt-1">
                                Silver Sponsor
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ═══ BRONZE SPONSORS ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                >
                    {/* Bronze tier label */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-amber-700/30" />
                        <span className="text-amber-600 text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            Bronze Sponsors
                        </span>
                        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-amber-700/30" />
                    </div>

                    {/* Bronze sponsor logos (same size) */}
                    <div className="flex flex-wrap justify-center gap-8">
                        {bronzeSponsors.map((sponsor) => (
                            <motion.div
                                key={sponsor.name}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative group"
                            >
                                <div
                                    className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] rounded-2xl overflow-hidden glass-card p-4 flex items-center justify-center cursor-pointer"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(205,127,50,0.06), rgba(255,255,255,0.02))",
                                        border: "1px solid rgba(205,127,50,0.12)",
                                    }}
                                >
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 via-transparent to-amber-600/10 rounded-2xl" />
                                    </div>
                                    <Image
                                        src={sponsor.logo}
                                        alt={`${sponsor.name} - Bronze Sponsor`}
                                        width={160}
                                        height={160}
                                        unoptimized
                                        className="object-contain rounded-xl relative z-10 drop-shadow-[0_0_15px_rgba(205,127,50,0.15)]"
                                    />
                                </div>
                                <p className="text-center mt-3 text-white/60 text-xs font-bold">
                                    {sponsor.name}
                                </p>
                                <p className="text-center text-amber-600/50 text-[10px] font-bold uppercase tracking-widest mt-0.5">
                                    Bronze Sponsor
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom decorative line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-12 flex justify-center"
                >
                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
