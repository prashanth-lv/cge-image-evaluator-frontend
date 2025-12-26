import React, { useEffect, useState } from "react";
import {
    Users,
    BookOpen,
    Star,
    BarChart2,
    Globe,
    MapPin,
    Scan,
} from "lucide-react";
import { Button } from "../ui/button";

const imageTiles = [
    "/GettyImages-170585283.jpg",
    "/GettyImages-579721334.jpg",
    "/GettyImages-592042405.jpg",
    "/GettyImages-926810046.jpg",
    "/GettyImages-2148113067.jpg",
    "/shutterstock_2483595635.jpg",
];

export default function HomeIllustration({ onContinue }) {
    const [loadedImages, setLoadedImages] = useState([]);
    const [allLoaded, setAllLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const preload = async () => {
            const promises = imageTiles.map(
                (src) =>
                    new Promise((resolve) => {
                        const img = new Image();
                        img.src = src;
                        img.decoding = "async";
                        img.onload = () => resolve(src);
                        img.onerror = () => resolve(src);
                    })
            );

            const results = await Promise.all(promises);

            if (isMounted) {
                setLoadedImages(results);
                setAllLoaded(true);
            }
        };

        preload();

        return () => {
            isMounted = false;
        };
    }, []);

    if (!allLoaded) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden animate-fadeIn">
            {/* AMBIENT BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-300 rounded-full blur-[150px] opacity-25" />
                <div className="absolute top-1/4 -right-40 w-[420px] h-[420px] bg-purple-300 rounded-full blur-[150px] opacity-20" />
                <div className="absolute bottom-0 left-1/4 w-[620px] h-[320px] bg-cyan-200 blur-[180px] opacity-25" />
            </div>

            {/* MAIN CONTENT */}
            <div
                className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center"
                style={{ top: "-2rem" }}
            >
                {/* LEFT TEXT */}
                <div className="space-y-6">
                    <h1 className="text-5xl font-semibold text-gray-900 leading-tight">
                        Your journey to choosing the{" "}
                        <span className="text-blue-700">perfect image</span> starts here
                    </h1>
                    <p className="text-xl text-gray-600 max-w-xl">
                        Assess images for their marketability, with audience perceptions
                        based on real-time, cultural & historical and geopolitical
                        interpretations of the image elements.
                    </p>
                    <Button
                        onClick={onContinue}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-base font-medium shadow-md transition-all hover:underline"
                    >
                        Continue to upload
                    </Button>
                </div>

                {/* RIGHT IMAGE GRID */}
                <div className="relative hidden lg:block">
                    <div className="relative w-full h-[480px] rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-xl" style={{ marginLeft: "-3rem" }}>
                        {/* IMAGE GRID */}
                        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-8">
                            {loadedImages.map((src, i) => (
                                <div key={i} className="relative rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={src}
                                        alt="Visual sample"
                                        className="w-full h-full object-cover scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-white/60" />
                                    <div className="absolute inset-0 rounded-xl ring-1 ring-white/40" />
                                </div>
                            ))}
                        </div>

                        {/* SCANNING LENS */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-48 h-48 rounded-full border-4 border-blue-500/50 bg-white/40 backdrop-blur shadow-xl">
                                <Scan size={52} className="absolute inset-0 m-auto text-blue-700" />
                                <div className="absolute left-0 w-full h-1 bg-blue-500/70 animate-scan" />
                                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse" />
                            </div>
                        </div>

                        {/* BADGES */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-12 -left-12">
                                <div className="animate-inward">
                                    <Badge icon={Users} label="Audience Perceptions" color="indigo" />
                                </div>
                            </div>
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                <Badge icon={BookOpen} label="Cultural & Historical Associations" color="green" />
                            </div>
                            <div className="absolute -top-12 -right-12">
                                <div className="animate-inward-reverse">
                                    <Badge icon={Star} label="Recommendations" color="amber" />
                                </div>
                            </div>
                            <div className="absolute -bottom-12 -left-12">
                                <div className="animate-inward">
                                    <Badge icon={BarChart2} label="Real-Time Risk Analysis" color="blue" />
                                </div>
                            </div>
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                                <Badge icon={Globe} label="Geopolitical Sensitivity Filtering" color="purple" />
                            </div>
                            <div className="absolute -bottom-12 -right-12">
                                <div className="animate-inward-reverse">
                                    <Badge icon={MapPin} label="Contextual Metadata" color="cyan" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ANIMATIONS */}
            <style>
                {`
          @keyframes inward { 0% { transform: translateX(-22px); opacity: 0.85; } 50% { transform: translateX(-10px); opacity:1; } 100% { transform: translateX(-22px); opacity:0.85; } }
          @keyframes inwardReverse { 0% { transform: translateX(22px); opacity: 0.85; } 50% { transform: translateX(10px); opacity:1; } 100% { transform: translateX(22px); opacity:0.85; } }
          .animate-inward { animation: inward 12s ease-in-out infinite; }
          .animate-inward-reverse { animation: inwardReverse 12s ease-in-out infinite; }
          .delay-1 { animation-delay: 0.6s; }
          .delay-2 { animation-delay: 1.2s; }
          .delay-3 { animation-delay: 1.8s; }
          @keyframes scan { 0% { top:12%; } 50% { top:80%; } 100% { top:12%; } }
          .animate-scan { animation: scan 4s ease-in-out infinite; }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
          @keyframes fadeIn { from { opacity:0; transform: translateY(6px); } to { opacity:1; transform: translateY(0); } }
        `}
            </style>
        </section>
    );
}

/* BADGE COMPONENT */
function Badge({ icon: Icon, label, color }) {
    const colors = {
        blue: "bg-blue-100 text-blue-700",
        purple: "bg-purple-100 text-purple-700",
        cyan: "bg-cyan-100 text-cyan-700",
        green: "bg-green-100 text-green-700",
        indigo: "bg-indigo-100 text-indigo-700",
        amber: "bg-amber-100 text-amber-700",
    };
    return (
        <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm text-sm font-medium whitespace-nowrap ${colors[color]}`}
        >
            <Icon size={16} />
            {label}
        </div>
    );
}
