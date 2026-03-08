"use client";

import { useState, Suspense, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, School, Hash, Trophy, CreditCard, Send, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, Camera, Upload, Phone, Users, ArrowRight, ArrowLeft, IndianRupee, QrCode } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";

import { events } from "@/data/events";

// UPI Config
const UPI_ID = "geetauniversity.62417837@hdfcbank";
const UPI_NAME = "Geeta University";

function RegistrationFormContent() {
    const searchParams = useSearchParams();
    const eventParam = searchParams.get("event");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Step state: 1 = details, 2 = payment
    const [step, setStep] = useState(1);

    // State for the selected event to handle programmed selection
    const [selectedEvent, setSelectedEvent] = useState(() => {
        if (eventParam) {
            const event = events.find(e => e.id === eventParam || e.name === eventParam);
            return event ? event.name : "";
        }
        return "";
    });

    // Sync selectedEvent with URL parameter change
    const [prevEventParam, setPrevEventParam] = useState(eventParam);
    if (eventParam !== prevEventParam) {
        setPrevEventParam(eventParam);
        const event = events.find(e => e.id === eventParam || e.name === eventParam);
        if (event && event.name !== selectedEvent) {
            setSelectedEvent(event.name);
        }
    }

    const [teamMembers, setTeamMembers] = useState<string[]>([]);

    // State to preserve Step 1 form data when moving to Step 2
    const [step1Data, setStep1Data] = useState<{
        name: string;
        phone: string;
        email: string;
        college: string;
        rollno: string;
        event: string;
        teamName?: string;
    } | null>(null);

    // Reset team members when event changes
    const [prevSelectedEvent, setPrevSelectedEvent] = useState(selectedEvent);
    if (selectedEvent !== prevSelectedEvent) {
        setPrevSelectedEvent(selectedEvent);
        if (teamMembers.length > 0) {
            setTeamMembers([]);
        }
        // Reset step when event changes
        if (step === 2) {
            setStep(1);
            setStep1Data(null);
        }
    }

    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
    const [screenshotBase64, setScreenshotBase64] = useState<string>("");

    const currentEvent = events.find(e => e.name === selectedEvent);
    const isTeamEvent = currentEvent && (parseInt(currentEvent.participants) > 1 || currentEvent.participants.includes("-"));

    // Parse max participants
    const getMaxParticipants = () => {
        if (!currentEvent) return 1;
        const parts = currentEvent.participants;
        if (parts.includes("-")) {
            return parseInt(parts.split("-")[1]);
        }
        return parseInt(parts) || 1;
    };


    const maxParticipants = getMaxParticipants();
    const canAddMember = teamMembers.length < maxParticipants - 1;

    // Calculate total amount
    const totalAmount = useMemo(() => {
        if (!currentEvent) return 0;
        const feeStr = currentEvent.fee;
        const feeNum = parseInt(feeStr.replace(/[^0-9]/g, "")) || 0;
        const isPerHead = feeStr.toLowerCase().includes("/head");
        const totalMembers = 1 + teamMembers.filter(m => m.trim() !== "").length;
        return isPerHead ? feeNum * totalMembers : feeNum;
    }, [currentEvent, teamMembers]);

    // Generate UPI URL
    const upiUrl = useMemo(() => {
        if (totalAmount <= 0) return "";
        return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(`Sangrila 2K26 - ${selectedEvent}`)}`;
    }, [totalAmount, selectedEvent]);

    const handleAddMember = () => {
        if (canAddMember) {
            setTeamMembers([...teamMembers, ""]);
        }
    };

    const handleRemoveMember = (index: number) => {
        const newMembers = [...teamMembers];
        newMembers.splice(index, 1);
        setTeamMembers(newMembers);
    };

    const handleMemberChange = (index: number, value: string) => {
        const newMembers = [...teamMembers];
        newMembers[index] = value;
        setTeamMembers(newMembers);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setStatus("error");
                setMessage("Screenshot size should be less than 5MB");
                return;
            }
            setScreenshot(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result as string);
                const base64 = (reader.result as string).split(",")[1];
                setScreenshotBase64(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    // Validate step 1 before proceeding
    const handleProceedToPayment = () => {
        // Check required fields
        const form = document.querySelector('form') as HTMLFormElement;
        if (!form) return;

        const name = (form.querySelector('[name="name"]') as HTMLInputElement)?.value;
        const phone = (form.querySelector('[name="phone"]') as HTMLInputElement)?.value;
        const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value;
        const college = (form.querySelector('[name="college"]') as HTMLInputElement)?.value;
        const rollno = (form.querySelector('[name="rollno"]') as HTMLInputElement)?.value;

        if (!name || !phone || !email || !college || !rollno || !selectedEvent) {
            setStatus("error");
            setMessage("Please fill all required fields before proceeding.");
            setTimeout(() => { setStatus("idle"); setMessage(""); }, 3000);
            return;
        }



        // Save Step 1 data to state before transitioning
        const teamNameInput = (form.querySelector('[name="teamName"]') as HTMLInputElement)?.value;
        setStep1Data({
            name: name,
            phone: phone,
            email: email,
            college: college,
            rollno: rollno,
            event: selectedEvent,
            teamName: teamNameInput || undefined,
        });

        setStatus("idle");
        setMessage("");
        setStep(2);
    };

    // REPLACE THIS URL with your Google Apps Script Web App URL after deployment
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFY2mvfb9fFgyVwPF3BsCzTh9HKmCt42LssqGmG8Ibq--p2wYjB_dIt4SyQ6D1Ie1lFA/exec";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // If on step 1, don't submit - go to step 2
        if (step === 1) {
            handleProceedToPayment();
            return;
        }

        if (!SCRIPT_URL || SCRIPT_URL.includes("REPLACE_THIS")) {
            setStatus("error");
            setMessage("Script URL not configured. Please check GOOGLE_SHEET_SETUP.md");
            return;
        }

        // Check transaction ID
        const form = e.currentTarget;
        const transactionId = (form.querySelector('[name="transactionId"]') as HTMLInputElement)?.value;
        if (!transactionId) {
            setStatus("error");
            setMessage("Please enter the Transaction ID / UTR number.");
            return;
        }

        if (!screenshot) {
            setStatus("error");
            setMessage("Please upload the payment screenshot to proceed.");
            return;
        }

        setStatus("loading");
        const formData = new FormData(form);

        // Explicitly append Step 1 data (since those fields are unmounted in Step 2)
        if (step1Data) {
            formData.append("name", step1Data.name);
            formData.append("phone", step1Data.phone);
            formData.append("email", step1Data.email);
            formData.append("college", step1Data.college);
            formData.append("rollno", step1Data.rollno);
            formData.append("event", step1Data.event);
            if (step1Data.teamName) {
                formData.append("teamName", step1Data.teamName);
            }
        }

        // Add additional members to formData explicitly with keys member_2, member_3...
        teamMembers.forEach((member, index) => {
            formData.append(`member_${index + 2}`, member);
        });

        // Calculate total amount based on event fee and team size
        if (currentEvent) {
            formData.append("amount", `₹${totalAmount}`);
        }

        // Add screenshot base64 to formData
        if (screenshotBase64) {
            formData.append("screenshot", screenshotBase64);
        }

        try {
            const params = new URLSearchParams();
            formData.forEach((value, key) => {
                params.append(key, value as string);
            });

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
            });

            setStatus("success");
            setMessage("Registration submitted successfully! Our team will verify your payment and contact you.");

            form.reset();
            setTeamMembers([]);
            setScreenshot(null);
            setScreenshotPreview(null);
            setScreenshotBase64("");
            setSelectedEvent("");
            setStep1Data(null);
            setStep(1);

        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setMessage("Submission failed. Ensure you have followed GOOGLE_SHEET_SETUP.md and deployed the script.");
        }
    };

    return (
        <section className="py-12 md:py-24 px-4 md:px-6 relative z-10 transition-all duration-500">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto p-5 sm:p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-[#11121d] border border-white/5 shadow-2xl relative overflow-hidden motion-gpu"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -ml-32 -mb-32" />

                <div className="relative z-10">
                    <div className="text-center mb-8 md:mb-12">
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter uppercase mb-4 transition-all duration-300 group-hover:drop-shadow-[0_10px_30px_rgba(241,90,36,0.2)] cursor-default relative group/reg"
                        >
                            <span className="transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">SANGRILA 2K26</span> - <span className="text-primary italic transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(241,90,36,0.8)]">REGISTRATION</span>
                        </motion.h2>
                        <div className="space-y-4 text-muted-foreground font-medium max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed">
                            <p className="text-white text-sm sm:text-base font-bold">Participate in the ultimate celebration of talent! 🎭✨</p>

                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 py-4 border-y border-white/5 my-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span>13-14 March, 2026</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(253,184,19,0.5)]" />
                                    <span>Geeta University</span>
                                </div>
                            </div>
                        </div>

                        {/* Step Indicator */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${step === 1 ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(241,90,36,0.15)]' : 'bg-white/5 text-white/30 border border-white/5'}`}>
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step === 1 ? 'bg-primary text-white' : step === 2 ? 'bg-green-500 text-white' : 'bg-white/10 text-white/30'}`}>
                                    {step === 2 ? '✓' : '1'}
                                </span>
                                Details
                            </div>
                            <div className={`w-8 h-[2px] rounded-full transition-all duration-500 ${step === 2 ? 'bg-primary' : 'bg-white/10'}`} />
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${step === 2 ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(241,90,36,0.15)]' : 'bg-white/5 text-white/30 border border-white/5'}`}>
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step === 2 ? 'bg-primary text-white' : 'bg-white/10 text-white/30'}`}>
                                    2
                                </span>
                                Payment
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

                        {/* ========== STEP 1: DETAILS ========== */}
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Full Name (Team Leader)</label>
                                            <div className="relative">
                                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                <input required name="name" type="text" placeholder="Your Name" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Phone Number</label>
                                            <div className="relative">
                                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                <input required name="phone" type="tel" placeholder="WhatsApp Number" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Email</label>
                                            <div className="relative">
                                                <Send className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                <input required name="email" type="email" placeholder="email@example.com" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">University / College</label>
                                            <div className="relative">
                                                <School className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                <input required name="college" type="text" placeholder="College Name" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Roll Number / ID</label>
                                            <div className="relative">
                                                <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                <input required name="rollno" type="text" placeholder="Ex: 2024GU001" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2 group">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Event</label>
                                            <div className="relative">
                                                <Trophy className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                <select
                                                    required
                                                    name="event"
                                                    value={selectedEvent}
                                                    onChange={(e) => setSelectedEvent(e.target.value)}
                                                    className="w-full pl-12 sm:pl-14 pr-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0a0b14] border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled style={{ background: '#1a1b2e', color: '#ffffff' }}>Select an Event</option>
                                                    {events.map(e => <option key={e.id} value={e.name} style={{ background: '#1a1b2e', color: '#ffffff' }}>{e.name} ({e.fee})</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Team Name for team events */}
                                    <AnimatePresence>
                                        {isTeamEvent && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-2 group"
                                            >
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Team Name</label>
                                                <div className="relative">
                                                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                    <input required name="teamName" type="text" placeholder="Enter Your Awesome Team Name" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Team Members Section */}
                                    {maxParticipants > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="space-y-4 p-6 rounded-3xl bg-white/5 border border-white/10"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                                                    Team Members ({1 + teamMembers.length}/{maxParticipants})
                                                </h3>
                                                {canAddMember && (
                                                    <button
                                                        type="button"
                                                        onClick={handleAddMember}
                                                        className="px-3 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-tighter hover:bg-primary hover:text-white transition-all flex items-center gap-1"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                        Add Member
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {teamMembers.map((member, index) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        key={index}
                                                        className="relative group"
                                                    >
                                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20">{index + 2}</div>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={member}
                                                            onChange={(e) => handleMemberChange(index, e.target.value)}
                                                            placeholder="Name & ID"
                                                            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-primary/50 transition-all"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveMember(index)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </div>
                                            {teamMembers.length === 0 && (
                                                <p className="text-[10px] text-white/30 text-center italic">Registering as solo. Use &quot;Add Member&quot; for team entries.</p>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Amount Preview */}
                                    {currentEvent && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-purple-500/10 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                                    <IndianRupee className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Amount</p>
                                                    <p className="text-2xl font-black text-white">₹{totalAmount}</p>
                                                </div>
                                            </div>
                                            <div className="text-right text-[10px] text-white/40">
                                                <p>{currentEvent.fee} × {1 + teamMembers.filter(m => m.trim() !== "").length} member{(1 + teamMembers.filter(m => m.trim() !== "").length) > 1 ? 's' : ''}</p>
                                                <p className="text-white/60 font-bold">{selectedEvent}</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Proceed to Payment Button */}
                                    <motion.button
                                        type="button"
                                        onClick={handleProceedToPayment}
                                        disabled={!selectedEvent}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 md:py-5 rounded-[2rem] bg-gradient-to-r from-secondary via-primary to-purple-600 text-white font-black text-xs md:text-sm uppercase tracking-widest shadow-xl hover:shadow-[0_0_40px_rgba(241,90,36,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden group/btn"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] animate-[shimmer_4s_infinite]" />
                                        <span className="relative z-10">Proceed to Payment</span>
                                        <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* ========== STEP 2: PAYMENT ========== */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 md:space-y-8"
                                >
                                    {/* Back Button */}
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest transition-colors group/back"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover/back:-translate-x-1 transition-transform" />
                                        Back to Details
                                    </button>

                                    {/* Event & Amount Summary */}
                                    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Selected Event</p>
                                                <p className="text-lg font-black text-white">{selectedEvent}</p>
                                                <p className="text-[10px] text-white/40 mt-1">
                                                    {currentEvent?.fee} × {1 + teamMembers.filter(m => m.trim() !== "").length} member{(1 + teamMembers.filter(m => m.trim() !== "").length) > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Pay Amount</p>
                                                <p className="text-3xl font-black text-green-400">₹{totalAmount}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Section */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                        {/* Payment QR Section */}
                                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 text-center space-y-4 hover:bg-white/10 transition-colors duration-500 group h-full">
                                            <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center justify-center gap-2">
                                                <QrCode className="w-3 h-3 text-secondary animate-pulse" />
                                                Scan & Pay ₹{totalAmount}
                                            </h3>

                                            {/* Dynamic QR Code */}
                                            <div className="relative w-48 h-48 mx-auto bg-white rounded-2xl p-3 shadow-[0_0_30px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                                {upiUrl ? (
                                                    <QRCodeSVG
                                                        value={upiUrl}
                                                        size={168}
                                                        bgColor="#ffffff"
                                                        fgColor="#000000"
                                                        level="H"
                                                        includeMargin={false}
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-xs text-center">Select event to generate QR</div>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                                                    <IndianRupee className="w-3 h-3 text-green-400" />
                                                    <span className="text-sm font-black text-green-400">₹{totalAmount}</span>
                                                </div>
                                                <p className="text-[10px] text-white font-bold">Account: {UPI_NAME}</p>
                                                <p className="text-[10px] text-white/40 font-mono break-all hover:text-primary transition-colors cursor-pointer select-all">{UPI_ID}</p>
                                            </div>
                                        </div>

                                        {/* Transaction ID & Screenshot Section */}
                                        <div className="space-y-4">
                                            {/* Transaction ID */}
                                            <div className="space-y-2 group">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2 group-focus-within:text-primary transition-colors">Transaction ID / UTR</label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50 group-focus-within:text-primary transition-colors" />
                                                    <input required name="transactionId" type="text" placeholder="Enter Transaction ID / UTR" className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all" />
                                                </div>
                                            </div>

                                            {/* Screenshot Upload Section */}
                                            <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10 text-center space-y-4 hover:bg-white/10 transition-colors duration-500 flex flex-col items-center justify-center">
                                                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center justify-center gap-2">
                                                    <Camera className="w-3 h-3 text-primary animate-pulse" />
                                                    Payment Screenshot
                                                </h3>

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                />

                                                {screenshotPreview ? (
                                                    <div className="relative group/preview w-full">
                                                        <div className="relative w-40 h-52 mx-auto rounded-xl overflow-hidden border-2 border-primary/50 shadow-[0_0_20px_rgba(241,90,36,0.2)]">
                                                            <Image
                                                                src={screenshotPreview}
                                                                alt="Payment Screenshot"
                                                                fill
                                                                unoptimized
                                                                className="object-cover"
                                                            />
                                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
                                                                >
                                                                    <Upload className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setScreenshot(null);
                                                                setScreenshotPreview(null);
                                                                setScreenshotBase64("");
                                                            }}
                                                            className="mt-3 text-[10px] text-red-500 font-bold uppercase tracking-widest hover:underline"
                                                        >
                                                            Remove & Re-upload
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current?.click()}
                                                        className="w-full h-36 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-all text-white/40 hover:text-white group"
                                                    >
                                                        <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-all">
                                                            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-xs font-bold uppercase tracking-tight">Upload Screenshot</p>
                                                            <p className="text-[10px] opacity-50">PNG, JPG up to 5MB</p>
                                                        </div>
                                                    </button>
                                                )}
                                                {!screenshot && (
                                                    <p className="text-[10px] text-red-400 font-medium flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        Payment screenshot is mandatory
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Register Button */}
                                    <motion.button
                                        disabled={status === "loading"}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full py-4 md:py-5 rounded-[2rem] bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white font-black text-xs md:text-sm uppercase tracking-widest shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden group/btn"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] animate-[shimmer_4s_infinite]" />
                                        {status === "loading" ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span className="relative z-10">Register & Submit Payment</span>
                                                <CheckCircle2 className="w-5 h-5 relative z-10 group-hover/btn:scale-110 transition-transform" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Status Messages */}

                        <AnimatePresence>
                            {status === "success" && (
                                <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="p-6 md:p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center space-y-4 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.2 }}
                                        className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center"
                                    >
                                        <CheckCircle2 className="w-10 h-10 text-green-400" />
                                    </motion.div>
                                    <h3 className="text-xl md:text-2xl font-black text-green-400 uppercase tracking-wider">Registration Successful!</h3>
                                    <p className="text-green-400/70 text-sm font-medium">{message}</p>
                                    <a
                                        href="https://wa.me/918168906211?text=Hi%2C%20I%20just%20registered%20for%20Sangrila%202K26.%20I%20have%20a%20query."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-full text-xs font-black uppercase tracking-widest transition-all border border-green-500/20"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                        <span>Chat on WhatsApp</span>
                                    </a>
                                </motion.div>
                            )}
                            {status === "error" && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                                    <AlertCircle className="w-4 h-4" />
                                    {message || "Submission failed. Please try again."}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}

export function RegistrationForm() {
    return (
        <Suspense fallback={<div className="h-[800px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="text-white/50 font-black uppercase tracking-widest text-xs">Loading Secure Form...</p>
            </div>
        </div>}>
            <RegistrationFormContent />
        </Suspense>
    );
}
