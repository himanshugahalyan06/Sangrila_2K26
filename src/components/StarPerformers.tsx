"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Sparkles } from "lucide-react";

export function StarPerformers() {
    return (
        <section className="relative z-10 overflow-hidden py-12 md:py-16">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0214]/50 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="text-center pb-8 px-6 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-xs font-black uppercase tracking-[0.3em] mb-3"
                >
                    <Star className="w-3.5 h-3.5 fill-secondary" />
                    Star Attractions
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase"
                >
                    STAR{" "}
                    <span className="gradient-text">PERFORMERS</span>
                </motion.h2>
            </div>

            {/* Main Layout — Asymmetric Showcase */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative">

                {/* --- Top Row: Large left + stacked right --- */}
                <div className="flex flex-col md:flex-row items-end gap-4 md:gap-6 mb-6">
                    {/* Large hero performer on left */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative w-full md:w-[50%] group"
                    >
                        <div className="relative h-[350px] sm:h-[420px] md:h-[500px] overflow-hidden rounded-3xl bg-gradient-to-b from-orange-500/5 to-transparent">
                            {/* Glow */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
                            <Image
                                src="/stars/star-1.png"
                                alt="Star Performer"
                                fill
                                className="object-contain object-bottom scale-110 group-hover:scale-[1.15] transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={85}
                            />
                        </div>
                        {/* Label */}
                        <div className="absolute bottom-4 left-4 z-20">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                                <Sparkles className="w-3.5 h-3.5 text-primary" />
                                <span className="text-white text-xs font-bold uppercase tracking-wider">Asees Kaur</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right column — two stacked performers */}
                    <div className="w-full md:w-[50%] flex flex-row md:flex-col gap-4 md:gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="relative flex-1 group"
                        >
                            <div className="relative h-[180px] sm:h-[200px] md:h-[238px] overflow-hidden rounded-2xl bg-gradient-to-b from-purple-500/5 to-transparent">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-purple-500/8 rounded-full blur-[40px] pointer-events-none" />
                                <Image
                                    src="/stars/star-2.png"
                                    alt="Star Performer"
                                    fill
                                    className="object-contain object-bottom scale-125 group-hover:scale-[1.3] transition-transform duration-700"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    quality={85}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative flex-1 group"
                        >
                            <div className="relative h-[180px] sm:h-[200px] md:h-[238px] overflow-hidden rounded-2xl bg-gradient-to-b from-orange-500/5 to-transparent">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-orange-500/6 rounded-full blur-[40px] pointer-events-none" />
                                <Image
                                    src="/stars/star-3.png"
                                    alt="Star Performer"
                                    fill
                                    className="object-contain object-bottom scale-110 group-hover:scale-[1.15] transition-transform duration-700"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    quality={85}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* --- Bottom Row: Two dark portraits side by side --- */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative flex-1 group"
                    >
                        <div className="relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden rounded-2xl">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-red-500/10 rounded-full blur-[50px] pointer-events-none z-0" />
                            <Image
                                src="/stars/star-4.jpg"
                                alt="Star Performer"
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 640px) 100vw, 50vw"
                                quality={85}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                    <Star className="w-3 h-3 text-primary fill-primary" />
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">Asees Kaur — Star Performer</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="relative flex-1 group"
                    >
                        <div className="relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden rounded-2xl">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-purple-500/10 rounded-full blur-[50px] pointer-events-none z-0" />
                            <Image
                                src="/stars/star-5.jpg"
                                alt="Star Performer"
                                fill
                                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 640px) 100vw, 50vw"
                                quality={85}
                            />
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 z-20">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                    <Star className="w-3 h-3 text-primary fill-primary" />
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">Asees Kaur — Star Performer</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-8"
                >
                    <p className="text-white/25 text-xs font-bold uppercase tracking-[0.4em]">
                        & Many More Surprises
                    </p>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2" />
                </motion.div>
            </div>
        </section>
    );
}
