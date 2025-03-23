
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon, BrainIcon, TrendingUpIcon, LockIcon } from 'lucide-react';

export interface IQLevel {
  name: string;
  range: string;
  description: string;
  percentage: string;
}

interface ResultCardProps {
  score: number;
  maxScore: number;
  level: IQLevel;
  insights: string[];
  isPremium: boolean;
  onUpgrade: () => void;
}

const ResultCard = ({ 
  score, 
  maxScore, 
  level, 
  insights,
  isPremium, 
  onUpgrade 
}: ResultCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const percentageScore = Math.round((score / maxScore) * 100);
  
  return (
    <Card className="w-full max-w-2xl transition-all duration-300 animate-scale-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-3 flex items-center justify-center h-16 w-16 rounded-full bg-quiz-secondary">
          <BrainIcon className="h-8 w-8 text-quiz-accent" />
        </div>
        <CardTitle className="text-2xl mb-1">Your IQ Score: {score}</CardTitle>
        <CardDescription>
          {level.name} - {level.range}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-4 bg-quiz-neutral rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Score Percentile</span>
            <span className="text-sm font-medium">{level.percentage}</span>
          </div>
          <div className="w-full h-2 bg-white rounded-full">
            <div 
              className="h-full bg-quiz-accent rounded-full"
              style={{ width: `${percentageScore}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium flex items-center">
              <TrendingUpIcon className="h-4 w-4 mr-2 text-quiz-accent" />
              Key Insights
            </h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="h-8 px-2"
            >
              {showDetails ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className={cn(
            "grid transition-all duration-300",
            showDetails ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}>
            <div className="overflow-hidden">
              <p className="text-muted-foreground mb-3">
                {level.description}
              </p>
              
              <ul className="space-y-2">
                {insights.slice(0, isPremium ? insights.length : 1).map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-quiz-secondary flex items-center justify-center">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <span>{insight}</span>
                  </li>
                ))}
                
                {!isPremium && (
                  <li className="flex items-start gap-2 opacity-60">
                    <div className="h-5 w-5 mt-0.5 flex-shrink-0 rounded-full bg-quiz-secondary flex items-center justify-center">
                      <LockIcon className="h-3 w-3" />
                    </div>
                    <span className="italic">More insights available with Premium</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3">
        {!isPremium && (
          <Button 
            className="w-full bg-quiz-accent hover:bg-quiz-accent/90"
            onClick={onUpgrade}
          >
            Unlock Full IQ Analysis
          </Button>
        )}
        <Button variant="outline" asChild className="w-full">
          <a href="/quiz">Take Another Quiz</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
