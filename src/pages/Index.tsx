import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BrainIcon, ChevronRightIcon, BadgeCheckIcon, LightbulbIcon, TrendingUpIcon } from 'lucide-react';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';
const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-quiz-light to-white">
      <Header />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={cn("text-center lg:text-left space-y-6 transition-all duration-700 delay-100", isLoaded ? "opacity-100" : "opacity-0 translate-y-8")}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-quiz-secondary text-quiz-accent text-sm font-medium">
                <LightbulbIcon className="h-4 w-4 mr-2" />
                <span>Discover your cognitive potential</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Unlock Your <span className="text-quiz-accent">IQ</span> Potential
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Take our scientifically designed assessment to discover your cognitive strengths and unlock personalized insights.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button asChild size="lg" className="px-8 py-6 text-lg rounded-full bg-quiz-accent hover:bg-quiz-accent/90 hover-lift">
                  <Link to="/quiz">
                    Start Free Assessment
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg rounded-full hover-lift">
                  <Link to="/premium">
                    View Premium Features
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className={cn("relative transition-all duration-700 delay-300", isLoaded ? "opacity-100" : "opacity-0 translate-y-8")}>
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden aspect-square max-w-md mx-auto">
                <img alt="Brain visualization" src="/lovable-uploads/2f7f3338-2a68-4143-b548-ece90873d12c.jpg" className="w-full h-full object-fill" />
                
              </div>
              
              <div className="absolute top-1/4 -left-16 w-32 h-32 bg-quiz-accent/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/3 -right-16 w-48 h-48 bg-quiz-secondary/40 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={cn("text-center mb-12 transition-all duration-700 delay-500", isLoaded ? "opacity-100" : "opacity-0")}>
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Our assessment provides accurate insights into your cognitive abilities through our three-step process
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[{
            icon: <BrainIcon className="h-10 w-10 text-quiz-accent" />,
            title: "Take the Assessment",
            description: "Complete our carefully designed questions that measure various aspects of intelligence."
          }, {
            icon: <TrendingUpIcon className="h-10 w-10 text-quiz-accent" />,
            title: "Get Your Score",
            description: "Receive your IQ score along with a breakdown of where you stand compared to others."
          }, {
            icon: <LightbulbIcon className="h-10 w-10 text-quiz-accent" />,
            title: "Unlock Insights",
            description: "Discover detailed analysis of your cognitive strengths and areas for development."
          }].map((feature, index) => <div key={index} className={cn("bg-white p-8 rounded-xl shadow-sm border border-quiz-secondary/50 transition-all duration-700 hover-lift", isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12", {
            "delay-700": index === 0,
            "delay-800": index === 1,
            "delay-900": index === 2
          })}>
                <div className="h-14 w-14 rounded-lg bg-quiz-secondary/50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>)}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className={cn("bg-gradient-to-r from-quiz-accent/10 to-quiz-secondary/30 rounded-2xl p-8 md:p-12 transition-all duration-700 delay-1000", isLoaded ? "opacity-100" : "opacity-0")}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to discover your IQ?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our comprehensive assessment takes just 15 minutes to complete and provides valuable insights into your cognitive abilities.
                </p>
                <Button asChild size="lg" className="bg-quiz-accent hover:bg-quiz-accent/90 hover-lift">
                  <Link to="/quiz">
                    Start Free Assessment
                    <ChevronRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {["Scientifically validated questions", "Instant results and basic insights", "Compare with global percentiles", "Premium analysis available"].map((item, index) => <div key={index} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <BadgeCheckIcon className="h-4 w-4 text-quiz-accent" />
                    </div>
                    <span>{item}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BrainIcon className="h-6 w-6 text-quiz-accent" />
              <span className="font-medium text-xl">IQ Insight</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} IQ Insight. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;