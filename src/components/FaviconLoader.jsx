import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function FaviconLoader() {
    const location = useLocation();

    useEffect(() => {
        const favicon = document.getElementById("favicon");
        if (!favicon) return;

        // Show loading favicon
        favicon.href = "/favicon-loading.svg";

        // Revert to idle after a short delay
        const handle = setTimeout(() => {
            favicon.href = "/favicon-idle.svg";
        }, 500);

        return () => clearTimeout(handle);
    }, [location]);

    return null;
}
