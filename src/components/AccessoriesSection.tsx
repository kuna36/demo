import { useState } from 'react';
import { Search, ShoppingBag, MessageCircle, Check, HelpCircle } from 'lucide-react';
import { ProductItem, ShopContactInfo } from '../types.ts';
import { ASSET_IMAGES } from '../data/shopData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface AccessoriesSectionProps {
  products: ProductItem[];
  shopInfo: ShopContactInfo;
  onEnquireProduct: (productName: string, category: string) => void;
}

export function AccessoriesSection({ products, onEnquireProduct }: AccessoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isDark, accentConfig } = useTheme();

  const categories = ['All', 'Chargers & Cables', 'Cases & Protection', 'Audio & Earphones', 'Utilities & Storage'];

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="accessories" className={`py-20 transition-colors duration-300 ${isDark ? 'bg-[#0B0F19] text-white border-b border-neutral-800' : 'bg-[#F5F5F2] text-[#171A21] border-b border-neutral-300'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span
              className="text-xs uppercase tracking-widest font-semibold transition-colors"
              style={{ color: accentConfig.primary }}
            >
              Countertop Essentials & Gadgets
            </span>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#101827]'}`}>
              Accessories & Everyday Essentials
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
              Tested mobile phone accessories, charging essentials, and everyday utility electronics stocked for quick walk-in purchase.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search accessories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-lg focus:outline-none border ${
                isDark
                  ? 'bg-[#131926] text-white border-neutral-700 placeholder-neutral-400'
                  : 'bg-white text-neutral-900 border-neutral-300'
              }`}
              style={{
                borderColor: searchQuery ? accentConfig.primary : undefined,
              }}
            />
          </div>
        </div>

        {/* Category Filter Tabs - Smooth horizontal swipe */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 flex-nowrap max-w-full">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: isActive ? accentConfig.primary : isDark ? '#131926' : '#ffffff',
                  color: isActive ? accentConfig.contrastText : isDark ? '#D1D5DB' : '#374151',
                  border: isActive ? 'none' : isDark ? '1px solid #262626' : '1px solid #E5E7EB',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Featured Visual Spotlight */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 h-52 sm:h-72">
          <img
            src={ASSET_IMAGES.accessories}
            alt="Mobile accessories collection on display"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101827]/90 via-[#101827]/60 to-transparent p-4 sm:p-8 flex flex-col justify-center max-w-lg">
            <span
              className="text-[11px] sm:text-xs uppercase font-semibold tracking-wider transition-colors"
              style={{ color: accentConfig.light }}
            >
              Ready in Stock
            </span>
            <h3 className="text-lg sm:text-2xl font-bold text-white mt-1">
              Quality Tested Accessories
            </h3>
            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
              Fast charging cables, certified adapters, protective tempered glass with on-the-spot bubble-free application, and audio gear.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl border overflow-hidden transition-all flex flex-col justify-between ${
                isDark
                  ? 'bg-[#131926] border-neutral-800 shadow-md hover:border-neutral-700'
                  : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Product Visual Area */}
              <div className="h-44 bg-neutral-900 overflow-hidden relative">
                <img
                  src={product.image || ASSET_IMAGES.accessories}
                  alt={product.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#101827]/85 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-0.5 rounded border border-neutral-700/60">
                  {product.category}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Walk-in Stock</span>
                    </span>
                    {product.price && (
                      <span
                        className="text-xs tabular-nums font-mono font-semibold"
                        style={{ color: accentConfig.primary }}
                      >
                        ₹{product.price} <span className="text-[10px] text-neutral-400">(Demo)</span>
                      </span>
                    )}
                  </div>

                  <h3 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-[#101827]'}`}>
                    {product.name}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
                    {product.description}
                  </p>

                  {product.specs && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {product.specs.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-[10px] px-2 py-0.5 rounded ${
                            isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enquire button */}
                <div className={`pt-4 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                  <button
                    type="button"
                    onClick={() => onEnquireProduct(product.name, product.category)}
                    className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                      isDark
                        ? 'bg-neutral-900 text-neutral-200 border border-neutral-700 hover:text-white'
                        : 'bg-[#101827] text-white hover:bg-neutral-800'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
                    <span>Check Store Availability</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
