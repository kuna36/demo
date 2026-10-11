import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, ACCENT_COLORS, AccentColorId } from '../context/ThemeContext.tsx';

interface ThemeColorPickerProps {
  variant?: 'popover' | 'inline';
}

export function ThemeColorPicker({ variant = 'popover' }: ThemeColorPickerProps) {
  const { accentColor, accentConfig, setAccentColor } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const colorList = Object.values(ACCENT_COLORS);

  if (variant === 'inline') {
    return (
      <div className="space-y-2 py-1">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Palette className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
            <span>Theme Accent Color</span>
          </span>
          <span className="text-[11px] font-medium" style={{ color: accentConfig.primary }}>
            {accentConfig.name}
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {colorList.map((col) => {
            const isSelected = accentColor === col.id;
            return (
              <button
                key={col.id}
                type="button"
                onClick={() => setAccentColor(col.id as AccentColorId)}
                title={`${col.name} — ${col.tagline}`}
                className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-2 ring-offset-2 ring-offset-[#171A21] scale-110 shadow-md'
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                style={{
                  backgroundColor: col.primary,
                  boxShadow: isSelected ? `0 0 12px ${col.primary}60` : undefined,
                }}
              >
                {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 relative group"
        title={`Change Theme Color (Current: ${accentConfig.name})`}
        aria-label="Change theme accent color"
      >
        <Palette className="w-4 h-4 transition-colors" style={{ color: accentConfig.primary }} />
        {/* Active color indicator pip */}
        <span
          className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
          style={{ backgroundColor: accentConfig.primary }}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#101827] border border-neutral-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Palette className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
              <span>Theme Accent Color</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              6 Presets
            </span>
          </div>

          <div className="space-y-1.5">
            {colorList.map((col) => {
              const isSelected = accentColor === col.id;
              return (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => {
                    setAccentColor(col.id as AccentColorId);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all ${
                    isSelected
                      ? 'bg-neutral-800/90 border border-neutral-700'
                      : 'hover:bg-neutral-850 hover:bg-neutral-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 shadow-sm transition-transform"
                      style={{ backgroundColor: col.primary }}
                    />
                    <div>
                      <p className="text-xs font-medium text-white leading-tight">
                        {col.name}
                      </p>
                      <p className="text-[10px] text-neutral-400 leading-tight">
                        {col.tagline}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 shrink-0" style={{ color: col.primary }} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-neutral-800/70 text-[10px] text-neutral-400 text-center">
            Instantly applied across 3D hero, buttons, badges & text
          </div>
        </div>
      )}
    </div>
  );
}
