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
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Price Range</span>
        </div>
        <span className="text-xs text-muted-foreground">
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
      
      <div className="flex justify-between text-sm font-medium">
        <span className="px-2 py-1 bg-primary/10 rounded text-primary">{formatPrice(value[0])}</span>
        <span className="px-2 py-1 bg-primary/10 rounded text-primary">{formatPrice(value[1])}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
