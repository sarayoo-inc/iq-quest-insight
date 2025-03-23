
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainIcon, CheckIcon, StarIcon, LockIcon, UnlockIcon, ScanSearchIcon } from 'lucide-react';
import Header from '@/components/Header';
import PaymentModal from '@/components/PaymentModal';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Premium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Check if user has premium access
    const hasPremium = localStorage.getItem('isPremium') === 'true';
    setIsPremium(hasPremium);
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentSuccess = () => {
    // Store premium status in localStorage
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
    setShowPaymentModal(false);
    toast.success('Premium access granted!');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-quiz-light">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className={cn(
              "transition-all duration-700 delay-100",
              isLoaded ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-quiz-secondary text-quiz-accent text-sm font-medium mb-4">
                <StarIcon className="h-4 w-4 mr-2" />
                <span>Premium Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Unlock Deep Cognitive Insights
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Go beyond your basic IQ score and discover detailed analysis of your unique cognitive profile.
              </p>
              
              {!isPremium && (
                <Button 
                  onClick={handleUpgrade}
                  size="lg" 
                  className="px-8 bg-quiz-accent hover:bg-quiz-accent/90 hover-lift"
                >
                  Upgrade to Premium
                </Button>
              )}
              
              {isPremium && (
                <div className="inline-flex items-center px-6 py-3 rounded-lg bg-green-100 text-green-800">
                  <CheckIcon className="h-5 w-5 mr-2" />
                  <span className="font-medium">You have premium access</span>
                </div>
              )}
            </div>
          </section>
          
          {/* Features Comparison */}
          <section className="mb-16">
            <div className={cn(
              "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-300",
              isLoaded ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <Card className="border-quiz-secondary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainIcon className="h-5 w-5" />
                    Free Assessment
                  </CardTitle>
                  <CardDescription>Basic IQ testing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold">$0</div>
                  <ul className="space-y-2">
                    {[
                      "Complete IQ assessment",
                      "Basic IQ score",
                      "General cognitive level",
                      "1-2 cognitive insights",
                      "Global percentile ranking"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/quiz">Take Free Assessment</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-quiz-accent bg-gradient-to-b from-white to-quiz-secondary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-quiz-accent text-white px-3 py-1 text-xs font-medium">
                  RECOMMENDED
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StarIcon className="h-5 w-5 text-quiz-accent" />
                    Premium Analysis
                  </CardTitle>
                  <CardDescription>Comprehensive insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold">$9.99</div>
                  <ul className="space-y-2">
                    {[
                      "Everything in Free Assessment",
                      "Detailed cognitive profile",
                      "Strengths & improvement areas",
                      "8-10 personalized insights",
                      "Cognitive comparison charts",
                      "Personalized recommendations"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckIcon className="h-5 w-5 text-quiz-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {!isPremium ? (
                    <Button onClick={handleUpgrade} className="w-full bg-quiz-accent hover:bg-quiz-accent/90">
                      Upgrade Now
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-green-500 hover:bg-green-500 cursor-default">
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Already Upgraded
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </section>
          
          {/* Feature Details */}
          <section className="mb-16">
            <div className={cn(
              "text-center mb-12 transition-all duration-700 delay-500",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              <h2 className="text-3xl font-bold">What's Included in Premium</h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                Our premium analysis provides deep insights into your cognitive abilities
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ScanSearchIcon className="h-10 w-10 text-quiz-accent" />,
                  title: "Detailed Cognitive Profile",
                  description: "Understand your specific strengths in logical, spatial, verbal, and mathematical reasoning."
                },
                {
                  icon: <UnlockIcon className="h-10 w-10 text-quiz-accent" />,
                  title: "Personalized Insights",
                  description: "Receive up to 10 highly specific observations about your unique cognitive patterns."
                },
                {
                  icon: <BrainIcon className="h-10 w-10 text-quiz-accent" />,
                  title: "Development Recommendations",
                  description: "Get actionable suggestions to enhance your cognitive abilities in key areas."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white p-8 rounded-xl shadow-sm border transition-all duration-700 hover-lift",
                    isPremium ? "border-quiz-accent/30" : "border-quiz-secondary/50",
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                    { "delay-700": index === 0, "delay-800": index === 1, "delay-900": index === 2 }
                  )}
                >
                  <div className="h-14 w-14 rounded-lg bg-quiz-secondary/50 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  
                  {!isPremium && (
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <LockIcon className="h-3 w-3 mr-1" />
                      <span>Premium feature</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          
          {/* CTA Section */}
          <section>
            <div className={cn(
              "bg-gradient-to-r from-quiz-accent/10 to-quiz-secondary/30 rounded-2xl p-8 md:p-12 text-center transition-all duration-700 delay-1000",
              isLoaded ? "opacity-100" : "opacity-0"
            )}>
              <h2 className="text-3xl font-bold mb-4">Ready to unlock your full potential?</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Upgrade to premium today and discover insights that can help you leverage your cognitive strengths.
              </p>
              
              {!isPremium ? (
                <Button 
                  onClick={handleUpgrade}
                  size="lg" 
                  className="px-8 bg-quiz-accent hover:bg-quiz-accent/90 hover-lift"
                >
                  Get Premium Access
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="inline-flex items-center px-6 py-3 rounded-lg bg-green-100 text-green-800">
                    <CheckIcon className="h-5 w-5 mr-2" />
                    <span className="font-medium">You have premium access</span>
                  </div>
                  <div className="block">
                    <Button asChild variant="outline" className="hover-lift">
                      <Link to="/quiz">Take Another Quiz</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
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
      
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Premium;
