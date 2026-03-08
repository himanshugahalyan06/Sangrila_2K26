"use client";

import { events } from "@/data/events";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    Users,
    IndianRupee,
    Clock,
    ChevronLeft,
    Sparkles,
    CheckCircle2,
    Download,
    Calendar,
    MapPin,
    Trophy
} from "lucide-react";

export default function EventDetailClient({ id }: { id: string }) {
    const event = events.find(e => e.id === id);

    if (!event) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-[#020205] text-white p-6">
                <h1 className="text-4xl font-black mb-4">Event Not Found</h1>
                <Link href="/events" className="text-primary hover:underline flex items-center gap-2">
                    <ChevronLeft size={20} /> Back to All Events
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#020205] text-white">
            <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors font-black uppercase tracking-widest text-xs"
                    >
                        <ChevronLeft size={16} />
                        Back to Events
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Side - Image & Hero Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group motion-gpu">
                            {event.image ? (
                                <Image
                                    src={event.image}
                                    alt={event.name}
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                    unoptimized
                                    quality={75}
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                                    <Sparkles className="w-20 h-20 text-primary opacity-20" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                                    {event.category}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white/10 transition-colors">
                                <IndianRupee className="text-secondary w-6 h-6" />
                                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Registration</span>
                                <span className="text-lg font-black">{event.fee}</span>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white/10 transition-colors">
                                <Users className="text-primary w-6 h-6" />
                                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Participants</span>
                                <span className="text-lg font-black">{event.participants}</span>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-2 hover:bg-white/10 transition-colors col-span-2 sm:col-span-1">
                                <Clock className="text-purple-500 w-6 h-6" />
                                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Time Limit</span>
                                <span className="text-lg font-black">{event.timeLimit}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Details & Rules */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-10"
                    >
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                {event.name.split(' ').map((word: string, i: number, arr: string[]) => (
                                    <span key={i} className={i === arr.length - 1 ? "text-primary italic" : ""}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>
                            <p className="text-xl text-white/60 font-medium leading-relaxed">
                                {event.description}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                Guidelines & Rules
                            </h3>
                            <div className="space-y-4">
                                {event.rules?.map((rule: string, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1) }}
                                        className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                                            {index + 1}
                                        </div>
                                        <p className="text-white/80 text-sm font-medium leading-relaxed pt-1">
                                            {rule}
                                        </p>
                                    </motion.div>
                                ))}
                                {!event.rules && (
                                    <p className="text-white/40 italic">Wait for the ultimate rulebook to be unveiled soon.</p>
                                )}
                            </div>
                        </div>

                        {event.prize && (
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-primary"></span>
                                    Prizes
                                </h3>
                                <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm flex items-center gap-4 group hover:bg-primary/10 transition-colors">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Trophy className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-white font-black text-lg sm:text-xl tracking-tight uppercase">
                                            {event.prize}
                                        </p>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">
                                            Winner & Runner-up Cash Prize + Trophy + Certificate
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="pt-8 flex flex-wrap gap-4">
                            <Link
                                href={`/register?event=${encodeURIComponent(event.name)}`}
                                className="px-10 py-5 bg-gradient-to-r from-secondary via-primary to-purple-600 text-white font-black rounded-full shadow-[0_10px_40px_rgba(241,90,36,0.3)] hover:shadow-[0_15px_50px_rgba(241,90,36,0.5)] transition-all hover:-translate-y-1 flex items-center gap-3 uppercase tracking-widest text-sm relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                                <span className="relative z-10">Register Now</span>
                                <CheckCircle2 className="w-5 h-5 relative z-10" />
                            </Link>

                            <a
                                href="/SANGRILA_2026_RuleBook.pdf"
                                download
                                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-full transition-all flex items-center gap-3 uppercase tracking-widest text-sm group"
                            >
                                <Download className="w-5 h-5 group-hover:animate-bounce" />
                                Rulebook
                            </a>
                        </div>

                        {/* Event Metadata (Professional Footer) */}
                        <div className="pt-12 border-t border-white/10 grid grid-cols-2 gap-8 text-white/40">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                                    <span className="text-sm font-bold text-white/80 text-[10px] md:text-sm">13-14 March 2026</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-primary" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Venue</span>
                                    <span className="text-sm font-bold text-white/80 text-[10px] md:text-sm">Main Campus Auditorium</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
