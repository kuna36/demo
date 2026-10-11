import { MapPin, Navigation, Clock, Phone, AlertCircle, ExternalLink } from 'lucide-react';
import { ShopContactInfo } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface LocationSectionProps {
  shopInfo: ShopContactInfo;
}

export function LocationSection({ shopInfo }: LocationSectionProps) {
  const { isDark, accentConfig } = useTheme();

  return (
    <section id="location" className={`py-20 transition-colors duration-300 ${isDark ? 'bg-[#101827] text-white border-b border-neutral-800' : 'bg-white text-[#171A21] border-b border-neutral-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span
            className="text-xs uppercase tracking-widest font-semibold transition-colors"
            style={{ color: accentConfig.primary }}
          >
            Visit Our Store
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#101827]'}`}>
            Location & Directions
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
            Conveniently situated for fast walk-in access. Find us easily using the verified Google Maps link below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Location Details & Hours */}
          <div className="lg:col-span-5 bg-[#171A21] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-neutral-800 shadow-lg">
            <div className="space-y-6">
              <div className="space-y-2">
                <span
                  className="text-xs uppercase font-semibold tracking-wider transition-colors"
                  style={{ color: accentConfig.light }}
                >
                  Store Coordinates
                </span>
                <h3 className="text-xl font-bold text-white">
                  SRIVIGNESH XEROX & ONLINE WORKS
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Near Bus Stop, Main Road, Tamil Nadu, India.
                </p>
                <div className="text-[11px] font-mono text-neutral-400 pt-1">
                  GPS: 11.7229467° N, 78.069487° E
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: accentConfig.light }}>
                  <Clock className="w-4 h-4" />
                  <span>Business Working Hours (Demo)</span>
                </div>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Monday – Saturday</span>
                    <span className="font-medium text-white">{shopInfo.openingHours.weekdays}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Sunday</span>
                    <span className="font-medium text-white">{shopInfo.openingHours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Phone Status Notice */}
              <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5 font-medium" style={{ color: accentConfig.primary }}>
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Owner Verification Needed</span>
                </div>
                <p className="text-[11px]">
                  Phone and WhatsApp numbers currently displayed are placeholders for demo review. Update via the editor or owner confirmation.
                </p>
              </div>
            </div>

            {/* Direct Directions Action */}
            <div className="pt-4">
              <a
                href={shopInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                style={{
                  backgroundColor: accentConfig.primary,
                  color: accentConfig.contrastText,
                }}
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps & Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 min-h-[380px] relative flex flex-col bg-neutral-900 shadow-lg">
            <iframe
              title="Google Maps Location for SRIVIGNESH XEROX & ONLINE WORKS"
              src="https://maps.google.com/maps?q=11.7229467,78.069487&hl=en&z=17&output=embed"
              className="w-full flex-1 border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className={`p-3 border-t text-xs flex items-center justify-between ${
              isDark ? 'bg-[#171A21] border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-600'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: accentConfig.primary }} />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-[#101827]'}`}>SRIVIGNESH XEROX & ONLINE WORKS</span>
              </div>
              <a
                href={shopInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold flex items-center gap-1 hover:underline"
                style={{ color: accentConfig.primary }}
              >
                <span>View Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
