import { Printer, Globe, ShoppingBag, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface BusinessIntroProps {
  onScrollTo: (sectionId: string) => void;
}

export function BusinessIntro({ onScrollTo }: BusinessIntroProps) {
  const { isDark, accentConfig } = useTheme();

  const pillars = [
    {
      id: 'services',
      icon: Printer,
      title: 'Xerox & Document Works',
      description: 'Single and bulk photocopies, laser color prints, high-DPI scanning, document lamination, and project spiral binding.',
      actionLabel: 'View Xerox Services',
    },
    {
      id: 'digital',
      icon: Globe,
      title: 'Online & e-Services',
      description: 'Government portal applications, exam form registrations, smart card printouts, bilingual typing, and online fee submissions.',
      actionLabel: 'View Online Services',
    },
    {
      id: 'accessories',
      icon: ShoppingBag,
      title: 'Mobile Accessories',
      description: 'Durable charging cables, fast wall adapters, scratch-proof tempered glass, phone cases, OTG drives, and audio earbuds.',
      actionLabel: 'Browse Accessories',
    },
    {
      id: 'jewellery',
      icon: Sparkles,
      title: 'Jewellery & Adornments',
      description: 'Curated traditional gold-finish bangles, delicate crystal earrings, contemporary pendant chains, and festive accessories.',
      actionLabel: 'Browse Jewellery',
    },
  ];

  return (
    <section className={`py-16 transition-colors duration-300 ${isDark ? 'bg-[#0B0F19] text-white border-b border-neutral-800' : 'bg-[#F5F5F2] text-[#171A21] border-b border-neutral-300/80'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Verification Note for Owner */}
        <div className="bg-[#171A21] text-neutral-200 rounded-xl p-4 sm:p-5 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accentConfig.primary }} />
            <div className="space-y-0.5">
              <h2 className="text-xs font-semibold text-white uppercase tracking-wider">
                Store Owner Information Verification
              </h2>
              <p className="text-xs text-neutral-400">
                This presentation demo models the 4 confirmed branches of SRIVIGNESH XEROX & ONLINE WORKS. Sample service rates, product stock, and opening times can be modified to match your current counter inventory.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs" style={{ color: accentConfig.light }}>
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">100% Commercial Shop Focused</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span
            className="text-xs uppercase tracking-widest font-semibold"
            style={{ color: accentConfig.primary }}
          >
            One Stop Community Hub
          </span>
          <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#101827]'}`}>
            Four Core Offerings Under One Roof
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
            Eliminate trips to multiple shops. We combine essential neighborhood documentation and digital workflows with retail lifestyle essentials.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-xl p-5 sm:p-6 border transition-all flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#131926] border-neutral-800 shadow-md hover:border-neutral-700'
                    : 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
                }`}
                style={{
                  boxShadow: isDark ? `0 4px 20px rgba(0,0,0,0.4)` : undefined,
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded-lg bg-[#101827] border border-neutral-800 flex items-center justify-center transition-colors"
                      style={{ color: accentConfig.primary }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
                  </div>
                  <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#101827]'}`}>{item.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>{item.description}</p>
                </div>

                <div className={`pt-6 mt-4 border-t ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
                  <button
                    type="button"
                    onClick={() => onScrollTo(item.id === 'digital' ? 'services' : item.id)}
                    className="text-xs font-semibold transition-colors flex items-center gap-1 group"
                    style={{ color: accentConfig.primary }}
                  >
                    <span>{item.actionLabel}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
