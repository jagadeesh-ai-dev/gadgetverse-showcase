import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export type SortOption = 
  | 'price-asc' 
  | 'price-desc' 
  | 'rating-desc' 
  | 'newest' 
  | 'most-reviewed';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const SortSelector = ({ value, onChange }: SortSelectorProps) => {
  return (
    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-8">
      <ArrowUpDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[140px] sm:w-[220px] text-xs sm:text-sm">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="rating-desc">Highest Rated</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="most-reviewed">Most Reviewed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortSelector;
