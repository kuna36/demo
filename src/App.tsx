/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { BusinessIntro } from './components/BusinessIntro.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { AccessoriesSection } from './components/AccessoriesSection.tsx';
import { JewellerySection } from './components/JewellerySection.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { LocationSection } from './components/LocationSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { QuickEnquiryModal } from './components/QuickEnquiryModal.tsx';
import { ScrollReveal } from './components/ScrollReveal.tsx';
import { LogoEntranceAnimation } from './components/LogoEntranceAnimation.tsx';
import { LoginPage } from './components/LoginPage.tsx';
import { MobileBottomBar } from './components/MobileBottomBar.tsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx';
import {
  INITIAL_SHOP_INFO,
  SERVICES_DATA,
  ACCESSORIES_DATA,
  JEWELLERY_DATA,
} from './data/shopData.ts';
import { ShopContactInfo, ProductItem, JewelleryItem } from './types.ts';
import { MessageCircle } from 'lucide-react';

function AppContent() {
  const [shopInfo, setShopInfo] = useState<ShopContactInfo>(INITIAL_SHOP_INFO);
  const [products, setProducts] = useState<ProductItem[]>(ACCESSORIES_DATA);
  const [jewellery, setJewellery] = useState<JewelleryItem[]>(JEWELLERY_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('General Service Enquiry');
  const [showEntranceAnimation, setShowEntranceAnimation] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const { isDark } = useTheme();

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEnquiryModal = (subject = 'General Service Enquiry') => {
    setModalSubject(subject);
    setModalOpen(true);
  };

  const handleUpdateContactInfo = (updated: Partial<ShopContactInfo>) => {
    setShopInfo((prev) => ({ ...prev, ...updated }));
  };

  const handleEntranceComplete = () => {
    setShowEntranceAnimation(false);
    setShowLogin(true); // Automatically open Login after logo animation while entering
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#0B0F19] text-[#F1F5F9]' : 'bg-[#F5F5F2] text-[#171A21]'
    }`}>
      {/* 0. Logo Entrance Animation while entering */}
      {showEntranceAnimation && (
        <LogoEntranceAnimation
          target="login"
          onComplete={handleEntranceComplete}
        />
      )}

      {/* 1. Header Navigation with Theme Switcher & Staff Login */}
      <Navbar
        shopInfo={shopInfo}
        onOpenEnquiryModal={() => handleOpenEnquiryModal('General Enquiry')}
        onOpenLogin={() => setShowLogin(true)}
      />

      {/* Main Content Sections with mobile bottom bar offset */}
      <main className="flex-1 pb-20 sm:pb-0">
        {/* 2. Cinematic 3D Hero */}
        <HeroSection
          onScrollTo={handleScrollTo}
          onOpenEnquiryModal={() => handleOpenEnquiryModal('Express Xerox Enquiry')}
        />

        {/* 3. Business Introduction (4 Core Pillars) */}
        <ScrollReveal>
          <BusinessIntro onScrollTo={handleScrollTo} />
        </ScrollReveal>

        {/* 4. Xerox & Digital Services */}
        <ScrollReveal>
          <ServicesSection
            services={SERVICES_DATA}
            shopInfo={shopInfo}
            onEnquireService={(name) => handleOpenEnquiryModal(`Service: ${name}`)}
          />
        </ScrollReveal>

        {/* 5. Accessories Catalogue */}
        <ScrollReveal>
          <AccessoriesSection
            products={products}
            shopInfo={shopInfo}
            onEnquireProduct={(name, cat) =>
              handleOpenEnquiryModal(`Product Enquiry: ${name} (${cat})`)
            }
          />
        </ScrollReveal>

        {/* 6. Jewellery Showcase */}
        <ScrollReveal>
          <JewellerySection
            jewellery={jewellery}
            shopInfo={shopInfo}
            onEnquireJewellery={(name) =>
              handleOpenEnquiryModal(`Jewellery Design: ${name}`)
            }
          />
        </ScrollReveal>

        {/* 7. Why Choose Us */}
        <ScrollReveal>
          <WhyChooseUs />
        </ScrollReveal>

        {/* 8. Location & Directions */}
        <ScrollReveal>
          <LocationSection shopInfo={shopInfo} />
        </ScrollReveal>

        {/* 9. Contact & Enquiry */}
        <ScrollReveal>
          <ContactSection
            shopInfo={shopInfo}
            onUpdateContactInfo={handleUpdateContactInfo}
            prefilledSubject={modalSubject}
          />
        </ScrollReveal>
      </main>

      {/* 10. Professional Footer with mandatory KK GROUP demo notice */}
      <Footer
        shopInfo={shopInfo}
        onOpenLogin={() => setShowLogin(true)}
        onReplayIntro={() => setShowEntranceAnimation(true)}
      />

      {/* Owner & Staff Login / Store Administration Portal */}
      <LoginPage
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        shopInfo={shopInfo}
        onUpdateShopInfo={handleUpdateContactInfo}
        products={products}
        onUpdateProducts={setProducts}
        jewellery={jewellery}
        onUpdateJewellery={setJewellery}
      />

      {/* Interactive Quick Enquiry Modal */}
      <QuickEnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        shopInfo={shopInfo}
        defaultSubject={modalSubject}
      />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileBottomBar
        shopInfo={shopInfo}
        onOpenEnquiryModal={() => handleOpenEnquiryModal('Express Mobile Enquiry')}
      />

      {/* Floating WhatsApp Action Button (Tablet & Desktop only, mobile has bottom bar) */}
      <aside aria-label="Quick contact" className="hidden sm:block fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => handleOpenEnquiryModal('Quick WhatsApp Chat')}
          className="p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white/20"
          title="Direct WhatsApp Enquiry"
          aria-label="Direct WhatsApp Enquiry"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
