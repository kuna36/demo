import { CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

export function WhyChooseUs() {
  const { isDark, accentConfig } = useTheme();

  const reasons = [
    {
      icon: Zap,
      title: 'Quick Turnaround',
      description: 'Instant photocopies, rapid printouts, and express scanning while you wait at the counter.',
    },
    {
      icon: Sparkles,
      title: 'Four Services in One Visit',
      description: 'Get your government application submitted, photocopies done, phone cable replaced, and browse fashion jewellery in a single stop.',
    },
    {
      icon: Shield,
      title: 'Privacy & Document Care',
      description: 'Your personal identification, student certificates, and legal files are handled with care and confidential discretion.',
    },
    {
      icon: CheckCircle2,
      title: 'Reliable Equipment',
      description: 'Modern calibrated laser printers and flatbed scanners ensuring clean, legible text and sharp copies every single time.',
    },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-[#0B0F19] text-white border-b border-neutral-800' : 'bg-[#F5F5F2] text-[#171A21] border-b border-neutral-300'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span
            className="text-xs uppercase tracking-widest font-semibold transition-colors"
            style={{ color: accentConfig.primary }}
          >
            Neighborhood Advantage
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#101827]'}`}>
            Why Visit SRIVIGNESH XEROX & ONLINE WORKS
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
            Practical everyday services tailored for students, job applicants, office workers, and families in the local community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`rounded-xl p-5 sm:p-6 border transition-all space-y-3 ${
                  isDark
                    ? 'bg-[#131926] border-neutral-800 shadow-md'
                    : 'bg-white border-neutral-200/90 shadow-sm'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg bg-[#101827] border border-neutral-800 flex items-center justify-center transition-colors"
                  style={{ color: accentConfig.primary }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-[#101827]'}`}>{item.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
