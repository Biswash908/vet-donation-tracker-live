import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface PhotoCarouselProps {
  photos: string[];
  petName: string;
}

export default function PhotoCarousel({ photos, petName }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-[10px] overflow-hidden bg-[#f0f0f0] aspect-video flex items-center justify-center">
        <p className="text-[#45556c]">No photos available</p>
      </div>
    );
  }

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="space-y-3">
      {/* Main Photo Container - Fixed aspect ratio */}
      <div className="rounded-[10px] overflow-hidden relative w-full aspect-video bg-[#f5f5f5] group flex items-center justify-center">
        <img 
          src={currentPhoto} 
          alt={`${petName} photo ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        
        {/* Left clickable area - for previous photo */}
        {photos.length > 1 && (
          <button
            onClick={prevPhoto}
            className="absolute left-0 top-0 h-full w-1/3 flex items-center justify-start pl-3 opacity-0 hover:opacity-100 transition-opacity z-20"
            title="Previous photo"
          >
            <div className="size-8 sm:size-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
              <ChevronLeft className="size-5 sm:size-6 text-white" />
            </div>
          </button>
        )}

        {/* Right clickable area - for next photo */}
        {photos.length > 1 && (
          <button
            onClick={nextPhoto}
            className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-end pr-3 opacity-0 hover:opacity-100 transition-opacity z-20"
            title="Next photo"
          >
            <div className="size-8 sm:size-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors">
              <ChevronRight className="size-5 sm:size-6 text-white" />
            </div>
          </button>
        )}

        {/* Photo Counter - only visible on hover */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs sm:text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
            {currentIndex + 1} / {photos.length}
          </div>
        )}
      </div>

      {/* Thumbnails - Fixed sizes */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden flex items-center justify-center transition-all ${
                index === currentIndex 
                  ? 'border-[#155dfc]' 
                  : 'border-[#e2e8f0] hover:border-[#155dfc]/50'
              }`}
              title={`Photo ${index + 1}`}
            >
              <img 
                src={photo} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
