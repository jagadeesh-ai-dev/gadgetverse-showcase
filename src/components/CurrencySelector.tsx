import { Currency, useCurrency } from '@/contexts/CurrencyContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const currencies: { value: Currency; label: string; flag: string }[] = [
  { value: 'USD', label: 'USD - US Dollar', flag: '🇺🇸' },
  { value: 'INR', label: 'INR - Indian Rupee', flag: '🇮🇳' },
  { value: 'EUR', label: 'EUR - Euro', flag: '🇪🇺' },
  { value: 'GBP', label: 'GBP - British Pound', flag: '🇬🇧' },
  { value: 'AUD', label: 'AUD - Australian Dollar', flag: '🇦🇺' },
];

const CurrencySelector = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((curr) => (
          <SelectItem key={curr.value} value={curr.value}>
            <span className="flex items-center gap-2">
              <span>{curr.flag}</span>
              <span>{curr.value}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
