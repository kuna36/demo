import { Phone, MessageCircle, Navigation, Send } from 'lucide-react';
import { ShopContactInfo } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface MobileBottomBarProps {
  shopInfo: ShopContactInfo;
  onOpenEnquiryModal: () => void;
}

export function MobileBottomBar({ shopInfo, onOpenEnquiryModal }: MobileBottomBarProps) {
  const { accentConfig } = useTheme();

  const cleanPhone = shopInfo.phone.replace(/[^0-9+]/g, '');
  const cleanWhatsApp = shopInfo.whatsappPhone.replace(/[^0-9]/g, '');

  return (
    <aside
      aria-label="Mobile quick actions"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101827]/95 backdrop-blur-lg border-t border-neutral-800/90 px-3 py-2 shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* 1. Direct Call */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-300 hover:text-white bg-neutral-900/80 active:bg-neutral-800 border border-neutral-800 transition-all active:scale-95 text-center"
        >
          <Phone className="w-4 h-4 mb-0.5" style={{ color: accentConfig.primary }} />
          <span className="text-[10px] font-semibold leading-tight">Call Shop</span>
        </a>

        {/* 2. Direct WhatsApp */}
        <a
          href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent('Hello SRIVIGNESH XEROX, I need photocopies / services.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-300 hover:text-white bg-neutral-900/80 active:bg-neutral-800 border border-neutral-800 transition-all active:scale-95 text-center"
        >
          <MessageCircle className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span className="text-[10px] font-semibold leading-tight">WhatsApp</span>
        </a>

        {/* 3. Google Maps Directions */}
        <a
          href={shopInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-neutral-300 hover:text-white bg-neutral-900/80 active:bg-neutral-800 border border-neutral-800 transition-all active:scale-95 text-center"
        >
          <Navigation className="w-4 h-4 mb-0.5" style={{ color: accentConfig.light }} />
          <span className="text-[10px] font-semibold leading-tight">Directions</span>
        </a>

        {/* 4. Quick Enquiry Button */}
        <button
          type="button"
          onClick={onOpenEnquiryModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all active:scale-95 text-center shadow-sm"
          style={{
            backgroundColor: accentConfig.primary,
            color: accentConfig.contrastText,
          }}
        >
          <Send className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-semibold leading-tight">Enquire</span>
        </button>
      </div>
    </aside>
  );
}
