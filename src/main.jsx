import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => console.log("SW registered:", reg))
      .catch((err) => console.error("SW registration failed:", err));
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove top loader after React is ready
const loader = document.getElementById("top-loader");
if (loader) {
  loader.style.transition = "opacity 0.3s ease";
  loader.style.opacity = "0";
  setTimeout(() => loader.remove(), 300);
}
