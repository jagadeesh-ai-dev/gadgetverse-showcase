import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';

interface SearchBarWithAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const highlightMatch = (text: string, query: string) => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : part
  );
};

const SearchBarWithAutocomplete = ({ 
  value, 
  onChange, 
  products, 
  onProductSelect 
}: SearchBarWithAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  const suggestions = value.trim().length >= 2 
    ? products.filter(p => 
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.description.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    setIsOpen(suggestions.length > 0 && value.trim().length >= 2);
    setActiveIndex(-1);
  }, [value, suggestions.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          onProductSelect(suggestions[activeIndex]);
          setIsOpen(false);
          onChange('');
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (product: Product) => {
    onProductSelect(product);
    setIsOpen(false);
    onChange('');
  };

  return (
    <div ref={containerRef} className="relative max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        className="pl-10 pr-10 h-12 shadow-sm"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        aria-controls="search-suggestions"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {isOpen && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden"
          role="listbox"
        >
          {suggestions.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "w-full flex items-center gap-3 p-3 text-left transition-colors",
                activeIndex === index ? "bg-accent" : "hover:bg-accent/50"
              )}
              role="option"
              aria-selected={activeIndex === index}
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  {highlightMatch(product.name, value)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {highlightMatch(product.category, value)}
                </p>
              </div>
              <span className="text-sm font-semibold text-primary flex-shrink-0">
                {formatPrice(product.price)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarWithAutocomplete;
