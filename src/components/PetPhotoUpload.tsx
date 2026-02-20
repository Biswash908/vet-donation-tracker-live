import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';

interface PetPhotoUploadProps {
  imageUrl?: string;
  onUpload: () => void;
  onRemove: () => void;
}

export default function PetPhotoUpload({ imageUrl, onUpload, onRemove }: PetPhotoUploadProps) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-lg p-5 shadow-sm">
      {/* Heading */}
      <h3 className="text-lg font-semibold text-[#0f172b] mb-4">
        Pet Photo
      </h3>

      {/* Photo Preview Container - smaller container inside */}
      <div className="flex justify-center mb-5">
        <div className="relative w-48 h-48 bg-[#f1f5f9] rounded-lg overflow-hidden border border-[#e2e8f0]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Pet" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#64748b] text-sm">
              No photo uploaded
            </div>
          )}
          
          {/* Remove Button - Red X in top right */}
          {imageUrl && (
            <button
              onClick={onRemove}
              className="absolute top-2 right-2 size-7 bg-[#ef4444] rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors shadow-md"
              title="Delete photo"
            >
              <X className="size-4 text-white" strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      {/* Change Photo Button - proper spacing */}
      <Button
        onClick={onUpload}
        variant="outline"
        className="w-full gap-2 border-[#e2e8f0] bg-white hover:bg-[#f8fafc] h-10 text-[#0f172b] font-medium"
      >
        <Upload className="size-4" />
        <span className="text-sm">
          {imageUrl ? 'Change Photo' : 'Upload Photo'}
        </span>
      </Button>
    </div>
  );
}
