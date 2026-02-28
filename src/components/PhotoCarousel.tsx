import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  photos: string[];
  petName: string;
}

export default function PhotoCarousel({ photos, petName }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-[10px] overflow-hidden bg-[#f0f0f0] aspect-video flex items-center justify-center">
        <p className="text-[#45556c]">No photos available</p>
      </div>
    );
  }

  const nextPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) nextPhoto();
    if (touchStart - touchEnd < -50) prevPhoto();
    setTouchStart(null);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="space-y-3">
      {/* Main Container - Fixed 600px height */}
      <div 
        className="rounded-[10px] overflow-hidden relative w-full bg-slate-100 group flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ height: '600px' }} 
      >
        <img 
          src={currentPhoto} 
          alt={`${petName} photo ${currentIndex + 1}`}
          className="h-full w-auto object-contain select-none"
        />
          
        {/* Navigation Layers */}
        {photos.length > 1 && (
  <>
    {/* LEFT SIDE CLICK AREA & ARROW */}
    <button
      onClick={prevPhoto}
      className="absolute left-0 top-0 h-full w-[25%] z-20 flex items-center justify-start pl-4 outline-none group/btn"
    >
      <div className="size-10 sm:size-12 bg-white/70 hover:bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center border border-black/10 shadow-md transition-all opacity-0 group-hover:opacity-100 active:scale-90">
        <ChevronLeft className="size-6 sm:size-8 text-black" strokeWidth={2.5} />
      </div>
    </button>

    {/* RIGHT SIDE CLICK AREA & ARROW */}
    <button
      onClick={nextPhoto}
      className="absolute right-0 top-0 h-full w-[25%] z-20 flex items-center justify-end pr-4 outline-none group/btn"
    >
      <div className="size-10 sm:size-12 bg-white/70 hover:bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center border border-black/10 shadow-md transition-all opacity-0 group-hover:opacity-100 active:scale-90">
        <ChevronRight className="size-6 sm:size-8 text-black" strokeWidth={2.5} />
      </div>
    </button>

    {/* COUNTER - PINNED TO BOTTOM MIDDLE */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white/80 backdrop-blur-md text-black text-xs font-bold px-4 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-black/5">
      {currentIndex + 1} / {photos.length}
    </div>
  </>
)}
      </div>

      {/* Thumbnails Row */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden flex items-center justify-center transition-all ${
                index === currentIndex ? 'border-[#155dfc]' : 'border-[#e2e8f0]'
              }`}
            >
              <img src={photo} className="w-full h-full object-cover" alt="thumb" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}