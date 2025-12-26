import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Download,
    ZoomIn,
    AlertTriangle,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Header from "../components/Header";

const generateMockAnalysis = (images) => {
    const categories = ["NATURE", "WILDLIFE", "URBAN", "LANDSCAPE", "PORTRAIT"];

    return images.map((img, idx) => {
        const score = +(5 + Math.random() * 5).toFixed(1);

        const status =
            score >= 8.5 ? "excellent" :
                score >= 7 ? "good" :
                    "warning";

        return {
            ...img,
            id: idx,
            category: categories[Math.floor(Math.random() * categories.length)],
            status,
            score,
            recommendations: [
                score >= 8 ? "Image quality is excellent" : "Consider improving clarity and lighting"
            ],
            realTimeAnalysis: "Research shows foxes are equally curious about human food sources regardless of whether they live in rural or urban settings.",
            historicalAnalysis: "Foxes are present in mythologies and folklores of various cultures, often associated with cunning, adaptability, and transformation.",
            regionalAnalysis: {
                "United States": {
                    audiencePerception: "Viewers will likely perceive the image as endearing, evoking positive emotional responses.",
                    geopol: "No Geopol Flags identified"
                },
                Europe: {
                    audiencePerception: "European viewers may associate the fox with folklore and cunning traits.",
                    geopol: "No Geopol Flags identified"
                },
                Asia: {
                    audiencePerception: "Asian viewers may link the fox to kitsune legends in Japanese culture.",
                    geopol: "No Geopol Flags identified"
                }
            },
            metadata: {
                objects: "two young foxes, mound of dirt, green plants",
                foreground: "two young foxes",
                background: "blurred vegetation, distant hillside",
                resonatingObject: "two young foxes",
                colors: "light brown, tan, cream, green",
                dominant: "green",
                scene: "wildlife in natural habitat",
                context: "nature",
                theme: "animals",
                mood: "peaceful, natural",
                action: "standing together on a mound",
                location: "outdoor, wild area, possibly a forest edge or field",
                season: "spring or summer",
                timeOfDay: "daytime, likely morning or late afternoon",
                geographicIndicators: "N/A"
            }
        };
    });
};

const statusStyles = {
    excellent: {
        gradient: "from-green-400 via-green-300 to-green-500",
        badge: "bg-green-500"
    },
    good: {
        gradient: "from-yellow-400 via-yellow-300 to-yellow-500",
        badge: "bg-yellow-500"
    },
    warning: {
        gradient: "from-red-400 via-red-300 to-red-500",
        badge: "bg-red-500"
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case "excellent": return <CheckCircle2 size={16} />;
        case "good": return <AlertCircle size={16} />;
        case "warning": return <AlertTriangle size={16} />;
        default: return null;
    }
};

const getStatusGradient = (status) => statusStyles[status]?.gradient || "from-gray-300 to-gray-400";

export default function AnalysisResults() {
    const location = useLocation();
    const navigate = useNavigate();
    const [analyzedImages, setAnalyzedImages] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (location.state?.images) {
            const analyzed = generateMockAnalysis(location.state.images);
            setAnalyzedImages(analyzed);
        } else {
            navigate('/');
        }
    }, [location, navigate]);

    const filteredImages = selectedStatus === "all"
        ? analyzedImages
        : analyzedImages.filter(img => img.status === selectedStatus);

    const statusCounts = {
        all: analyzedImages.length,
        excellent: analyzedImages.filter(img => img.status === "excellent").length,
        good: analyzedImages.filter(img => img.status === "good").length,
        warning: analyzedImages.filter(img => img.status === "warning").length
    };

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
    };

    const filterTabStyles = {
        all: {
            active: "bg-gray-900 text-white",
            inactive: "bg-gray-100 text-gray-700 hover:bg-gray-200"
        },
        excellent: {
            active: "bg-green-500 text-white",
            inactive: "bg-green-50 text-green-700 hover:bg-green-100"
        },
        good: {
            active: "bg-yellow-500 text-white",
            inactive: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
        },
        warning: {
            active: "bg-red-500 text-white",
            inactive: "bg-red-50 text-red-700 hover:bg-red-100"
        }
    };


    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Findings</h1>
                            <p className="text-gray-600">Review your image analysis results</p>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => navigate("/welcome", { state: { scrollToUpload: true } })
                                }
                                className="hover:underline"
                            >
                                <ArrowLeft size={18} className="mr-2" />
                                Back to Upload
                            </Button>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                <Download size={18} className="mr-2" />
                                Download Report
                            </Button>
                        </div>
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 mb-6">
                        <div className="flex gap-3">
                            {["all", "excellent", "good", "warning"].map(status => {
                                const label = status === "all" ? "All Images" :
                                    status === "excellent" ? "Excellent" :
                                        status === "good" ? "Good" : "Needs Attention";
                                const count = statusCounts[status];
                                return (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2
    ${selectedStatus === status
                                                ? filterTabStyles[status].active
                                                : filterTabStyles[status].inactive
                                            }`}
                                    >
                                        {status !== "all" && getStatusIcon(status)}
                                        {label} ({count})
                                    </button>

                                );
                            })}
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Image Carousel</h2> */}

                        {filteredImages.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                No images found for this filter
                            </div>
                        ) : (
                            <div className="relative flex items-center">
                                {/* LEFT ARROW */}
                                <button
                                    onClick={() => scroll("left")}
                                    className="mr-4 bg-black/40 backdrop-blur-md text-white shadow-xl hover:bg-black/60 p-3 rounded-full transition z-10"
                                >
                                    <ChevronLeft />
                                </button>

                                {/* IMAGE STRIP */}
                                <div
                                    ref={scrollRef}
                                    className="flex gap-6 overflow-x-auto scroll-smooth py-4 px-2"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {filteredImages.map((img) => (
                                        <div
                                            key={img.id}
                                            onClick={() => navigate('/analysis-detail', { state: { image: img } })}
                                            className={`min-w-[280px] relative group rounded-xl overflow-hidden
                        bg-gradient-to-br ${getStatusGradient(img.status)} shadow-[0_0_15px_rgba(0,0,0,0.1)]
                        transition-all duration-300 hover:-translate-y-2 cursor-pointer`}
                                        >
                                            <div className="bg-white rounded-lg overflow-hidden">
                                                <img
                                                    src={img.url}
                                                    alt={img.name}
                                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>

                                            {/* Overlay on Hover */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                                                        <ZoomIn size={16} className="mr-2" />
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Score Badge */}
                                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                                <Badge className={`text-white font-bold ${statusStyles[img.status].badge}`}>
                                                    {img.score} / 10
                                                </Badge>
                                            </div>

                                            {/* Status Icon */}
                                            <div className={`absolute top-3 left-3 ${statusStyles[img.status].badge} text-white p-2 rounded-full`}>
                                                {getStatusIcon(img.status)}
                                            </div>

                                            {/* Info Footer */}
                                            <div className="bg-white p-4">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate mb-1">{img.name}</h3>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600">{img.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* RIGHT ARROW */}
                                <button
                                    onClick={() => scroll("right")}
                                    className="ml-4 bg-black/40 backdrop-blur-md text-white shadow-xl hover:bg-black/60 p-3 rounded-full transition z-10"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
}