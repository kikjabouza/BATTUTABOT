// components/360Viewer.tsx
import { useState } from 'react';

interface ThreeSixtyViewerProps {
  images: string[]; // Tableau d'images pour la rotation 360°
  alt: string;
}

const ThreeSixtyViewer = ({ images, alt }: ThreeSixtyViewerProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleDrag = (e: React.MouseEvent) => {
    if (!e.buttons) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newIndex = Math.floor(percentage * images.length);
    
    setCurrentImage(Math.max(0, Math.min(newIndex, images.length - 1)));
  };

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseMove={handleDrag}
        onMouseDown={handleDrag}
      >
        <img 
          src={images[currentImage]} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentImage + 1} / {images.length}
      </div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        🖱️ Glisser pour tourner
      </div>
    </div>
  );
};

export default ThreeSixtyViewer;