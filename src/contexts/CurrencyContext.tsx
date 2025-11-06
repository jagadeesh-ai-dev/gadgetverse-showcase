import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'AUD';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRates: ExchangeRates;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('preferred-currency');
    return (saved as Currency) || 'INR';
  });
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({ USD: 1 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback rates if API fails
        setExchangeRates({
          USD: 1,
          INR: 83.12,
          EUR: 0.92,
          GBP: 0.79,
          AUD: 1.52,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('preferred-currency', newCurrency);
  };

  const convertPrice = (priceInUSD: number): number => {
    const rate = exchangeRates[currency] || 1;
    return priceInUSD * rate;
  };

  const formatPrice = (priceInUSD: number): string => {
    const converted = convertPrice(priceInUSD);
    const symbol = currencySymbols[currency];
    
    if (currency === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRates,
        convertPrice,
        formatPrice,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
