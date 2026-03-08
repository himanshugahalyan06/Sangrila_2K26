"use client";

import Image from "next/image";
import { memo } from "react";

export const BackgroundEffects = memo(function BackgroundEffects() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020410] pointer-events-none">
            {/* Base Dark Stage Background with deep blue/purple hues */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_#050614_70%,_#000000_100%)]" />

            {/* Concert Crowd Background Image - High Impact Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/concert-crowd.jpg"
                    alt="Concert Background"
                    fill
                    className="object-cover object-bottom opacity-60 mix-blend-lighten scale-105"
                    priority
                    sizes="100vw"
                    unoptimized
                    quality={75}
                />
                {/* Dynamic Lighting Color Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020410] via-transparent to-[#1e1b4b]/20" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020410]/90" />

                {/* Colored Spotlight Reflection on Crowd */}
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-purple-500/5 mix-blend-color-dodge" />
            </div>

            {/* Moving Atmospheric Rays / God Rays */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-[-20%] left-1/4 w-[150%] h-[150%] bg-[conic-gradient(from_0deg_at_50%_0%,_transparent_0%,_rgba(139,92,246,0.1)_10%,_transparent_20%,_rgba(59,130,246,0.1)_30%,_transparent_40%)] beam-rotate" />
            </div>

            {/* Enhanced Stage Spotlights */}
            <div className="hidden md:block absolute -top-[5%] left-[5%] w-[50vw] h-[150vh] bg-gradient-to-b from-blue-400/25 via-blue-600/10 to-transparent blur-[60px] origin-top mix-blend-screen spotlight-left"
                style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
            />
            <div className="hidden md:block absolute -top-[5%] right-[5%] w-[50vw] h-[150vh] bg-gradient-to-b from-purple-400/25 via-purple-600/10 to-transparent blur-[60px] origin-top mix-blend-screen spotlight-right"
                style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }}
            />

            {/* High Intensity Light Source points (The Rig) */}
            <div className="absolute top-0 left-0 right-0 h-4 flex justify-around pointer-events-none px-[10%]">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`w-32 h-32 -translate-y-1/2 rounded-full blur-2xl opacity-40 ${i % 2 === 0 ? 'bg-blue-400' : 'bg-purple-400'}`} />
                ))}
            </div>

            {/* Dynamic Lasers - Optimized for "Attractive" look */}
            <div className="hidden md:block absolute -top-[2%] left-[30%] w-[2px] h-[150vh] bg-cyan-400/80 blur-[2px] origin-top mix-blend-screen laser-left" />
            <div className="hidden md:block absolute -top-[2%] left-[35%] w-[2px] h-[150vh] bg-blue-400/60 blur-[2px] origin-top mix-blend-screen laser-left" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />

            <div className="hidden md:block absolute -top-[2%] right-[30%] w-[2px] h-[150vh] bg-fuchsia-400/80 blur-[2px] origin-top mix-blend-screen laser-right" />
            <div className="hidden md:block absolute -top-[2%] right-[35%] w-[2px] h-[150vh] bg-purple-400/60 blur-[2px] origin-top mix-blend-screen laser-right" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }} />

            {/* Lens Flares */}
            <div className="absolute top-10 left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_80px_40px_rgba(59,130,246,0.3)] animate-pulse" />
            <div className="absolute top-10 right-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_80px_40px_rgba(139,92,246,0.3)] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Bottom Fog Layer for Floor depth */}
            <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-[#020410] via-[#020410]/60 to-transparent" />
            <div className="absolute bottom-[-10%] left-0 right-0 h-[20vh] bg-blue-500/5 blur-3xl fog-animation" />
        </div>
    );
});
