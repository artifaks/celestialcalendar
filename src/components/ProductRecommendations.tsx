import { ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  savings: string;
  imageUrl: string;
  affiliateUrl: string;
  alt: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Crystal for beginners',
    subtitle: 'The Guide to Get Started with the Healing Power of Crystals',
    price: '$6.24',
    originalPrice: '$6.99',
    savings: 'Save $0.75',
    imageUrl: 'https://m.media-amazon.com/images/I/71Rn0h3bMuL._SY425_.jpg',
    affiliateUrl: 'https://amzn.to/4fOqlLX',
    alt: 'Crystal for beginners',
  },
  {
    id: 2,
    title: 'Nature Nutrition Guide',
    subtitle: "Unlocking the healing of Earths Most potent Superfoods",
    price: '$9.99',
    originalPrice: '$14.99',
    savings: 'Save $5.00',
    imageUrl: 'https://m.media-amazon.com/images/I/71N7JKF8i4L._SY425_.jpg',
    affiliateUrl: 'https://amzn.to/4hJlNrV',
    alt: 'Nature Nutrition Guide',
  },
];

export default function ProductRecommendations() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="flex items-center gap-2 text-amber-400 text-xl font-bold mb-6">
        <ShoppingBag size={22} /> Recommended Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all hover:scale-[1.02]"
          >
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.alt}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-2 right-2 bg-amber-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                {product.savings}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-amber-400 font-semibold mb-1">{product.title}</h3>
              <p className="text-white/60 text-sm mb-3">{product.subtitle}</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{product.price}</span>
                <span className="text-white/40 line-through text-sm">{product.originalPrice}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <p className="text-white/30 text-xs mt-4">
        Some links on this page are affiliate links. We may earn a commission if you make a purchase through them.
      </p>
    </div>
  );
}
