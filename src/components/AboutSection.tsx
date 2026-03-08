"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Music, Sparkles, Star, Calendar, MapPin } from "lucide-react";

export function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 relative z-10">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Geeta University About */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative motion-gpu"
                >
                    <div className="glass rounded-[2.5rem] overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Left - University Image */}
                            <div className="relative min-h-[300px] md:min-h-[400px] overflow-hidden">
                                <Image
                                    src="/images/geeta-university.jpg"
                                    alt="Geeta University Campus"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    quality={75}
                                    unoptimized
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-6 z-10">
                                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase drop-shadow-lg">
                                        Geeta University
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1 text-white/70 text-sm">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>Panipat, Haryana</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Content Side */}
                            <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-black uppercase tracking-[0.3em] w-fit">
                                    <GraduationCap className="w-3.5 h-3.5" />
                                    About the University
                                </div>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                    <span className="text-white font-bold">Geeta University</span> is a premier educational institution located in Panipat, Haryana, recognized by UGC and approved by AICTE. With a commitment to nurturing talent and fostering innovation, the university offers world-class education across various disciplines.
                                </p>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                    The university boasts a sprawling campus equipped with state-of-the-art infrastructure, modern labs, dedicated research centers, and vibrant student life. It is known for producing industry-ready professionals and encouraging students to explore their creative and cultural sides.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    {["NAAC Accredited", "UGC Recognized", "AICTE Approved", "50+ Programs"].map((tag) => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs font-bold border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sangrila About */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative motion-gpu"
                >
                    <div className="glass rounded-[2.5rem] overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Left - Content Side */}
                            <div className="p-10 md:p-16 flex flex-col justify-center space-y-6 order-2 md:order-1">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-black uppercase tracking-[0.3em] w-fit">
                                    <Music className="w-3.5 h-3.5" />
                                    About the Fest
                                </div>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                    <span className="text-white font-bold">Sangrila</span> is the annual cultural extravaganza of Geeta University — a celebration of art, music, dance, drama, and everything creative. It is the most awaited event of the academic calendar, bringing together students from across the region.
                                </p>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                    From electrifying solo performances to team-based competitions, Sangrila offers a platform for students to showcase their talent, push their creative boundaries, and create unforgettable memories. The fest features 25+ events including dance, singing, fashion shows, comedy, arts, and much more.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-xs font-bold border border-white/5">
                                        <Calendar className="w-3 h-3 text-primary" />
                                        13 March 2026
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-xs font-bold border border-white/5">
                                        <Star className="w-3 h-3 text-secondary" />
                                        25+ Events
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-white/70 text-xs font-bold border border-white/5">
                                        <Sparkles className="w-3 h-3 text-purple-400" />
                                        1000+ Participants
                                    </div>
                                </div>
                            </div>

                            {/* Right - Sangrila Logo */}
                            <div className="relative p-10 md:p-16 flex flex-col items-center justify-center bg-gradient-to-bl from-primary/10 via-purple-500/5 to-transparent min-h-[300px] order-1 md:order-2">
                                <div className="absolute inset-0 opacity-15">
                                    <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-primary/40 blur-3xl" />
                                    <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-purple-500/30 blur-3xl" />
                                </div>
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="relative z-10"
                                >
                                    <Image
                                        src="/sangrila-logo.png"
                                        alt="Sangrila 2K26"
                                        width={250}
                                        height={250}
                                        unoptimized
                                        className="object-contain drop-shadow-[0_0_40px_rgba(241,90,36,0.3)]"
                                    />
                                </motion.div>
                                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em] mt-4 relative z-10">
                                    Cultural Fest
                                </p>
                                <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-secondary mx-auto mt-3 relative z-10" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
