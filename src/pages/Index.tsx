import { useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import TopDeals from '@/components/TopDeals';
import Footer from '@/components/Footer';
import { products, Product } from '@/data/products';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <TopDeals 
        products={products} 
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
        
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
        />
        
        {filteredProducts.length === 0 ? (
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
