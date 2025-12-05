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
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Price Range</span>
      </div>
      
      <Slider
        value={value}
        onValueChange={(val) => onChange(val as [number, number])}
        min={min}
        max={max}
        step={10}
        className="w-full"
      />
      
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
