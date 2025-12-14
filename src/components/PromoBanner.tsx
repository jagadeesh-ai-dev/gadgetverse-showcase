import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Truck, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePromoBanners, PromoBanner as PromoBannerType } from "@/hooks/usePromoBanners";
import { Skeleton } from "@/components/ui/skeleton";

const themeStyles: Record<string, string> = {
  primary: "bg-gradient-to-r from-primary via-primary/90 to-primary/80",
  gradient: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500",
  accent: "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500",
  dark: "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600",
};

const themeIcons: Record<string, React.ReactNode> = {
  primary: <Sparkles className="h-6 w-6 text-primary-foreground" />,
  gradient: <Truck className="h-6 w-6 text-white" />,
  accent: <Package className="h-6 w-6 text-white" />,
  dark: <Users className="h-6 w-6 text-white" />,
};

const PromoBanner = () => {
  const { data: banners, isLoading } = usePromoBanners(true);
  const [currentBanner, setCurrentBanner] = useState<PromoBannerType | null>(null);

  useEffect(() => {
    if (banners && banners.length > 0) {
      // Pick a random banner
      const randomIndex = Math.floor(Math.random() * banners.length);
      setCurrentBanner(banners[randomIndex]);
    }
  }, [banners]);

  if (isLoading) {
    return (
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <Skeleton className="h-24 md:h-28 w-full rounded-2xl" />
        </div>
      </section>
    );
  }

  if (!currentBanner) {
    return null;
  }

  const bgClass = themeStyles[currentBanner.theme] || themeStyles.primary;
  const icon = themeIcons[currentBanner.theme] || themeIcons.primary;

  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <div className={`relative overflow-hidden rounded-2xl ${bgClass} p-6 md:p-8`}>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                {icon}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {currentBanner.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base mt-1">
                  {currentBanner.subtitle}
                </p>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              size="lg"
              className="group whitespace-nowrap shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                if (currentBanner.button_link) {
                  window.location.href = currentBanner.button_link;
                } else {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {currentBanner.button_text}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
