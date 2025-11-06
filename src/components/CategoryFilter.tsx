import { Button } from '@/components/ui/button';

const categories = ['All', 'Smartwatches', 'Earbuds', 'Cameras', 'Accessories'] as const;

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={activeCategory === category ? "default" : "outline"}
          size="lg"
          className="transition-all"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
