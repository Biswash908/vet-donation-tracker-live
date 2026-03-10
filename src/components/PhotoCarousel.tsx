import { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PhotoCarouselProps {
  photos: string[];
  petName: string;
}

export default function PhotoCarousel({ photos, petName }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-[10px] overflow-hidden bg-[#f0f0f0] aspect-video flex items-center justify-center">
        <p className="text-[#45556c]">No photos available</p>
      </div>
    );
  }

  // Scroll active thumbnail into view whenever currentIndex changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    const thumb = thumbnailRefs.current[currentIndex];
    if (!container || !thumb) return;

    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;
    const thumbLeft = thumb.offsetLeft;
    const thumbRight = thumbLeft + thumb.offsetWidth;

    if (thumbLeft < containerLeft) {
      container.scrollTo({ left: thumbLeft - 8, behavior: 'smooth' });
    } else if (thumbRight > containerRight) {
      container.scrollTo({ left: thumbRight - container.clientWidth + 8, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

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
    <div className="space-y-3 w-full">
      {/* Main Container with Navigation and Arrows */}
      <div className="relative flex items-center gap-1 sm:gap-3 w-full">
        {photos.length > 1 && (
          <button
            className="flex-shrink-0 p-1.5 sm:p-2 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-all active:scale-90 flex items-center justify-center"
            onClick={prevPhoto}
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-4 sm:size-5 text-black" strokeWidth={2.5} />
          </button>
        )}

        {/* Image Container */}
        <div
          className="rounded-[10px] overflow-hidden relative bg-slate-100 group flex items-center justify-center flex-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ height: 'clamp(250px, 50vw, 500px)' }}
        >
          <img
            src={currentPhoto}
            alt={`${petName} photo ${currentIndex + 1}`}
            className="h-full w-auto max-w-full object-contain select-none"
          />

          {photos.length > 1 && (
            <>
              <div onClick={prevPhoto} className="absolute left-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer hover:bg-black/5 transition-colors" />
              <div onClick={nextPhoto} className="absolute right-0 top-0 bottom-0 w-1/3 z-20 cursor-pointer hover:bg-black/5 transition-colors" />
            </>
          )}

          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none">
              {currentIndex + 1} / {photos.length}
            </div>
          )}
        </div>

        {photos.length > 1 && (
          <button
            className="flex-shrink-0 p-1.5 sm:p-2 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-all active:scale-90 flex items-center justify-center"
            onClick={nextPhoto}
            aria-label="Next photo"
          >
            <ChevronRight className="size-4 sm:size-5 text-black" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Thumbnails — outer div clips vertically, inner div scrolls horizontally */}
      {photos.length > 1 && (
        <div className="border border-slate-200 rounded-lg bg-slate-50" style={{ overflow: 'hidden' }}>
          <div
            ref={scrollContainerRef}
            style={{ overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch' }}
            className="p-2"
          >
            <div className="flex gap-2" style={{ width: 'max-content' }}>
              {photos.map((photo, index) => (
                <button
                  key={index}
                  ref={(el) => { thumbnailRefs.current[index] = el; }}
                  onClick={() => goTo(index)}
                  style={{ width: '64px', height: '64px', minWidth: '64px', minHeight: '64px', flexShrink: 0 }}
                  className={`rounded-md border-2 overflow-hidden transition-all cursor-pointer ${
                    index === currentIndex
                      ? 'border-[#155dfc] ring-2 ring-[#155dfc]/30'
                      : 'border-[#e2e8f0] hover:border-slate-400'
                  }`}
                >
                  <img src={photo} style={{ width: '64px', height: '64px', objectFit: 'cover', display: 'block' }} alt={`thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
