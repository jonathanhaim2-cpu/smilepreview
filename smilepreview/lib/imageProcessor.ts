/**
 * Client-side Canvas image processor.
 * Whitens tooth-colored pixels and brightens the overall image
 * to produce a visible "after treatment" simulation.
 */
export function processSmileImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas not supported")); return; }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Detect tooth-coloured pixels:
        // yellowish-white range — high R/G, lower B, not pure gum pink, not dark
        const isToothPixel =
          r > 140 && g > 110 && b > 60 &&   // bright enough
          r < 250 &&                          // not already pure white
          r >= g && g >= b &&                 // yellowish (R≥G≥B)
          Math.abs(r - g) < 70 &&             // not too saturated
          !(r > 180 && g < 100 && b < 100);  // exclude red/pink gum tones

        if (isToothPixel) {
          // Whiten: push toward white, remove yellow cast
          const blend = 0.55; // 0 = no change, 1 = pure white
          data[i]     = Math.min(255, Math.round(r + (255 - r) * blend));
          data[i + 1] = Math.min(255, Math.round(g + (255 - g) * blend));
          data[i + 2] = Math.min(255, Math.round(b + (255 - b) * (blend + 0.2))); // extra blue to de-yellow
        } else {
          // Slight overall brightness lift on everything else
          data[i]     = Math.min(255, Math.round(r * 1.05));
          data[i + 1] = Math.min(255, Math.round(g * 1.05));
          data[i + 2] = Math.min(255, Math.round(b * 1.05));
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Second pass: overall contrast boost via composite
      ctx.globalCompositeOperation = "multiply";
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = "#e8f4ff"; // cool blue tint — whiter feel
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = reject;
    img.src = imageUrl;
  });
}
