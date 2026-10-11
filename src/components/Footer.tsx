import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { ShopContactInfo } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface FooterProps {
  shopInfo: ShopContactInfo;
  onOpenLogin?: () => void;
  onReplayIntro?: () => void;
}

export function Footer({ shopInfo, onOpenLogin, onReplayIntro }: FooterProps) {
  const { accentConfig } = useTheme();

  return (
    <footer className="bg-[#101827] text-neutral-400 border-t border-neutral-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <span className="text-base font-bold text-white tracking-wide block font-display">
              SRIVIGNESH
            </span>
            <span
              className="text-xs uppercase font-semibold block transition-colors"
              style={{ color: accentConfig.primary }}
            >
              XEROX & ONLINE WORKS
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Photocopying, laser printing, digital applications, mobile accessories, and imitation jewellery in one convenient neighborhood shop.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Xerox & Digital Services
                </a>
              </li>
              <li>
                <a href="#accessories" className="hover:text-white transition-colors">
                  Mobile Accessories
                </a>
              </li>
              <li>
                <a href="#jewellery" className="hover:text-white transition-colors">
                  Jewellery & Style
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  Location & Map
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact & Enquiries
                </a>
              </li>
              {onOpenLogin && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="font-medium transition-colors text-left hover:underline"
                    style={{ color: accentConfig.light }}
                  >
                    Owner & Staff Portal Login
                  </button>
                </li>
              )}
              {onReplayIntro && (
                <li>
                  <button
                    type="button"
                    onClick={onReplayIntro}
                    className="text-neutral-400 hover:text-white transition-colors text-left"
                  >
                    Replay Logo Animation
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Services Scope */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Core Capabilities
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>High-Volume B&W Copying</li>
              <li>Color Laser Printing & Lamination</li>
              <li>e-Sevai & Online Form Submission</li>
              <li>Smartphone Cables & Protection</li>
              <li>Fashion & Traditional Adornments</li>
            </ul>
          </div>

          {/* Location & Directions */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white">
              Shop Location
            </span>
            <p className="text-neutral-400 leading-relaxed">
              SRIVIGNESH XEROX & ONLINE WORKS, Near Bus Stop, Tamil Nadu, India.
            </p>
            <a
              href={shopInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline font-medium pt-1"
              style={{ color: accentConfig.primary }}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Demo Notice Banner (Mandatory Requirement) */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-neutral-400">
            Website concept by <span className="font-medium" style={{ color: accentConfig.light }}>KK GROUP</span> — unofficial demo for client review.
          </p>

          <p className="text-neutral-500 text-[11px]">
            © {new Date().getFullYear()} SRIVIGNESH XEROX & ONLINE WORKS. All product names and marks belong to their respective holders.
          </p>
        </div>
      </div>
    </footer>
  );
}
