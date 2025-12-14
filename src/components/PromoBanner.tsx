import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="py-6 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-6 md:p-8">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-foreground">
                  Holiday Sale — Up to 40% Off!
                </h3>
                <p className="text-primary-foreground/80 text-sm md:text-base mt-1">
                  Limited time offer on selected gadgets. Don't miss out!
                </p>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              size="lg"
              className="group whitespace-nowrap shadow-lg hover:shadow-xl transition-all"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
