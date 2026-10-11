import { useState } from 'react';
import { Lock, Mail, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Save, X, Phone, Clock, ShoppingBag, Sparkles, AlertCircle } from 'lucide-react';
import { ShopContactInfo, ProductItem, JewelleryItem, ServiceItem } from '../types.ts';
import { ASSET_IMAGES } from '../data/shopData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface LoginPageProps {
  isOpen: boolean;
  onClose: () => void;
  shopInfo: ShopContactInfo;
  onUpdateShopInfo: (updated: Partial<ShopContactInfo>) => void;
  products: ProductItem[];
  onUpdateProducts: (updated: ProductItem[]) => void;
  jewellery: JewelleryItem[];
  onUpdateJewellery: (updated: JewelleryItem[]) => void;
}

export function LoginPage({
  isOpen,
  onClose,
  shopInfo,
  onUpdateShopInfo,
  products,
  onUpdateProducts,
  jewellery,
  onUpdateJewellery,
}: LoginPageProps) {
  const { accentConfig } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('owner@srivignesh.com');
  const [password, setPassword] = useState('admin123');
  const [activeTab, setActiveTab] = useState<'profile' | 'accessories' | 'jewellery'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Editable local copies
  const [localPhone, setLocalPhone] = useState(shopInfo.phone);
  const [localWhatsapp, setLocalWhatsapp] = useState(shopInfo.whatsappPhone);
  const [localWeekdays, setLocalWeekdays] = useState(shopInfo.openingHours.weekdays);
  const [localSunday, setLocalSunday] = useState(shopInfo.openingHours.sunday);
  const [localProducts, setLocalProducts] = useState<ProductItem[]>(products);
  const [localJewellery, setLocalJewellery] = useState<JewelleryItem[]>(jewellery);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setIsAuthenticated(true);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('owner@srivignesh.com');
    setPassword('admin123');
    setIsAuthenticated(true);
  };

  const handleSaveChanges = () => {
    onUpdateShopInfo({
      phone: localPhone,
      whatsappPhone: localWhatsapp,
      isPhoneVerified: true,
      openingHours: {
        weekdays: localWeekdays,
        sunday: localSunday,
      },
    });
    onUpdateProducts(localProducts);
    onUpdateJewellery(localJewellery);

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const updateProductPrice = (id: string, newPrice: number) => {
    setLocalProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: newPrice, isDemoPrice: false } : item
      )
    );
  };

  const updateJewelleryPrice = (id: string, newPrice: number) => {
    setLocalJewellery((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, price: newPrice, isDemoPrice: false } : item
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
      <div className="bg-[#101827] border border-neutral-800 text-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-3 sm:my-8 animate-in fade-in duration-200">
        {/* Top Header */}
        <div className="p-3.5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-[#171A21] gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border p-0.5 shrink-0"
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
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">SRIVIGNESH XEROX</span>
                <span
                  className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold shrink-0"
                  style={{
                    backgroundColor: accentConfig.primary,
                    color: accentConfig.contrastText,
                  }}
                >
                  {isAuthenticated ? 'ADMIN' : 'PORTAL'}
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs text-neutral-400 truncate">
                {isAuthenticated
                  ? 'Manage business details, verified prices, and inventory'
                  : 'Client Administration & Verification Portal'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors shrink-0"
            title="Return to website"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Login Form View */}
        {!isAuthenticated ? (
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div className="text-center max-w-sm mx-auto space-y-1.5">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 bg-[#171A21] border border-neutral-700 rounded-xl flex items-center justify-center mx-auto transition-colors"
                style={{ color: accentConfig.primary }}
              >
                <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Owner & Staff Sign In</h3>
              <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
                Log in to verify business contact details, customize service listings, and set confirmed counter prices for the demo presentation.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 max-w-md mx-auto">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Email Address / User ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none text-white"
                    style={{
                      borderColor: email ? `${accentConfig.primary}80` : undefined,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Security Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg focus:outline-none text-white"
                    style={{
                      borderColor: password ? `${accentConfig.primary}80` : undefined,
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold rounded-lg transition-all shadow-md active:scale-95"
                  style={{
                    backgroundColor: accentConfig.primary,
                    color: accentConfig.contrastText,
                  }}
                >
                  Sign In to Store Portal
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2 text-xs font-medium text-neutral-300 border border-neutral-700 hover:border-neutral-500 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
                  <span>One-Click Demo Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Continue to Website (Browse Demo)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-[11px] text-neutral-400 text-center">
                <span>Demo credentials pre-filled: </span>
                <span className="font-mono font-medium" style={{ color: accentConfig.light }}>
                  owner@srivignesh.com / admin123
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard / Editor View */
          <div className="p-6 space-y-6">
            {saveSuccess && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-600 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Changes saved successfully! Your updates are now visible across the website.</span>
              </div>
            )}

            {/* Navigation Tabs - Mobile scrollable */}
            <div className="flex border-b border-neutral-800 gap-2 sm:gap-4 text-xs font-medium overflow-x-auto no-scrollbar flex-nowrap whitespace-nowrap pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 shrink-0"
                style={{
                  borderColor: activeTab === 'profile' ? accentConfig.primary : 'transparent',
                  color: activeTab === 'profile' ? accentConfig.primary : '#9CA3AF',
                }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Store Profile & Contacts</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('accessories')}
                className="pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 shrink-0"
                style={{
                  borderColor: activeTab === 'accessories' ? accentConfig.primary : 'transparent',
                  color: activeTab === 'accessories' ? accentConfig.primary : '#9CA3AF',
                }}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Accessories Pricing ({localProducts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('jewellery')}
                className="pb-2.5 transition-colors border-b-2 flex items-center gap-1.5 shrink-0"
                style={{
                  borderColor: activeTab === 'jewellery' ? accentConfig.primary : 'transparent',
                  color: activeTab === 'jewellery' ? accentConfig.primary : '#9CA3AF',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Jewellery Pricing ({localJewellery.length})</span>
              </button>
            </div>

            {/* Tab 1: Profile & Contacts */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">Public Phone Number</label>
                    <input
                      type="text"
                      value={localPhone}
                      onChange={(e) => setLocalPhone(e.target.value)}
                      className="w-full p-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">WhatsApp Chat Number</label>
                    <input
                      type="text"
                      value={localWhatsapp}
                      onChange={(e) => setLocalWhatsapp(e.target.value)}
                      className="w-full p-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">Hours (Monday – Saturday)</label>
                    <input
                      type="text"
                      value={localWeekdays}
                      onChange={(e) => setLocalWeekdays(e.target.value)}
                      className="w-full p-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-neutral-300">Hours (Sunday)</label>
                    <input
                      type="text"
                      value={localSunday}
                      onChange={(e) => setLocalSunday(e.target.value)}
                      className="w-full p-2 text-xs bg-neutral-900 border border-neutral-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-xs text-neutral-400">
                  <span className="font-semibold" style={{ color: accentConfig.primary }}>Store Address: </span>
                  <span>{shopInfo.address} (GPS: 11.7229467, 78.069487)</span>
                </div>
              </div>
            )}

            {/* Tab 2: Accessories Pricing */}
            {activeTab === 'accessories' && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {localProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-semibold text-white">{p.name}</h4>
                      <span className="text-neutral-400 text-[11px]">{p.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">₹</span>
                      <input
                        type="number"
                        value={p.price || 0}
                        onChange={(e) => updateProductPrice(p.id, Number(e.target.value))}
                        className="w-20 p-1.5 bg-neutral-800 border border-neutral-700 rounded text-xs font-mono font-semibold"
                        style={{ color: accentConfig.primary }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Jewellery Pricing */}
            {activeTab === 'jewellery' && (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {localJewellery.map((j) => (
                  <div
                    key={j.id}
                    className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-semibold text-white">{j.name}</h4>
                      <span className="text-neutral-400 text-[11px]">{j.materialType}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400">₹</span>
                      <input
                        type="number"
                        value={j.price || 0}
                        onChange={(e) => updateJewelleryPrice(j.id, Number(e.target.value))}
                        className="w-20 p-1.5 bg-neutral-800 border border-neutral-700 rounded text-xs font-mono font-semibold"
                        style={{ color: accentConfig.primary }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Actions */}
            <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsAuthenticated(false)}
                className="text-xs text-neutral-400 hover:text-white"
              >
                Sign Out
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white border border-neutral-700 hover:bg-neutral-800"
                >
                  Close & View Live Site
                </button>

                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md active:scale-95"
                  style={{
                    backgroundColor: accentConfig.primary,
                    color: accentConfig.contrastText,
                  }}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Updates</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
