import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import ImageUploader from "../components/helper/ImageUploader";
import HomeIllustration from "../components/helper/HomeIllustration";
import PageLoader from "../components/PageLoader";
import { useImagePreloader } from "../hooks/useImagePreloader";

const preloadImages = [
  "/GettyImages-170585283.jpg",
  "/GettyImages-579721334.jpg",
  "/GettyImages-592042405.jpg",
  "/GettyImages-926810046.jpg",
  "/GettyImages-2148113067.jpg",
  "/shutterstock_2483595635.jpg",
];

const Home = () => {
  const uploadRef = useRef(null);
  const imagesReady = useImagePreloader(preloadImages);
  const location = useLocation();

  // ✅ Scroll AFTER navigation when coming back
  useEffect(() => {
    if (location.state?.scrollToUpload) {
      uploadRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location]);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (!imagesReady) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />

      {/* Illustration section */}
      <HomeIllustration onContinue={scrollToUpload} />

      {/* Upload section */}
      <section ref={uploadRef} className="min-h-screen flex items-center">
        <ImageUploader />
      </section>
    </div>
  );
};

export default Home;
