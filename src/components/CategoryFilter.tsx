import { Button } from '@/components/ui/button';

const categories = ['All', 'Smartwatches', 'Earbuds', 'Cameras', 'Accessories'] as const;

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          className="transition-all text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
