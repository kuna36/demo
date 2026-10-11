import { useState } from 'react';
import { Sparkles, MessageCircle, Info } from 'lucide-react';
import { JewelleryItem, ShopContactInfo } from '../types.ts';
import { ASSET_IMAGES } from '../data/shopData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface JewellerySectionProps {
  jewellery: JewelleryItem[];
  shopInfo: ShopContactInfo;
  onEnquireJewellery: (itemName: string) => void;
}

export function JewellerySection({ jewellery, onEnquireJewellery }: JewellerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { accentConfig } = useTheme();

  const categories = ['All', 'Bangles', 'Earrings', 'Necklaces', 'Sets'];

  const filteredItems = activeCategory === 'All'
    ? jewellery
    : jewellery.filter(item => item.category === activeCategory);

  return (
    <section id="jewellery" className="py-20 bg-[#171A21] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span
              className="text-xs uppercase tracking-widest font-semibold transition-colors"
              style={{ color: accentConfig.primary }}
            >
              Adornments & Traditional Accents
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Jewellery & Style
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Curated everyday fashion and imitation jewellery, festive temple motifs, and contemporary pendants. Handpicked pieces blending tradition and timeless beauty.
            </p>
          </div>

          {/* Category Tabs - Mobile swipeable */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto no-scrollbar flex-nowrap shrink-0 max-w-full">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0"
                  style={{
                    backgroundColor: isActive ? accentConfig.primary : 'transparent',
                    color: isActive ? accentConfig.contrastText : '#9CA3AF',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Editorial Display Card */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 h-56 sm:h-80">
          <img
            src={ASSET_IMAGES.jewellery}
            alt="Artisanal jewellery collection showcase"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A21]/95 via-[#171A21]/60 to-transparent p-4 sm:p-10 flex flex-col justify-center max-w-lg">
            <span
              className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-colors"
              style={{ color: accentConfig.light }}
            >
              Curated Fashion & Festive Wear
            </span>
            <h3 className="text-xl sm:text-3xl font-display font-medium text-white mt-1.5 leading-tight">
              Elegance for Every Moment
            </h3>
            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
              Gold-tone micro-plated bangles, sparkling cubic zirconia drops, and ethnic choker sets available for walk-in selection.
            </p>
          </div>
        </div>

        {/* Jewellery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#101827] rounded-xl border border-neutral-800 transition-all overflow-hidden flex flex-col justify-between group hover:border-neutral-700 shadow-md"
            >
              {/* Image Preview */}
              <div className="h-48 bg-neutral-900 overflow-hidden relative">
                <img
                  src={item.image || ASSET_IMAGES.jewellery}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div
                  className="absolute top-3 left-3 bg-[#171A21]/90 backdrop-blur-sm text-[11px] font-semibold px-2.5 py-0.5 rounded border border-neutral-700"
                  style={{ color: accentConfig.light }}
                >
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">
                      {item.materialType}
                    </span>
                    {item.price && (
                      <span
                        className="text-xs font-mono tabular-nums font-semibold"
                        style={{ color: accentConfig.primary }}
                      >
                        ₹{item.price} <span className="text-[10px] text-neutral-400">(Demo)</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80">
                  <button
                    type="button"
                    onClick={() => onEnquireJewellery(item.name)}
                    className="w-full py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                    style={{
                      backgroundColor: accentConfig.primary,
                      color: accentConfig.contrastText,
                    }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire Design on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on precious metals */}
        <div className="bg-neutral-900/80 rounded-xl p-4 border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentConfig.primary }} />
          <p>
            <span className="text-neutral-200 font-semibold">Note for customers:</span> The shop specializes in fashion, imitation, and brass gold-finish adornments. Solid bullion gold/silver is not sold. Prices and patterns are editable demonstration samples pending owner catalog update.
          </p>
        </div>
      </div>
    </section>
  );
}
