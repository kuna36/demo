export interface ServiceItem {
  id: string;
  title: string;
  category: 'xerox' | 'printing' | 'digital' | 'finishing';
  description: string;
  features: string[];
  turnaround: string;
  isVerified: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price?: number;
  isDemoPrice: boolean;
  description: string;
  specs?: string[];
  inStock: boolean;
  image?: string;
}

export interface JewelleryItem {
  id: string;
  name: string;
  category: 'Earrings' | 'Necklaces' | 'Bangles' | 'Sets' | 'Pendants';
  materialType: string;
  price?: number;
  isDemoPrice: boolean;
  description: string;
  inStock: boolean;
  image?: string;
}

export interface ShopContactInfo {
  businessName: string;
  tagline: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  phone: string;
  whatsappPhone: string;
  isPhoneVerified: boolean;
  email: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  agencyName: string;
}
