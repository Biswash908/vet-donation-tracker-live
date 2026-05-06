import { useState } from 'react';
import { Label } from './ui/label';

interface Vet {
  id: string;
  name: string;
}

interface VetSelectorProps {
  vets: Vet[];
  selectedVetId: string;
  onChange: (vetId: string) => void;
  label?: string;
  showCurrentVet?: boolean;
}

export default function VetSelector({
  vets,
  selectedVetId,
  onChange,
  label = 'Vet / Clinic / Hospital',
  showCurrentVet = false
}: VetSelectorProps) {
  const [open, setOpen] = useState(false);
  const selectedVet = vets.find(v => v.id === selectedVetId);

  return (
    <div className="space-y-2">
      {/* Label */}
      <Label htmlFor="vet-selector">{label}</Label>

      {/* Current Vet (subtle, optional) */}
      {showCurrentVet && (
        <p className="text-xs text-[#64748b]">
          Current:{" "}
          <span className="text-[#0f172b] font-medium">
            {selectedVet?.name || 'None assigned'}
          </span>
        </p>
      )}

      {/* Trigger */}
      <div className="relative">
        <button
          type="button"
          id="vet-selector"
          onClick={() => setOpen(prev => !prev)}
          className="w-full h-10 px-3 rounded-lg bg-[#f3f3f5] border-0 text-sm text-left flex items-center justify-between"
        >
          <span className={selectedVet ? 'text-[#0f172b]' : 'text-[#717182]'}>
            {selectedVet?.name || 'Select a veterinarian'}
          </span>

          <svg
            className={`w-4 h-4 transition-transform text-[#90a1b9] ${
              open ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9l6 6 6-6"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e2e8f0] rounded-lg shadow-sm z-50 max-h-60 overflow-y-auto">
            {vets.length === 0 ? (
              <div className="px-4 py-4 text-sm text-center text-[#717182]">
                No vets available
              </div>
            ) : (
              vets.map(vet => {
                const isSelected = selectedVetId === vet.id;

                return (
                  <button
                    key={vet.id}
                    type="button"
                    onClick={() => {
                      onChange(vet.id);
                      setOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between
                      ${
                        isSelected
                          ? 'bg-[#e8f0ff] text-[#155dfc]'
                          : 'text-[#0f172b] hover:bg-[#f1f5f9]'
                      }
                    `}
                  >
                    <span>{vet.name}</span>

                    {isSelected && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}