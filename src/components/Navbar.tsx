import { useState } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Sun, Moon, Lock } from 'lucide-react';
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
      {/* Client Demo Banner Notice */}
      <div className="bg-[#171A21] border-b border-neutral-800 text-[11px] text-neutral-400 py-1.5 px-4 text-center flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1 text-center">
          <span style={{ color: accentConfig.primary }} className="font-medium">
            Concept Demo by KK GROUP
          </span>
          <span className="mx-2 text-neutral-600">·</span>
          <span>Unofficial interactive showcase for business owner verification</span>
        </div>
        <button
          type="button"
          onClick={onOpenLogin}
          className="hidden sm:inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
        >
          <Lock className="w-3 h-3" style={{ color: accentConfig.primary }} />
          <span>Staff Login</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark + Official Circular Emblem Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-white transition-colors whitespace-nowrap shrink-0 group"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden border p-0.5 shadow-sm group-hover:scale-105 transition-transform shrink-0"
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
            <div className="flex flex-col">
              <span className="font-display tracking-wider leading-none">SRIVIGNESH</span>
              <span
                className="font-sans text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase leading-tight"
                style={{ color: accentConfig.light }}
              >
                XEROX & ONLINE WORKS
              </span>
            </div>
          </a>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-current"
                style={{
                  color: undefined,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + theme color picker + theme mode toggle + login button */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Theme Accent Color Picker */}
            <ThemeColorPicker variant="popover" />

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title={isDark ? 'Switch to Professional Light Mode' : 'Switch to High-Contrast Dark Mode'}
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
              className="px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95"
              style={{
                backgroundColor: accentConfig.primary,
                color: accentConfig.contrastText,
              }}
            >
              <span>Quick Enquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger menu toggle & quick controls */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <ThemeColorPicker variant="popover" />

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" style={{ color: accentConfig.primary }} /> : <Moon className="w-4 h-4 text-neutral-300" />}
            </button>

            <button
              type="button"
              onClick={onOpenLogin}
              className="p-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300"
              aria-label="Staff Login"
              title="Staff Login"
            >
              <Lock className="w-4 h-4" style={{ color: accentConfig.primary }} />
            </button>

            <button
              type="button"
              onClick={onOpenEnquiryModal}
              className="p-2 rounded-lg text-xs"
              style={{
                backgroundColor: accentConfig.primary,
                color: accentConfig.contrastText,
              }}
              title="Quick Enquiry"
              aria-label="Quick Enquiry"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg border border-neutral-700 bg-neutral-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#171A21] border-b border-neutral-800 px-4 py-4 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-800/60 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Theme Color Picker inside Mobile Drawer */}
          <div className="pt-3 border-t border-neutral-800">
            <ThemeColorPicker variant="inline" />
          </div>

          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-neutral-200 border border-neutral-700 rounded-lg flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
              <span>Owner & Staff Login</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEnquiryModal();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-lg shadow-sm"
              style={{
                backgroundColor: accentConfig.primary,
                color: accentConfig.contrastText,
              }}
            >
              Send Online Enquiry
            </button>

            <a
              href={shopInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 text-center text-xs font-medium text-neutral-300 border border-neutral-700 rounded-lg hover:border-neutral-500"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
