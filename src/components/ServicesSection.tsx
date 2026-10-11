import { useState } from 'react';
import { Copy, Printer, Scan, ShieldCheck, FileSpreadsheet, Send, Clock, CheckCircle2, MessageCircle } from 'lucide-react';
import { ServiceItem, ShopContactInfo } from '../types.ts';
import { ASSET_IMAGES } from '../data/shopData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface ServicesSectionProps {
  services: ServiceItem[];
  shopInfo: ShopContactInfo;
  onEnquireService: (serviceName: string) => void;
}

export function ServicesSection({ services, onEnquireService }: ServicesSectionProps) {
  const [filter, setFilter] = useState<'all' | 'xerox' | 'printing' | 'digital' | 'finishing'>('all');
  const { isDark, accentConfig } = useTheme();

  const filteredServices = filter === 'all'
    ? services
    : services.filter(s => s.category === filter);

  return (
    <section id="services" className={`py-20 transition-colors duration-300 ${isDark ? 'bg-[#101827] text-white border-b border-neutral-800' : 'bg-white text-[#171A21] border-b border-neutral-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span
              className="text-xs uppercase tracking-widest font-semibold transition-colors"
              style={{ color: accentConfig.primary }}
            >
              Precision Documentation & Portals
            </span>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#101827]'}`}>
              Xerox & Digital Services
            </h2>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
              Fast, clear photocopies, laser prints, document digitization, and online portal filings. All services are processed on calibrated machines with strict privacy protection.
            </p>
          </div>

          {/* Interactive filter tabs - Mobile scrollable */}
          <div className={`flex items-center gap-1.5 p-1 rounded-xl overflow-x-auto no-scrollbar shrink-0 border max-w-full ${
            isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
          }`}>
            {(['all', 'xerox', 'printing', 'digital', 'finishing'] as const).map((cat) => {
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap capitalize shrink-0"
                  style={{
                    backgroundColor: isActive ? accentConfig.primary : undefined,
                    color: isActive ? accentConfig.contrastText : undefined,
                  }}
                >
                  {cat === 'all' ? 'All Services' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Showcase Banner: 2 Generated High-Res Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group h-52 sm:h-72">
            <img
              src={ASSET_IMAGES.xerox}
              alt="High-speed commercial xerox and laser printing workstation"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/90 via-[#101827]/30 to-transparent p-4 sm:p-6 flex flex-col justify-end">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: accentConfig.light }}>
                Printing & Copying Hub
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">Industrial High-Speed Duplication</h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-md line-clamp-2 sm:line-clamp-none">Single sheets to hundreds of copies with clean black text and vibrant laser color.</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group h-52 sm:h-72">
            <img
              src={ASSET_IMAGES.digital}
              alt="Document optical scanning and online internet services"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/90 via-[#101827]/30 to-transparent p-4 sm:p-6 flex flex-col justify-end">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider" style={{ color: accentConfig.light }}>
                Digital & Internet Services
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">Scanning, Portal Forms & Certificates</h3>
              <p className="text-xs text-neutral-300 mt-1 max-w-md line-clamp-2 sm:line-clamp-none">Digital document conversion, government portal submissions, and bilingual typing.</p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-xl p-5 border transition-all flex flex-col justify-between group ${
                isDark
                  ? 'bg-[#131926] border-neutral-800 shadow-md hover:border-neutral-700'
                  : 'bg-[#F5F5F2] border-neutral-200/90 hover:bg-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span
                    className="uppercase font-semibold tracking-wider transition-colors"
                    style={{ color: accentConfig.primary }}
                  >
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>{service.turnaround}</span>
                  </div>
                </div>

                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#101827]'}`}>
                  {service.title}
                </h3>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
                  {service.description}
                </p>

                <div className="pt-2 space-y-1.5">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className={`flex items-start gap-1.5 text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      <CheckCircle2
                        className="w-3.5 h-3.5 shrink-0 mt-0.5"
                        style={{ color: accentConfig.primary }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className={`pt-5 mt-4 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <button
                  type="button"
                  onClick={() => onEnquireService(service.title)}
                  className={`w-full py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    isDark
                      ? 'bg-neutral-900 text-neutral-200 border border-neutral-700 hover:text-white'
                      : 'bg-white text-[#101827] border border-neutral-300 hover:bg-neutral-50'
                  }`}
                  style={{
                    borderColor: `${accentConfig.primary}40`,
                  }}
                >
                  <MessageCircle className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
                  <span>Enquire for Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
