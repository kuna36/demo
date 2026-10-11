import { useState } from 'react';
import { Phone, MessageCircle, Send, CheckCircle2, AlertCircle, Edit3, Navigation } from 'lucide-react';
import { ShopContactInfo } from '../types.ts';
import { useTheme } from '../context/ThemeContext.tsx';

interface ContactSectionProps {
  shopInfo: ShopContactInfo;
  onUpdateContactInfo: (updated: Partial<ShopContactInfo>) => void;
  prefilledSubject?: string;
}

export function ContactSection({ shopInfo, onUpdateContactInfo, prefilledSubject }: ContactSectionProps) {
  const { isDark, accentConfig } = useTheme();

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState(prefilledSubject || 'Xerox & Photocopy');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submittedDemoNotice, setSubmittedDemoNotice] = useState(false);

  // Editable owner phone toggle
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(shopInfo.whatsappPhone);

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Please provide your name';
    if (!phone.trim()) {
      errors.phone = 'Please provide a contact phone number';
    } else if (!/^[0-9+ -]{8,15}$/.test(phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!message.trim()) errors.message = 'Please enter your message or service requirement';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmittedDemoNotice(true);
  };

  const handleOpenWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello SRIVIGNESH XEROX & ONLINE WORKS, I would like to enquire about: ${serviceCategory}. Details: ${message || 'General enquiry'}. From: ${name || 'Customer'}`
    );
    const cleanNumber = shopInfo.whatsappPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  };

  const handleSavePhone = () => {
    if (tempPhone.trim()) {
      onUpdateContactInfo({
        phone: tempPhone.trim(),
        whatsappPhone: tempPhone.trim(),
        isPhoneVerified: true,
      });
      setIsEditingPhone(false);
    }
  };

  return (
    <section id="contact" className={`py-20 transition-colors duration-300 ${isDark ? 'bg-[#0B0F19] text-white border-b border-neutral-800' : 'bg-[#F5F5F2] text-[#171A21] border-b border-neutral-300'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span
            className="text-xs uppercase tracking-widest font-semibold transition-colors"
            style={{ color: accentConfig.primary }}
          >
            Get in Touch
          </span>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#101827]'}`}>
            Contact & Service Enquiries
          </h2>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
            Have a question about document requirements, bulk printing, accessory availability, or custom formatting? Reach out or visit directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Owner Settings */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`rounded-2xl p-6 sm:p-8 border shadow-sm space-y-6 ${
              isDark ? 'bg-[#131926] border-neutral-800' : 'bg-white border-neutral-200'
            }`}>
              <div className="space-y-1">
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#101827]'}`}>Direct Contact Channels</h3>
                <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
                  Walk-in counter, telephone, and WhatsApp messaging.
                </p>
              </div>

              {/* Phone / WhatsApp Card */}
              <div className="space-y-4 pt-2">
                <div className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#171F2E] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#101827]'}`}>
                      <MessageCircle className="w-4 h-4 text-emerald-500" />
                      <span>WhatsApp & Call Number</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingPhone(!isEditingPhone)}
                      className="text-[11px] font-medium flex items-center gap-1 transition-colors"
                      style={{ color: accentConfig.primary }}
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>{isEditingPhone ? 'Cancel' : 'Edit Number'}</span>
                    </button>
                  </div>

                  {isEditingPhone ? (
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={tempPhone}
                        onChange={(e) => setTempPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className={`w-full text-xs p-2 rounded border focus:outline-none ${
                          isDark
                            ? 'bg-[#101827] text-white border-neutral-700'
                            : 'bg-white border-neutral-300'
                        }`}
                        style={{
                          borderColor: accentConfig.primary,
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleSavePhone}
                        className="w-full py-1.5 text-xs font-semibold rounded shadow-sm"
                        style={{
                          backgroundColor: accentConfig.primary,
                          color: accentConfig.contrastText,
                        }}
                      >
                        Save Number for Demo
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div
                          className="text-base font-mono font-semibold"
                          style={{ color: accentConfig.primary }}
                        >
                          {shopInfo.whatsappPhone}
                        </div>
                        <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {shopInfo.isPhoneVerified ? 'Verified by Owner' : 'Demo Placeholder (Pending Owner)'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenWhatsAppDirect}
                        className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct Google Maps Navigation Card */}
                <div className={`p-4 rounded-xl border space-y-2 ${
                  isDark ? 'bg-[#171F2E] border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className={`text-xs font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-[#101827]'}`}>
                        <Navigation className="w-4 h-4" style={{ color: accentConfig.primary }} />
                        <span>Walk-in Counter</span>
                      </span>
                      <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {shopInfo.address}
                      </p>
                    </div>
                  </div>
                  <a
                    href={shopInfo.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold hover:underline inline-flex items-center gap-1 pt-1"
                    style={{ color: accentConfig.primary }}
                  >
                    <span>Get Directions on Google Maps</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Verified Owner Prompt */}
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 space-y-2">
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <AlertCircle className="w-4 h-4" style={{ color: accentConfig.primary }} />
                  <span>Client Verification Checklist</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  During client demonstration, verify that:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-neutral-300">
                  <li>Store contact and WhatsApp numbers match live SIM.</li>
                  <li>Opening hours account for lunch breaks or festival days.</li>
                  <li>Retail product catalogue reflects current on-shelf accessories.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Demo Enquiry Form */}
          <div className={`lg:col-span-7 rounded-2xl p-6 sm:p-8 border shadow-sm space-y-6 ${
            isDark ? 'bg-[#131926] border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className="space-y-1">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#101827]'}`}>
                Send Online Enquiry / Service Request
              </h3>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-[#6B7280]'}`}>
                Fill out your details below to generate a direct enquiry or test the message flow.
              </p>
            </div>

            {submittedDemoNotice ? (
              <div className="p-6 rounded-xl bg-[#101827] text-white space-y-4 border border-neutral-800">
                <div className="flex items-center gap-2" style={{ color: accentConfig.primary }}>
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold text-sm">Demo Form Validation Successful</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Inputs have been validated on the client side. As specified for this Base44 presentation demo, no mock backend was falsely triggered. You can now launch this enquiry directly into WhatsApp:
                </p>

                <div className="p-3 bg-neutral-900 rounded-lg text-xs font-mono text-neutral-300 border border-neutral-800">
                  <div className="text-neutral-400">Name: {name}</div>
                  <div className="text-neutral-400">Phone: {phone}</div>
                  <div className="text-neutral-400">Category: {serviceCategory}</div>
                  <div className="mt-1" style={{ color: accentConfig.light }}>Message: {message}</div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirect}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedDemoNotice(false);
                      setMessage('');
                    }}
                    className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium"
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-[#101827]'}`}>
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh"
                      className={`w-full px-3 py-2 text-xs rounded-lg focus:outline-none border ${
                        formErrors.name
                          ? 'border-red-400'
                          : isDark
                            ? 'bg-[#171F2E] text-white border-neutral-700'
                            : 'bg-[#F5F5F2] text-neutral-900 border-neutral-300'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-500">{formErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-[#101827]'}`}>
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3 py-2 text-xs rounded-lg focus:outline-none border ${
                        formErrors.phone
                          ? 'border-red-400'
                          : isDark
                            ? 'bg-[#171F2E] text-white border-neutral-700'
                            : 'bg-[#F5F5F2] text-neutral-900 border-neutral-300'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-[#101827]'}`}>
                    Service or Product Category
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-lg focus:outline-none border ${
                      isDark
                        ? 'bg-[#171F2E] text-white border-neutral-700'
                        : 'bg-[#F5F5F2] text-neutral-900 border-neutral-300'
                    }`}
                  >
                    <option value="Xerox & Photocopy">Xerox & Photocopying (B&W / Color)</option>
                    <option value="Document Scanning">Document Scanning & Digitization</option>
                    <option value="Online Application">Online Application / e-Sevai Form</option>
                    <option value="Lamination & Binding">Lamination & Spiral Binding</option>
                    <option value="Mobile Accessories">Mobile Accessories Enquiry</option>
                    <option value="Jewellery Collection">Jewellery & Bangles Enquiry</option>
                    <option value="Other General Enquiry">Other General Enquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className={`text-xs font-semibold ${isDark ? 'text-neutral-200' : 'text-[#101827]'}`}>
                    Details / Requirement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe number of copies, document type, accessory model, or jewellery piece..."
                    className={`w-full px-3 py-2 text-xs rounded-lg focus:outline-none border ${
                      formErrors.message
                        ? 'border-red-400'
                        : isDark
                          ? 'bg-[#171F2E] text-white border-neutral-700'
                          : 'bg-[#F5F5F2] text-neutral-900 border-neutral-300'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="text-[11px] text-red-500">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    style={{
                      backgroundColor: accentConfig.primary,
                      color: accentConfig.contrastText,
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate & Preview Enquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenWhatsAppDirect}
                    className={`w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 border ${
                      isDark
                        ? 'bg-neutral-900 border-neutral-700 text-white hover:bg-neutral-800'
                        : 'bg-white border-neutral-300 text-[#101827] hover:bg-neutral-50'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Chat Directly on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
