import { Upload, X, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const currentPhoto = photos[currentIndex];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-sm">
      {/* Heading */}
      <h3 className="text-lg font-semibold text-[#0f172b] mb-4">
        Pet Photos
      </h3>

      {/* Photo Preview Container */}
      <div className="flex justify-center mb-5">
        <div className="relative w-48 aspect-square bg-[#f1f5f9] rounded-lg overflow-hidden border border-[#e2e8f0] flex items-center justify-center">
          {currentPhoto ? (
            <>
              <img 
                src={currentPhoto} 
                alt={`Pet photo ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation arrows - only show if multiple photos */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-7 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    title="Previous photo"
                  >
                    <ChevronLeft className="size-4 text-white" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-7 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                    title="Next photo"
                  >
                    <ChevronRight className="size-4 text-white" />
                  </button>
                </>
              )}

              {/* Remove Button - Red X in top right */}
              <button
                onClick={() => {
                  onRemove(currentIndex);
                  if (photos.length > 1) {
                    setCurrentIndex(0);
                  }
                }}
                className="absolute top-2 right-2 size-7 bg-[#ef4444] rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors shadow-md"
                title="Delete photo"
              >
                <X className="size-4 text-white" strokeWidth={3} />
              </button>

              {/* Photo Counter */}
              {photos.length > 1 && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {currentIndex + 1} / {photos.length}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#64748b] text-sm text-center px-4">
              No photos uploaded
            </div>
          )}
        </div>
      </div>

      {/* Photo Thumbnails */}
      {photos.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 relative w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                index === currentIndex 
                  ? 'border-[#155dfc]' 
                  : 'border-[#e2e8f0] hover:border-[#155dfc]/50'
              }`}
              title={`Photo ${index + 1}${index === profilePhotoIndex ? ' (Profile)' : ''}`}
            >
              <img 
                src={photo} 
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
              />
              {index === profilePhotoIndex && (
                <div className="absolute top-0 right-0 bg-[#155dfc] text-white text-[9px] px-1.5 py-0.5 rounded-bl whitespace-nowrap">
                  P
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <label className="cursor-pointer block">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <Button
          variant="outline"
          className="w-full gap-2 border-[#e2e8f0] bg-white hover:bg-[#f8fafc] h-10 text-[#0f172b] font-medium cursor-pointer"
          onClick={(e) => {
            e.currentTarget.parentElement?.querySelector('input')?.click();
          }}
        >
          <Upload className="size-4" />
          <span className="text-sm">
            {photos.length === 0 ? 'Upload Photos' : 'Add More Photos'}
          </span>
        </Button>
      </label>

      {/* Helper text */}
      <p className="text-xs text-[#64748b] mt-2">
        First photo will be used as the profile picture. You can swipe through photos on the pet details page.
      </p>
    </div>
  );
}
