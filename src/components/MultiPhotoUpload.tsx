import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useRef, useEffect } from 'react';

interface MultiPhotoUploadProps {
  photos?: string[];
  onUpload: (files: File[]) => void;
  onRemove: (index: number) => void;
  onSetProfilePhoto?: (index: number) => void;
  profilePhotoIndex?: number;
}

export default function MultiPhotoUpload({
  photos = [],
  onUpload,
  onRemove,
}: MultiPhotoUploadProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-scroll active thumbnail into view when index changes
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
      e.target.value = '';
    }
  };

  const nextPhoto = () => {
    if (photos.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (photos.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) nextPhoto();
    if (distance < -50) prevPhoto();

    setTouchStart(null);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="space-y-4 w-full">
      {/* Preview */}
      <div
        className="relative w-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ height: '400px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.length > 0 ? (
          <>
            <img
              src={currentPhoto}
              alt="Preview"
              className="max-h-full max-w-full object-contain select-none pointer-events-none"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(currentIndex);

                if (currentIndex >= photos.length - 1 && currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                }
              }}
              className="absolute top-4 right-4 z-50 size-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
            >
              <X className="size-6" strokeWidth={3} />
            </button>

            {photos.length > 1 && (
              <div className="absolute inset-0 flex z-40">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  className="h-full w-1/2 cursor-pointer"
                />

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  className="h-full w-1/2 cursor-pointer"
                />
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <Upload className="size-12 mb-2 opacity-20" />
            <p>No photos uploaded yet</p>
          </div>
        )}
      </div>

      {/* Scrollable thumbnails */}
      {photos.length > 1 && (
        <div className="border border-slate-200 rounded-lg bg-slate-50" style={{ overflow: 'hidden' }}>
          <div
            ref={scrollContainerRef}
            className="p-2"
            style={{ overflowX: 'auto', overflowY: 'hidden', WebkitOverflowScrolling: 'touch' }}
          >
            <div className="flex gap-2" style={{ width: 'max-content' }}>
              {photos.map((photo, index) => (
                <button
                  key={index}
                  ref={(el) => { thumbnailRefs.current[index] = el; }}
                  onClick={() => setCurrentIndex(index)}
                  className={`flex-shrink-0 h-16 w-16 rounded-md border-2 overflow-hidden ${
                    index === currentIndex
                      ? 'border-[#155dfc] ring-2 ring-[#155dfc]/30'
                      : 'border-[#e2e8f0] hover:border-slate-400'
                  }`}
                >
                  <img
                    src={photo}
                    className="w-full h-full object-cover"
                    alt={`thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      <Button
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="w-full gap-2 border-[#e2e8f0] bg-white hover:bg-[#f8fafc] h-11 text-[#0f172b] font-medium shadow-sm"
      >
        <Upload className="size-4" />
        {photos.length === 0 ? 'Upload Photos' : 'Add More Photos'}
      </Button>
    </div>
  );
}
