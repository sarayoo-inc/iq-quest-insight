
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LightbulbIcon, BrainIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300",
        isScrolled ? "glass-morphism" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-all hover:opacity-80"
        >
          <BrainIcon className="h-6 w-6 text-quiz-accent" />
          <span className="font-medium text-xl">IQ Insight</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" current={location.pathname}>Home</NavLink>
          <NavLink to="/quiz" current={location.pathname}>Take Quiz</NavLink>
          <NavLink to="/premium" current={location.pathname}>Premium</NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          {location.pathname !== '/quiz' && (
            <Button 
              asChild
              className="bg-quiz-accent hover:bg-quiz-accent/90 text-white px-6 py-2 rounded-full transition-all"
            >
              <Link to="/quiz">
                <LightbulbIcon className="h-4 w-4 mr-2" />
                <span>Start Quiz</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, current, children }: { to: string; current: string; children: React.ReactNode }) => {
  const isActive = current === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "relative py-2 transition-all",
        isActive 
          ? "text-quiz-accent font-medium" 
          : "text-foreground/80 hover:text-foreground"
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-quiz-accent transform transition-transform duration-300",
          isActive ? "scale-x-100" : "scale-x-0"
        )} 
      />
    </Link>
  );
};

export default Header;
