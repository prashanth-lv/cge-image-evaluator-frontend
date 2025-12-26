const evaluatorImages = [
    "/GettyImages-170585283.jpg",
    "/GettyImages-579721334.jpg",
    "/GettyImages-592042405.jpg",
    "/GettyImages-926810046.jpg",
    "/GettyImages-2148113067.jpg",
    "/shutterstock_2483595635.jpg",
];

export function preloadEvaluatorAssets() {
    return Promise.all(
        evaluatorImages.map(
            src =>
                new Promise(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = resolve;
                })
        )
    );
}
