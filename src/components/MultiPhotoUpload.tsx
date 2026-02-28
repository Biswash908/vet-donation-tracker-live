import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

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
  onSetProfilePhoto,
  profilePhotoIndex = 0
}: MultiPhotoUploadProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files);
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

  // Swipe logic
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    
    if (distance > 50) nextPhoto();      // Swipe Left to go Next
    if (distance < -50) prevPhoto();     // Swipe Right to go Back
    setTouchStart(null);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="space-y-4">
      {/* Main Preview Area */}
      <div 
        className="relative w-full bg-slate-100 rounded-xl overflow-hidden group flex items-center justify-center"
        style={{ height: '600px' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {photos.length > 0 ? (
          <>
            <img 
              src={currentPhoto} 
              alt="Preview" 
              className="h-full w-auto object-contain select-none pointer-events-none"
            />
            
            {/* Delete Button (Only visible element) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(currentIndex);
                if (currentIndex >= photos.length - 1 && currentIndex > 0) {
                  setCurrentIndex(currentIndex - 1);
                }
              }}
              className="absolute top-4 right-4 z-50 size-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90"
              title="Remove this photo"
            >
              <X className="size-6" strokeWidth={3} />
            </button>

            {/* COMPLETELY INVISIBLE NAVIGATION ZONES */}
            {photos.length > 1 && (
              <div className="absolute inset-0 flex z-40">
                {/* Left Half Click Zone */}
                <div
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                  className="h-full w-1/2 cursor-pointer"
                  aria-label="Previous photo"
                />

                {/* Right Half Click Zone */}
                <div
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                  className="h-full w-1/2 cursor-pointer"
                  aria-label="Next photo"
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

      {/* Thumbnails Row */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden transition-all ${
                index === currentIndex ? 'border-[#155dfc] ring-2 ring-[#155dfc]/20' : 'border-slate-200'
              }`}
            >
              <img src={photo} className="w-full h-full object-cover" alt="thumbnail" />
            </button>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <label className="cursor-pointer block">
        <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        <Button
          variant="outline"
          asChild
          className="w-full gap-2 border-[#e2e8f0] bg-white hover:bg-[#f8fafc] h-11 text-[#0f172b] font-medium shadow-sm"
        >
          <div onClick={(e) => e.currentTarget.parentElement?.querySelector('input')?.click()}>
            <Upload className="size-4" />
            {photos.length === 0 ? 'Upload Photos' : 'Add More Photos'}
          </div>
        </Button>
      </label>
    </div>
  );
}