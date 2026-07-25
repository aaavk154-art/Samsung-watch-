export type WatchCategory = 'all' | 'ultra' | 'watch7' | 'classic' | 'fe' | 'straps';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  bgClass?: string;
}

export interface WatchSpecs {
  caseMaterial: string;
  glass: string;
  processor: string;
  battery: string;
  waterResistance: string;
  gps: string;
  sensors: string[];
  weight: string;
}

export interface Product {
  id: string;
  name: string;
  series: 'Galaxy Watch Ultra' | 'Galaxy Watch7' | 'Galaxy Watch6 Classic' | 'Galaxy Watch FE';
  tagline: string;
  category: WatchCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  colors: ColorOption[];
  sizes: string[];
  connectivity: string[];
  image: string;
  gallery: string[];
  specs: WatchSpecs;
  highlights: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  inStock: boolean;
}

export interface CustomStrap {
  id: string;
  name: string;
  material: string;
  price: number;
  colorName: string;
  colorHex: string;
  image: string;
  compatibleModels: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  selectedConnectivity: string;
  selectedStrap?: CustomStrap;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  watchModel: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  likes: number;
}

export interface AIQuizAnswers {
  primaryUse: string; // 'extreme_sports' | 'daily_health' | 'executive_style' | 'budget_smart'
  workoutType: string; // 'hiking_diving' | 'gym_running' | 'golf_walking' | 'casual'
  preferredSize: string; // 'compact' | 'standard' | 'large_rugged'
  desiredBattery: string; // 'multi_day' | 'daily'
  budgetRange: string; // 'under10k' | '10k_20k' | 'above20k'
}

export interface AIRecommendationResponse {
  recommendedProduct: Product;
  matchScore: number;
  reasoning: string[];
  suggestedAccessories: CustomStrap[];
}
