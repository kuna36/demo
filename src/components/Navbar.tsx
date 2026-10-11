import { useState } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Sun, Moon, Lock, Phone, Navigation } from 'lucide-react';
import { ShopContactInfo } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { ThemeColorPicker } from './ThemeColorPicker.tsx';
import { ASSET_IMAGES } from '../data/shopData.ts';

interface NavbarProps {
  shopInfo: ShopContactInfo;
  onOpenEnquiryModal: () => void;
  onOpenLogin: () => void;
}

export function Navbar({ shopInfo, onOpenEnquiryModal, onOpenLogin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme, accentConfig } = useTheme();

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Accessories', href: '#accessories' },
    { label: 'Jewellery', href: '#jewellery' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#101827]/95 backdrop-blur-md border-b border-neutral-800 text-white transition-all">
      {/* Top Demo Banner Notice - Clean and responsive on all screen sizes */}
      <div className="bg-[#171A21] border-b border-neutral-800 text-[11px] text-neutral-400 py-1 px-3 sm:px-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1 text-center sm:text-left truncate">
          <span style={{ color: accentConfig.primary }} className="font-semibold">
            KK GROUP CONCEPT DEMO
          </span>
          <span className="mx-1.5 text-neutral-600">·</span>
          <span className="hidden sm:inline">Unofficial interactive showcase for </span>
          <span>SRIVIGNESH XEROX</span>
        </div>
        <button
          type="button"
          onClick={onOpenLogin}
          className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors shrink-0 ml-2"
        >
          <Lock className="w-3 h-3" style={{ color: accentConfig.primary }} />
          <span>Staff Login</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-14 sm:h-16">
          {/* Brand Wordmark + Circular Emblem */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 text-sm sm:text-lg font-bold tracking-tight text-white transition-colors shrink-0 group min-w-0"
          >
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0"
              style={{
                borderColor: accentConfig.primary,
                background: `linear-gradient(135deg, ${accentConfig.primary}, ${accentConfig.light})`,
              }}
            >
              <img
                src={ASSET_IMAGES.logo}
                alt="SRIVIGNESH Logo"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display tracking-wider leading-none truncate text-xs sm:text-base">
                SRIVIGNESH
              </span>
              <span
                className="font-sans text-[9px] sm:text-[11px] font-semibold tracking-wider uppercase leading-tight truncate"
                style={{ color: accentConfig.light }}
              >
                XEROX & ONLINE WORKS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-current"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Controls (Tablet & Desktop) */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Theme Accent Color Picker */}
            <ThemeColorPicker variant="popover" />

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" style={{ color: accentConfig.primary }} /> : <Moon className="w-4 h-4 text-neutral-300" />}
            </button>

            {/* Owner Login Button */}
            <button
              type="button"
              onClick={onOpenLogin}
              className="p-2 rounded-lg border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Store Owner & Staff Login Portal"
              aria-label="Store Owner Login"
            >
              <Lock className="w-4 h-4" style={{ color: accentConfig.primary }} />
            </button>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenEnquiryModal}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95"
              style={{
                backgroundColor: accentConfig.primary,
                color: accentConfig.contrastText,
              }}
            >
              <span>Quick Enquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Clean, uncluttered, and touch-optimized */}
          <div className="flex items-center gap-1.5 sm:hidden shrink-0">
            {/* Mobile Quick Action Pill */}
            <button
              type="button"
              onClick={onOpenEnquiryModal}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95"
              style={{
                backgroundColor: accentConfig.primary,
                color: accentConfig.contrastText,
              }}
              aria-label="Quick Enquiry"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-[11px]">Enquire</span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-200 hover:text-white rounded-lg border border-neutral-700 bg-neutral-900/90 active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu - Polished, fully native mobile experience */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#131926] border-b border-neutral-800 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          {/* Navigation Links */}
          <nav className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Appearance & Theme Section */}
          <div className="pt-2 border-t border-neutral-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-semibold uppercase text-[10px] tracking-wider">Appearance</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-700 text-neutral-200"
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
                    <span>Dark Mode Active</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Light Mode Active</span>
                  </>
                )}
              </button>
            </div>

            {/* Theme Accent Color Swatches in Mobile Drawer */}
            <div className="bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800">
              <div className="text-[10px] uppercase font-semibold text-neutral-400 mb-1.5 tracking-wider">
                Accent Theme Color
              </div>
              <ThemeColorPicker variant="inline" />
            </div>
          </div>

          {/* Action CTAs in Mobile Drawer */}
          <div className="pt-2 border-t border-neutral-800/80 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${shopInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="py-2.5 text-center text-xs font-semibold text-neutral-100 bg-neutral-900 border border-neutral-700 rounded-lg flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Phone className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
                <span>Call Store</span>
              </a>

              <a
                href={shopInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 text-center text-xs font-semibold text-neutral-100 bg-neutral-900 border border-neutral-700 rounded-lg flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
                <span>Directions</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-neutral-200 bg-neutral-900/60 border border-neutral-800 rounded-lg flex items-center justify-center gap-1.5 hover:border-neutral-600 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
              <span>Owner & Staff Portal Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
