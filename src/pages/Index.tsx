import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBarWithAutocomplete from '@/components/SearchBarWithAutocomplete';
import CategoryFilter from '@/components/CategoryFilter';
import SortSelector, { SortOption } from '@/components/SortSelector';
import PriceRangeFilter from '@/components/PriceRangeFilter';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import QuickView from '@/components/QuickView';
import TopDeals from '@/components/TopDeals';
import RecentlyViewed from '@/components/RecentlyViewed';
import Footer from '@/components/Footer';
import { useProducts, Product } from '@/hooks/useProducts';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const { data: products, isLoading } = useProducts();
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  // Calculate min/max prices based on selected category
  const { minPrice, maxPrice } = useMemo(() => {
    if (!products || products.length === 0) return { minPrice: 0, maxPrice: 5000 };
    const categoryProducts = activeCategory === 'All' 
      ? products 
      : products.filter(p => p.category === activeCategory);
    if (categoryProducts.length === 0) return { minPrice: 0, maxPrice: 5000 };
    const prices = categoryProducts.map(p => p.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    };
  }, [products, activeCategory]);

  // Reset price range when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Reset to full range for new category
    const categoryProducts = category === 'All' 
      ? products || []
      : (products || []).filter(p => p.category === category);
    if (categoryProducts.length > 0) {
      const prices = categoryProducts.map(p => p.price);
      setPriceRange([Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        case 'most-reviewed':
          return (b.review_count || 0) - (a.review_count || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, activeCategory, sortOption, priceRange]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <TopDeals 
        products={products || []} 
        onViewDetails={handleViewDetails}
      />
      
      <main id="products" className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Browse All Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect tech gadget for your needs. Filter by category or search for specific products.
          </p>
        </div>

        <SearchBarWithAutocomplete 
          value={searchQuery} 
          onChange={setSearchQuery}
          products={products || []}
          onProductSelect={handleViewDetails}
        />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <PriceRangeFilter
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={setPriceRange}
            />
            <SortSelector value={sortOption} onChange={setSortOption} />
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product}
                onViewDetails={handleViewDetails}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}
      </main>
      
      <RecentlyViewed 
        products={recentlyViewed}
        onViewDetails={handleViewDetails}
        onClear={clearRecentlyViewed}
      />
      
      <Footer />
      
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductView={addToRecentlyViewed}
      />

      <QuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onViewFull={handleViewDetails}
      />
    </div>
  );
};

export default Index;
