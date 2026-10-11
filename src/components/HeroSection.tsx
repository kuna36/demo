import { ArrowDown, Sparkles, FileText, Smartphone, Gem, MapPin } from 'lucide-react';
import { ThreeHeroScene } from './ThreeHeroScene.tsx';
import { ASSET_IMAGES } from '../data/shopData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface HeroSectionProps {
  onScrollTo: (sectionId: string) => void;
  onOpenEnquiryModal: () => void;
}

export function HeroSection({ onScrollTo }: HeroSectionProps) {
  const { accentConfig } = useTheme();

  return (
    <section className="relative bg-[#101827] text-white overflow-hidden py-8 sm:py-12 lg:py-20 border-b border-neutral-800">
      {/* Background ambient gradient glow using active theme accent */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-500 opacity-20"
        style={{ backgroundColor: accentConfig.primary }}
      />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#1e3a8a]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="space-y-1.5 sm:space-y-2">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-colors block"
                style={{ color: accentConfig.light }}
              >
                Neighborhood Digital Hub & Store
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.2] text-balance">
                Everything You Need. <br />
                <span
                  className="font-display font-normal transition-colors"
                  style={{ color: accentConfig.primary }}
                >
                  All in One Place.
                </span>
              </h1>
            </div>

            <p className="text-xs sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              Digital services, everyday accessories and jewellery — conveniently under one roof. From instant high-speed photocopies and online application filings to phone essentials and curated adornments.
            </p>

            {/* Three Primary Actions specified in prompt - Touch-friendly on mobile */}
            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => onScrollTo('services')}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-md active:scale-95 text-center"
                style={{
                  backgroundColor: accentConfig.primary,
                  color: accentConfig.contrastText,
                }}
              >
                Explore Services
              </button>

              <button
                type="button"
                onClick={() => onScrollTo('accessories')}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-all active:scale-95 text-center"
              >
                Explore Products
              </button>

              <button
                type="button"
                onClick={() => onScrollTo('contact')}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold border rounded-lg transition-all text-center hover:bg-neutral-800/60"
                style={{
                  color: accentConfig.light,
                  borderColor: `${accentConfig.primary}60`,
                }}
              >
                Contact Us
              </button>
            </div>

            {/* Quick Service Pillars */}
            <div className="pt-4 sm:pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-2 sm:gap-4">
              <div className="space-y-0.5 sm:space-y-1">
                <div
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-medium"
                  style={{ color: accentConfig.light }}
                >
                  <FileText className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                  <span className="truncate">Xerox & Print</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate">High-speed duplication</p>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <div
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-medium"
                  style={{ color: accentConfig.light }}
                >
                  <Smartphone className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                  <span className="truncate">Accessories</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate">Cables & protection</p>
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <div
                  className="flex items-center gap-1 text-[11px] sm:text-xs font-medium"
                  style={{ color: accentConfig.light }}
                >
                  <Gem className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" />
                  <span className="truncate">Jewellery</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate">Bangles & earrings</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Scene */}
          <div className="lg:col-span-7">
            <ThreeHeroScene
              fallbackImage={ASSET_IMAGES.hero}
              onExploreServices={() => onScrollTo('services')}
              onExploreAccessories={() => onScrollTo('accessories')}
              onExploreJewellery={() => onScrollTo('jewellery')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
