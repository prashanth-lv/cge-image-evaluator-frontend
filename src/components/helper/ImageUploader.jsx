import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileImage,
  Upload,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";

export default function ImageUploader() {
  const [images, setImages] = useState([]);
  const [popup, setPopup] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const showPopup = (msg) => {
    setPopup(msg);
    setTimeout(() => setPopup(""), 3000);
  };

  const processFiles = (files) => {
    const selected = Array.from(files).slice(0, 5);

    const readers = selected.map((file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          requestAnimationFrame(() => {
            resolve({
              name: file.name,
              size: file.size,
              url: e.target.result,
            });
          });
        };
        reader.readAsDataURL(file);
      })
    );

    Promise.all(readers).then(setImages);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    showPopup("Analyzing images...");

    // Simulate analysis and navigate to results
    setTimeout(() => {
      setAnalyzing(false);
      navigate('/results', { state: { images } });
    }, 2000);
  };

  const totalSizeMB = (
    images.reduce((t, img) => t + img.size, 0) / 1024 / 1024
  ).toFixed(2);

  const openPicker = () => fileInputRef.current.click();

  const scroll = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 w-full">
      {/* ---------- POPUP ---------- */}
      {popup && (
        <div className="fixed top-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg z-50">
          {popup}
        </div>
      )}

      {/* ---------- IMAGE PREVIEW MODAL ---------- */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-3 -right-3 bg-white hover:bg-red-500 hover:text-white p-2 rounded-full shadow"
              onClick={() => setPreviewImage(null)}
            >
              <X size={18} />
            </button>

            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ---------- MAIN WHITE BOX ---------- */}
      <div
        className="
    bg-white
    rounded-2xl
    p-8
    border border-gray-200
    shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]
    ring-1 ring-black/5
    relative
  "
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {images.length > 0 ? "Analyse Images" : "Upload Images for Evaluation"}
        </h2>

        {images.length > 0 && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✔ Image(s) uploaded successfully
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => processFiles(e.target.files)}
        />

        {/* ---------- EMPTY STATE ---------- */}
        {images.length === 0 && (
          <div
            onClick={openPicker}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              processFiles(e.dataTransfer.files);
            }}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer
                       transition-all duration-300 hover:border-blue-500"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>

              <div>
                <p className="text-lg font-medium text-gray-700">
                  Drop your images here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Supports JPG, JPEG, PNG
                </p>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 hover:underline">
                <FileImage size={18} className="mr-2" />
                Select Files
              </Button>
            </div>
          </div>
        )}

        {/* ---------- UPLOADED STATE ---------- */}
        {images.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-700 space-y-1">
                <div><strong>Status:</strong> <span className="text-green-600">Ready</span></div>
                <div><strong>No. of Files:</strong> {images.length}</div>
                <div><strong>Total Size:</strong> {totalSizeMB} MB</div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={openPicker} className="hover:underline">
                  <Upload size={16} className="mr-2" />
                  Upload Different Images
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className="bg-[#00188F] hover:bg-[#001067] text-white hover:underline disabled:opacity-50"
                >
                  {analyzing ? "Analyzing..." : "Analyse Images"}
                </Button>
              </div>
            </div>

            {/* ---------- THUMBNAILS WITH FLOATING SCROLL ---------- */}
            <div className="relative flex items-center">
              {/* LEFT ARROW */}
              <button
                onClick={() => scroll("left")}
                className="mr-4 bg-black/40 backdrop-blur-md text-white
                           shadow-xl hover:bg-black/60
                           p-3 rounded-full transition"
              >
                <ChevronLeft />
              </button>

              {/* IMAGE STRIP */}
              <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto scroll-smooth py-2"
              >
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="min-w-[160px] relative group rounded-lg overflow-hidden border
                               shadow-md transition-all duration-300
                               hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      onClick={() => setPreviewImage(img.url)}
                      className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white
                                 p-1 rounded-full shadow transition hover:scale-110 z-10"
                    >
                      <Trash2 size={16} />
                    </div>

                    <div className="px-2 py-1 text-xs text-gray-700 truncate bg-white">
                      {img.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT ARROW */}
              <button
                onClick={() => scroll("right")}
                className="ml-4 bg-black/40 backdrop-blur-md text-white
                           shadow-xl hover:bg-black/60
                           p-3 rounded-full transition"
              >
                <ChevronRight />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}