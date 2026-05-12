"use client";

import { useState } from "react";

export default function ImageMagnifier({ src, alt }: { src: string; alt: string }) {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  
  const magnifierHeight = 200;
  const magnifierWidth = 200;
  const zoomLevel = 2.5;

  return (
    <div 
      className="relative w-full h-full cursor-crosshair overflow-hidden"
      onMouseEnter={(e) => {
        const elem = e.currentTarget;
        const { width, height } = elem.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
      }}
      onMouseMove={(e) => {
        const elem = e.currentTarget;
        const { top, left } = elem.getBoundingClientRect();
        
        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;
        setXY([x, y]);
      }}
      onMouseLeave={() => setShowMagnifier(false)}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none border border-gold-200/50 bg-offwhite shadow-2xl rounded-full"
          style={{
            display: "block",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        />
      )}
    </div>
  );
}
