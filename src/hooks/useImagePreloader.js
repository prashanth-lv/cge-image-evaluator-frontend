import { useEffect, useState } from "react";

export function useImagePreloader(images = []) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!images.length) {
            setLoaded(true);
            return;
        }

        let completed = 0;

        images.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => {
                completed++;
                if (completed === images.length) {
                    setLoaded(true);
                }
            };
        });
    }, [images]);

    return loaded;
}
