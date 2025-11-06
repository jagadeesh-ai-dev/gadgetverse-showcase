export interface Product {
  id: number;
  name: string;
  category: 'Smartwatches' | 'Earbuds' | 'Cameras' | 'Accessories';
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
  pros: string[];
  cons: string[];
  affiliateLink: string;
  isTopDeal?: boolean;
}

import smartwatch1 from '@/assets/smartwatch-1.jpg';
import smartwatch2 from '@/assets/smartwatch-2.jpg';
import earbuds1 from '@/assets/earbuds-1.jpg';
import earbuds2 from '@/assets/earbuds-2.jpg';
import camera1 from '@/assets/camera-1.jpg';
import camera2 from '@/assets/camera-2.jpg';
import accessory1 from '@/assets/accessory-1.jpg';
import accessory2 from '@/assets/accessory-2.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: 'TechPro Elite Smartwatch',
    category: 'Smartwatches',
    price: 299.99,
    rating: 4.8,
    image: smartwatch1,
    description: 'Premium smartwatch with advanced fitness tracking, heart rate monitoring, and sleek metal design.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-Day Battery', 'Sleep Tracking'],
    pros: ['Elegant design', 'Long battery life', 'Accurate fitness tracking'],
    cons: ['Premium price point', 'Limited app ecosystem'],
    affiliateLink: 'https://example.com/product1',
    isTopDeal: true
  },
  {
    id: 2,
    name: 'FitZone Sport Watch',
    category: 'Smartwatches',
    price: 179.99,
    rating: 4.5,
    image: smartwatch2,
    description: 'Fitness-focused smartwatch with vibrant AMOLED display and comprehensive health metrics.',
    features: ['AMOLED Display', 'Heart Rate', 'SpO2', 'Multi-Sport Modes', '10-Day Battery'],
    pros: ['Great value', 'Excellent battery life', 'Bright display'],
    cons: ['Plastic build', 'Basic smart features'],
    affiliateLink: 'https://example.com/product2'
  },
  {
    id: 3,
    name: 'SoundMax Pro Earbuds',
    category: 'Earbuds',
    price: 129.99,
    rating: 4.7,
    image: earbuds1,
    description: 'True wireless earbuds with premium sound quality and all-day comfort.',
    features: ['Active Noise Cancellation', '30hr Battery', 'IPX4 Water Resistant', 'Touch Controls'],
    pros: ['Comfortable fit', 'Great sound quality', 'Long battery life'],
    cons: ['No wireless charging case', 'Average call quality'],
    affiliateLink: 'https://example.com/product3',
    isTopDeal: true
  },
  {
    id: 4,
    name: 'AudioPro Max Headphones',
    category: 'Earbuds',
    price: 249.99,
    rating: 4.9,
    image: earbuds2,
    description: 'Premium over-ear headphones with industry-leading noise cancellation.',
    features: ['Premium ANC', '40hr Battery', 'Hi-Res Audio', 'Comfort Padding', 'Multi-device'],
    pros: ['Exceptional sound', 'Best-in-class ANC', 'Supreme comfort'],
    cons: ['Higher price', 'Bulky for travel'],
    affiliateLink: 'https://example.com/product4',
    isTopDeal: true
  },
  {
    id: 5,
    name: 'VisionPro 4K Camera',
    category: 'Cameras',
    price: 899.99,
    rating: 4.6,
    image: camera1,
    description: 'Professional mirrorless camera with stunning 4K video and impressive low-light performance.',
    features: ['26MP Sensor', '4K 60fps Video', 'In-Body Stabilization', 'WiFi', 'Weather Sealed'],
    pros: ['Professional quality', 'Versatile features', 'Great build quality'],
    cons: ['Learning curve', 'Premium investment'],
    affiliateLink: 'https://example.com/product5'
  },
  {
    id: 6,
    name: 'ActionCam Ultra',
    category: 'Cameras',
    price: 399.99,
    rating: 4.7,
    image: camera2,
    description: 'Rugged action camera for adventure seekers with 4K video and waterproof housing.',
    features: ['4K Video', 'Waterproof 10m', 'Image Stabilization', 'Voice Control', 'Touch Screen'],
    pros: ['Durable design', 'Easy to use', 'Great stabilization'],
    cons: ['Limited battery life', 'Small screen'],
    affiliateLink: 'https://example.com/product6'
  },
  {
    id: 7,
    name: 'PowerCable USB-C Pro',
    category: 'Accessories',
    price: 29.99,
    rating: 4.4,
    image: accessory1,
    description: 'Durable braided charging cable with fast charging support and reinforced connectors.',
    features: ['USB-C', 'Fast Charging', 'Braided Design', '6ft Length', 'Reinforced Connectors'],
    pros: ['Durable construction', 'Fast charging', 'Tangle-free'],
    cons: ['Slightly stiff', 'No color options'],
    affiliateLink: 'https://example.com/product7'
  },
  {
    id: 8,
    name: 'ChargePad Wireless Pro',
    category: 'Accessories',
    price: 49.99,
    rating: 4.6,
    image: accessory2,
    description: 'Fast wireless charging pad with LED indicator and universal compatibility.',
    features: ['15W Fast Charging', 'LED Indicator', 'Non-Slip Surface', 'Qi Compatible', 'Safe Charging'],
    pros: ['Fast charging', 'Sleek design', 'Universal compatibility'],
    cons: ['No included adapter', 'Gets warm during use'],
    affiliateLink: 'https://example.com/product8',
    isTopDeal: true
  }
];
