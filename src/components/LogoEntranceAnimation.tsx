import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/shopData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface LogoEntranceAnimationProps {
  onComplete: () => void;
  target?: 'site' | 'login';
}

export function LogoEntranceAnimation({ onComplete, target = 'site' }: LogoEntranceAnimationProps) {
  const { accentConfig } = useTheme();
  const [phase, setPhase] = useState<'intro' | 'glow' | 'reveal' | 'exit'>('intro');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: Initial scale & glow
    const t1 = setTimeout(() => setPhase('glow'), 400);

    // Stage 2: Reveal text & details
    const t2 = setTimeout(() => setPhase('reveal'), 1200);

    // Progress counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    // Stage 3: Smooth exit after ~2.6s
    const t3 = setTimeout(() => {
      setPhase('exit');
      setTimeout(onComplete, 500);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19] text-white transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] animate-pulse opacity-25"
          style={{ backgroundColor: accentConfig.primary }}
        />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-[#1E3A8A]/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        {/* Animated Circular Logo Emblem with Dynamic Halo */}
        <div className="relative mb-6">
          {/* Outer glowing ring */}
          <div
            className={`absolute -inset-3 rounded-full border transition-all duration-1000 ${
              phase === 'intro' ? 'scale-75 opacity-0' : 'scale-100 opacity-100 rotate-180'
            }`}
            style={{
              borderColor: `${accentConfig.primary}80`,
              animation: 'spin 18s linear infinite',
            }}
          />

          {/* Logo image container */}
          <div
            className={`relative w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 transition-all duration-700 ${
              phase === 'intro'
                ? 'scale-50 opacity-0 rotate-[-20deg]'
                : 'scale-100 opacity-100 rotate-0'
            }`}
            style={{
              background: `linear-gradient(135deg, ${accentConfig.primary}, ${accentConfig.light})`,
              boxShadow: `0 0 50px ${accentConfig.primary}70`,
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#101827]">
              <img
                src={ASSET_IMAGES.logo}
                alt="SRIVIGNESH XEROX & ONLINE WORKS Official Emblem"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Radiant light sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {/* Brand Typography Reveal */}
        <div
          className={`space-y-1.5 sm:space-y-2 transition-all duration-700 ${
            phase === 'intro' ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <div
            className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs tracking-widest uppercase font-semibold"
            style={{ color: accentConfig.light }}
          >
            <Sparkles className="w-3 h-3" />
            <span>KK GROUP Official Showcase</span>
            <Sparkles className="w-3 h-3" />
          </div>

          <h1 className="text-xl sm:text-3xl font-display font-bold text-white tracking-wider">
            SRIVIGNESH
          </h1>

          <p
            className="text-[11px] sm:text-sm font-sans tracking-[0.2em] uppercase font-semibold"
            style={{ color: accentConfig.primary }}
          >
            Xerox & Online Works
          </p>

          <p className="text-[11px] sm:text-xs text-neutral-400 pt-0.5">
            Digital Services · Everyday Accessories · Jewellery
          </p>
        </div>

        {/* Progress loader */}
        <div className="mt-6 sm:mt-8 w-44 sm:w-48 space-y-2">
          <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-100 rounded-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${accentConfig.primary}, ${accentConfig.light})`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>{target === 'login' ? 'PORTAL ACCESS' : 'INITIALIZING'}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Skip button for immediate access */}
        <button
          type="button"
          onClick={onComplete}
          className="mt-5 sm:mt-6 px-5 py-2 rounded-full border border-neutral-700 text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 active:scale-95 shadow-md"
          style={{
            borderColor: `${accentConfig.primary}60`,
            backgroundColor: '#101827',
          }}
        >
          <span>{target === 'login' ? 'Proceed to Login' : 'Enter Website'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
