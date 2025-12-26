import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import Header from "../components/Header";

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

export default function AnalysisDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openRegion, setOpenRegion] = useState("United States");

    const selectedImage = location.state?.image;
    if (!selectedImage) {
        navigate("/"); // fallback
        return null;
    }

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Top Controls */}
                    <div className="mb-6 flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="hover:underline"
                        >
                            <ArrowLeft size={18} className="mr-2" />
                            Back to Analysis
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Download size={18} className="mr-2" />
                            Download Report
                        </Button>
                    </div>

                    {/* Image & Score */}
                    <div className="flex justify-center items-center">
                        <div
                            className="p-1 rounded-xl"
                            style={{
                                boxShadow: `0 0 40px ${selectedImage.status === "excellent"
                                    ? "rgba(34,197,94,0.3)"   // green
                                    : selectedImage.status === "good"
                                        ? "rgba(234,179,8,0.3)"   // yellow
                                        : "rgba(239,68,68,0.3)"   // red
                                    }`,
                            }}
                        >
                            <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center p-6" style={{ minWidth: "300px", minHeight: "400px" }}>

                                {/* Centered Image */}
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.name}
                                    className="max-w-full max-h-[300px] object-contain mb-4"
                                />

                                {/* Details in the same line */}
                                <div className="flex items-center gap-4">
                                    <Badge className={`${statusStyles[selectedImage.status].badge} text-white font-bold`}>
                                        Score: {selectedImage.score} / 10
                                    </Badge>
                                    <span className="text-gray-600 font-medium">{selectedImage.name}</span>
                                    <span className="text-gray-500">{selectedImage.category}</span>
                                </div>

                            </div>
                        </div>
                    </div>



                    {/* Recommendations & Analyses */}
                    <div className="space-y-4 mt-6">
                        {selectedImage.recommendations && (
                            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                <h4 className="font-semibold text-green-900 mb-2">Recommendations</h4>
                                <ul className="space-y-1 text-sm text-green-800">
                                    {selectedImage.recommendations.map((rec, idx) => (
                                        <li key={idx}>• {rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {selectedImage.realTimeAnalysis && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Real Time Analysis</h4>
                                <p className="text-sm text-gray-700">{selectedImage.realTimeAnalysis}</p>
                            </div>
                        )}

                        {selectedImage.historicalAnalysis && (
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Historical & Cultural Analysis</h4>
                                <p className="text-sm text-gray-700">{selectedImage.historicalAnalysis}</p>
                            </div>
                        )}
                    </div>

                    {/* Regional Analysis */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Regional Analysis:</h3>
                        <div className="flex gap-2 mb-2">
                            {["United States", "Europe", "Asia"].map(region => (
                                <button
                                    key={region}
                                    onClick={() => setOpenRegion(region)}
                                    className={`px-4 py-2 rounded-lg font-medium ${openRegion === region
                                        ? "bg-blue-400 text-white"
                                        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                                        }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg space-y-3">
                            {selectedImage.regionalAnalysis?.[openRegion]?.audiencePerception && (
                                <div className="bg-yellow-50 p-2 rounded-lg">
                                    <strong>Audience Perception:</strong>
                                    <p className="text-sm">{selectedImage.regionalAnalysis[openRegion].audiencePerception}</p>
                                </div>
                            )}
                            {selectedImage.regionalAnalysis?.[openRegion]?.geopol && (
                                <div className="bg-pink-50 p-2 rounded-lg">
                                    <strong>Geopol:</strong>
                                    <p className="text-sm">{selectedImage.regionalAnalysis[openRegion].geopol}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Metadata Attributes */}
                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">Metadata Attributes</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            {selectedImage.metadata && Object.entries(selectedImage.metadata).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                    <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
