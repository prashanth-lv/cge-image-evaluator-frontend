import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import {
    CheckCircle,
    AlertTriangle,
    ShieldCheck,
    Globe
} from "lucide-react";
import { useImagePreloader } from "../../hooks/useImagePreloader";
import PageLoader from "../../components/PageLoader";


const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const preloadImages = [
        "/Azure-DeveloperTools-Scene-2.png",
    ];


    const handleMicrosoftLogin = async () => {
        try {
            setLoading(true);
            await login();                 // WAIT for auth
            navigate("/welcome");        // Navigate only after success
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const imagesReady = useImagePreloader(preloadImages);

    if (!imagesReady) {
        return <PageLoader />;
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-b from-blue-50 to-white overflow-hidden">

            {/* ---------- HEADER ---------- */}
            <header className="absolute top-0 left-0 right-0 flex items-center px-[60px] py-4 bg-white/80 backdrop-blur z-10 border-b border-gray-200 h-[54px]">

                <div className="flex items-center gap-4">

                    <img
                        src="https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png"
                        alt="Microsoft Logo"
                        role="presentation"
                        aria-hidden="true"
                        className="h-[23px] w-auto"
                    />


                    <span className="h-6 w-[2px] bg-black" />

                    <span className="text-[17px] font-semibold text-gray-900">
                        CGE Image Evaluator
                    </span>
                </div>

            </header>


            {/* ---------- TOP CONTENT ---------- */}
            <div className="absolute top-24 left-0 right-0 flex flex-col items-center gap-4 px-6 z-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center">
                    Welcome to CGE Image Evaluator
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 text-center">
                    Quality visuals, verified for impact
                </p>

                <Button
                    onClick={handleMicrosoftLogin}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-5 text-lg font-medium rounded-md shadow-lg flex items-center gap-3 hover:underline"
                >
                    <svg width="21" height="21" viewBox="0 0 21 21">
                        <rect width="10" height="10" fill="#F25022" />
                        <rect x="11" width="10" height="10" fill="#7FBA00" />
                        <rect y="11" width="10" height="10" fill="#00A4EF" />
                        <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
                    </svg>
                    Sign In with SSO
                </Button>
            </div>

            {/* ---------- BOTTOM SECTION ---------- */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-12 px-6 pb-8 w-full">

                {/* LEFT IMAGE */}
                <div className="relative w-1/2 max-w-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 blur-[120px] opacity-40 rounded-3xl" />
                    <img
                        src="/Azure-DeveloperTools-Scene-2.png"
                        alt="Illustration"
                        className="relative w-full max-h-[60vh] animate-[floatSlow_10s_ease-in-out_infinite]"
                    />
                </div>

                {/* RIGHT FEATURES */}
                <div className="w-1/2 max-w-xl space-y-6">
                    <p className="text-lg">
                        Evaluate images on their elements across dynamic, contextual, and interpretive dimensions with <strong>CGE Image Evaluator</strong>.
                    </p>

                    {[
                        {
                            title: "Recommendations",
                            icon: CheckCircle,
                            color: "green"
                        },
                        {
                            title: "Real-time Risk Analysis",
                            icon: AlertTriangle,
                            color: "blue"
                        },
                        {
                            title: "Cultural & Historical Associations",
                            icon: ShieldCheck,
                            color: "amber"
                        },
                        {
                            title: "Geopolitical Sensitivity Filtering",
                            icon: Globe,
                            color: "purple"
                        }
                    ].map((f, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className={`w-12 h-12 rounded-full bg-${f.color}-100 text-${f.color}-700 flex items-center justify-center`}>
                                ✔
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-blue-900">
                                    {f.title}
                                </h3>
                                <p className="text-gray-600">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------- ANIMATION ---------- */}
            <style>
                {`
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                `}
            </style>
        </div>
    );
};

export default Login;
