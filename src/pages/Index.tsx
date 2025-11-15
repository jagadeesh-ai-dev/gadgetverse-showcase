import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import SortSelector, { SortOption } from '@/components/SortSelector';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import TopDeals from '@/components/TopDeals';
import Footer from '@/components/Footer';
import { useProducts, Product } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: products, isLoading } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
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
  }, [products, searchQuery, activeCategory, sortOption]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
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

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
          />
          <SortSelector value={sortOption} onChange={setSortOption} />
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
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
      
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Index;
