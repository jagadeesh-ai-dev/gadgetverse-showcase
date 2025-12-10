import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="footer" className="bg-secondary mt-10 sm:mt-20">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              GadgetVerse
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your trusted source for honest tech reviews and product recommendations. 
              Helping you make informed decisions about your next gadget purchase.
            </p>
          </div>
          
          <div className="text-center sm:text-left">
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div className="text-center sm:text-left sm:col-span-2 md:col-span-1">
            <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base">Connect With Us</h4>
            <div className="flex gap-3 mb-4 justify-center sm:justify-start">
              <Button size="icon" variant="outline" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="h-9 w-9 sm:h-10 sm:w-10">
                <a href="mailto:contact@gadgetverse.com" aria-label="Email">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </Button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong>Contact:</strong> contact@gadgetverse.com
            </p>
          </div>
        </div>
        
        <div className="border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GadgetVerse. Built with ❤️ by Your Name</p>
          <p className="mt-2">
            As an affiliate, we may earn commission from qualifying purchases. 
            This doesn't affect the price you pay.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
