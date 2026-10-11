import { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { ShopContactInfo } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  shopInfo: ShopContactInfo;
  defaultSubject?: string;
}

export function QuickEnquiryModal({
  isOpen,
  onClose,
  shopInfo,
  defaultSubject = 'General Enquiry',
}: QuickEnquiryModalProps) {
  const { accentConfig } = useTheme();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [validatedState, setValidatedState] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name');
      return;
    }
    if (!phone.trim() || !/^[0-9+ -]{8,15}$/.test(phone.trim())) {
      setError('Please provide a valid contact number');
      return;
    }
    setError('');
    setValidatedState(true);
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello SRIVIGNESH XEROX & ONLINE WORKS,\nI would like to enquire about: ${subject}\nDetails: ${message || 'Please share details and availability.'}\nFrom: ${name || 'Customer'} (${phone || 'N/A'})`
    );
    const cleanNumber = shopInfo.whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#171A21] text-white w-full max-w-lg rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Send Quick Enquiry</h3>
            <span className="text-xs" style={{ color: accentConfig.light }}>SRIVIGNESH XEROX & ONLINE WORKS</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {validatedState ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2" style={{ color: accentConfig.primary }}>
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-semibold">Ready to Send via WhatsApp</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Your message details have been formulated. Click below to launch the verified WhatsApp chat with this request pre-filled.
              </p>
              <div className="p-3 bg-neutral-900 rounded-lg text-xs font-mono text-neutral-300 border border-neutral-800 space-y-1">
                <div>Enquiry: {subject}</div>
                <div>Customer: {name} ({phone})</div>
                <div className="text-neutral-400">Notes: {message || 'Standard inquiry'}</div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open in WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setValidatedState(false)}
                  className="py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleValidate} className="space-y-3">
              {error && (
                <div className="p-2.5 bg-red-950/60 border border-red-800/80 rounded-lg text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Enquiry Topic</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Additional Details</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your requirement (number of copies, accessory model, etc.)"
                  className="w-full px-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none text-white"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                  style={{
                    backgroundColor: accentConfig.primary,
                    color: accentConfig.contrastText,
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Prepare WhatsApp Enquiry</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 rounded-xl text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
