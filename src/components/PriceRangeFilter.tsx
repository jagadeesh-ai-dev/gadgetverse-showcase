import { Slider } from '@/components/ui/slider';
import { useCurrency } from '@/contexts/CurrencyContext';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="w-full max-w-[200px] sm:max-w-xs space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Price</span>
        </div>
        <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
          {formatPrice(min)} - {formatPrice(max)}
        </span>
      </div>
      
      <Slider
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        min={min}
        max={max}
        step={10}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs sm:text-sm font-medium gap-2">
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 rounded text-primary text-[10px] sm:text-xs">{formatPrice(value[0])}</span>
        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 rounded text-primary text-[10px] sm:text-xs">{formatPrice(value[1])}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
