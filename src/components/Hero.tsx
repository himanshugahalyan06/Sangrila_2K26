"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden bg-transparent">
            <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center space-y-12">
                {/* Background Text Layer - Simple Fade */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 1.5 }}
                        className="text-[18vw] font-black leading-none uppercase select-none tracking-tighter motion-gpu"
                        style={{
                            WebkitTextStroke: '2px var(--primary)',
                            color: 'transparent',
                        }}
                    >
                        CULTURAL
                    </motion.h1>
                </div>

                {/* Main Content */}
                <div className="relative z-20 text-center space-y-6 md:space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.4em] backdrop-blur-sm"
                    >
                        GEETA UNIVERSITY | 13.03.2026
                    </motion.div>

                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                                duration: 1
                            }}
                            className="flex flex-col items-center"
                        >
                            {/* SANGRILA Text */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                                    }
                                }}
                                className="flex relative group/sangrila cursor-default pb-4"
                            >
                                {Array.from("SANGRILA").map((char, index) => (
                                    <motion.h1
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0, y: 30, rotate: -10 },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                rotate: 0,
                                                transition: { type: "spring", stiffness: 400, damping: 15 }
                                            }
                                        }}
                                        whileHover={{
                                            y: -20,
                                            scale: 1.1,
                                            rotate: -1,
                                            textShadow: "0 0 20px rgba(255,255,255,0.6)",
                                            transition: { type: "spring", stiffness: 400, damping: 20 }
                                        }}
                                        className="text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] font-black tracking-tighter text-white leading-none uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] motion-gpu"
                                    >
                                        {char}
                                    </motion.h1>
                                ))}
                            </motion.div>

                            {/* 2K26 Text */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                                    }
                                }}
                                className="flex mt-2 relative cursor-default pb-2"
                            >
                                {Array.from("2K26").map((char, index) => (
                                    <motion.h2
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0, y: 30, rotate: 10 },
                                            visible: {
                                                opacity: 1,
                                                scale: 1,
                                                y: 0,
                                                rotate: 0,
                                                transition: { type: "spring", stiffness: 400, damping: 15 }
                                            }
                                        }}
                                        whileHover={{
                                            y: -15,
                                            scale: 1.15,
                                            rotate: 1,
                                            textShadow: "0 0 20px rgba(241,90,36,0.5)",
                                            transition: { type: "spring", stiffness: 400, damping: 20 }
                                        }}
                                        className="text-primary text-3xl sm:text-5xl md:text-7xl lg:text-[10rem] italic font-black drop-shadow-[0_0_20px_rgba(241,90,36,0.2)] motion-gpu"
                                    >
                                        {char}
                                    </motion.h2>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12"
                        >
                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{
                                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                <Link
                                    href="/register"
                                    className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-secondary via-primary to-purple-600 text-white font-black rounded-full shadow-[0_10px_40px_rgba(241,90,36,0.4)] hover:shadow-[0_15px_50px_rgba(241,90,36,0.6)] transition-all text-base sm:text-xl border border-white/20 flex items-center justify-center gap-2 relative overflow-hidden group"
                                >
                                    <Sparkles className="w-5 h-5 group-hover:animate-bounce" />
                                    <span className="relative z-10 uppercase tracking-widest">Register Now</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <Link
                                    href="/events"
                                    className="px-8 sm:px-10 py-4 sm:py-5 bg-white/5 text-white border border-white/10 font-black rounded-full hover:bg-white/10 transition-all text-base sm:text-xl backdrop-blur-md flex items-center justify-center group gap-2"
                                >
                                    <span className="uppercase tracking-widest">View All Events</span>
                                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            className="relative space-y-6 pt-12"
                        >
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-[0.1em] md:tracking-[0.2em] uppercase relative">
                                <span className="gradient-text drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                                    Cultural Fest
                                </span>
                            </h3>
                            <p className="text-white/60 text-sm md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
                                Join the most anticipated student-led cultural extravaganza.
                                A celebration of talent, creativity, and the spirit of Sangrila.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
