import { Slider } from '@/components/ui/slider';
import { useCurrency } from '@/contexts/CurrencyContext';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceRangeFilter = ({ min, max, value, onChange }: PriceRangeFilterProps) => {
  const { formatPrice } = useCurrency();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Price Range</label>
        <span className="text-sm text-muted-foreground">
          {formatPrice(value[0])} - {formatPrice(value[1])}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={10}
        value={value}
        onValueChange={onChange as (value: number[]) => void}
        className="w-full"
      />
    </div>
  );
};
