
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCurrentSeason, getMoonPhase } from '@/lib/astrologyUtils';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const moonPhase = getMoonPhase();
  const currentSeason = getCurrentSeason();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Sky View", path: "/" },
    { name: "Horoscope", path: "/horoscope" },
    { name: "Profile", path: "/profile" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-night-light/80 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-serif tracking-wider flex items-center gap-2">
            <span className="text-2xl">{moonPhase.icon}</span>
            <span className="font-medium bg-gradient-to-r from-star-bright to-celestial-blue bg-clip-text text-transparent">
              Celestial Skyview
            </span>
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
            
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-night-light/95 backdrop-blur-md py-4 animate-fade-in">
                <div className="container mx-auto px-4">
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={cn(
                          "py-2 px-4 rounded-md transition-colors duration-200",
                          isActive(link.path) 
                            ? "bg-primary/20 text-primary" 
                            : "hover:bg-night-light/50"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-6 py-3 px-4 rounded-md bg-night-deep/50">
                    <div className="text-sm text-muted-foreground">Current Season</div>
                    <div className="text-star-bright">{currentSeason}</div>
                    <div className="mt-2 text-sm text-muted-foreground">Moon Phase</div>
                    <div className="text-star-bright">{moonPhase.phase} {moonPhase.icon}</div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "py-1 px-3 rounded-md transition-all duration-200",
                    isActive(link.path) 
                      ? "bg-primary/10 text-primary border-b-2 border-primary" 
                      : "hover:bg-night-light/30 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="hidden md:flex items-center gap-2 text-sm bg-night-light/40 rounded-full py-1 px-3">
              <span className="text-muted-foreground">{currentSeason}</span>
              <span className="mx-1 text-constellation">•</span>
              <span className="flex items-center gap-1">
                <span className="text-muted-foreground">{moonPhase.phase}</span>
                <span>{moonPhase.icon}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
