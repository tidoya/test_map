export function getImageCircle(width: number): [number, Uint8Array] {
  const bytesPerPixel = 4;
  const data = new Uint8Array(width * width * bytesPerPixel);
  const centerX = width / 2; 
  const centerY = width / 2; 
  const radius = width / 4; 
  const centerPointRadius = 2;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      const offset = (y * width + x) * bytesPerPixel;
      const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const isInCircle = distanceToCenter <= radius + 0.5; 
      const isInCenterPoint = distanceToCenter <= centerPointRadius + 0.5; 

      if (isInCircle) {
        const gradientFactor = 1 - Math.pow(distanceToCenter / radius, 2);
        const colorIntensity = 128 + gradientFactor * 127; 
        data[offset + 0] = colorIntensity;
        data[offset + 1] = 0;
        data[offset + 2] = colorIntensity; 
        data[offset + 3] = 255; 
      } 

      if (isInCenterPoint) {
        data[offset + 0] = 255; 
        data[offset + 1] = 255;
        data[offset + 2] = 255; 
        data[offset + 3] = 255; 
      }
    }
  }
  return [width, data]
}
