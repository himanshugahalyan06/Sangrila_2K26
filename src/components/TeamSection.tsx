"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { teamMembers } from "@/data/team";


export function TeamSection() {
    return (
        <section id="team" className="py-24 px-6 relative z-10 bg-[#0a0b14] mx-4 rounded-[3rem] mt-24 border border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30, letterSpacing: "-0.05em" }}
                        whileInView={{ opacity: 1, y: 0, letterSpacing: "0em" }}
                        animate={{ textShadow: ["0 0 15px rgba(139,92,246,0.3)", "0 0 25px rgba(139,92,246,0.6)", "0 0 15px rgba(139,92,246,0.3)"] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, textShadow: { duration: 2, repeat: Infinity } }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    >
                        CORE TEAM
                    </motion.h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-sm md:text-base">
                        The visionary minds working behind the scenes to make Sangrila 2026 a reality.
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.04
                            }
                        }
                    }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4"
                >
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                            whileHover={{
                                y: -6,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative bg-[#11121d] rounded-2xl border border-white/5 hover:border-primary/50 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] overflow-hidden flex flex-col motion-gpu"
                        >
                            {/* Inner Frame Glow */}
                            <div className="absolute inset-0 z-20 border border-white/5 rounded-2xl pointer-events-none group-hover:border-primary/20 transition-colors duration-500" />

                            {/* Shine Effect */}
                            <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </div>

                            {/* Image Container - Compact */}
                            <div className={`relative w-full aspect-[3/4.5] overflow-hidden ${member.objectFit === "contain" ? "bg-[#0d0e1a]" : "bg-white/5"}`}>
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05060f] via-transparent to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                                {/* Image */}
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className={`transition-transform duration-1000 ease-out group-hover:scale-105 ${member.objectFit === "contain" ? "object-contain" : "object-cover"} ${member.rotate ? "rotate-90 scale-[1.7] group-hover:scale-[1.85]" : ""}`}
                                    style={{
                                        objectPosition: member.objectPosition || "center",
                                        filter: "contrast(1.05) brightness(1.02)"
                                    }}
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                    priority={member.id === "1" || member.id === "2"}
                                    unoptimized
                                    quality={80}
                                />

                                {/* Social Links */}
                                <div className="absolute top-3 right-3 z-30 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    {member.instagram && (
                                        <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-primary backdrop-blur-md rounded-xl text-white transition-all duration-300 transform hover:scale-110 hover:-rotate-12 border border-white/10">
                                            <Instagram size={14} />
                                        </a>
                                    )}
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-[#0077b5] backdrop-blur-md rounded-xl text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12 delay-75 border border-white/10">
                                            <Linkedin size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content Overlaid at Bottom - Compact */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-20 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="space-y-0.5">
                                    <h3 className="text-xs sm:text-sm md:text-base font-black text-white group-hover:text-primary transition-colors duration-300 tracking-tight drop-shadow-lg uppercase leading-tight">
                                        {member.name}
                                    </h3>
                                    {member.role && (
                                        <p className="text-primary/90 font-bold text-[10px] md:text-xs uppercase tracking-[0.15em] drop-shadow-md">
                                            {member.role}
                                        </p>
                                    )}
                                </div>

                                {/* Animated Line */}
                                <div className="w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left mt-2" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
