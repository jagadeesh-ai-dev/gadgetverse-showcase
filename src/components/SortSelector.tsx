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
    <div className="flex items-center gap-3 mb-8">
      <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
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
