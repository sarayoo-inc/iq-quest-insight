
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckIcon, XIcon } from 'lucide-react';

export interface QuestionOption {
  id: string;
  text: string;
  image?: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'multiple-choice' | 'pattern' | 'logical';
  options: QuestionOption[];
  image?: string;
  timeLimit?: number; // in seconds
}

interface QuizQuestionProps {
  question: Question;
  onAnswer: (optionId: string) => void;
  showFeedback?: boolean;
  className?: string;
}

const QuizQuestion = ({ 
  question, 
  onAnswer, 
  showFeedback = false,
  className 
}: QuizQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(question.timeLimit || null);
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    setIsAnimating(true);
    setSelectedOption(null);
    setTimeLeft(question.timeLimit || null);
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [question]);
  
  useEffect(() => {
    if (!timeLeft) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === 1) {
          clearInterval(timer);
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  const handleOptionSelect = (optionId: string) => {
    if (selectedOption) return;
    
    setSelectedOption(optionId);
    
    // Small delay to show selection before proceeding
    setTimeout(() => {
      onAnswer(optionId);
    }, 500);
  };
  
  return (
    <Card 
      className={cn(
        "p-6 max-w-3xl w-full transition-all",
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        className
      )}
    >
      {timeLeft !== null && (
        <div className="mb-4 flex justify-end">
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            timeLeft < 5 ? "bg-destructive/10 text-destructive animate-pulse" : "bg-secondary"
          )}>
            {timeLeft} seconds left
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">{question.title}</h3>
        {question.description && (
          <p className="text-muted-foreground">{question.description}</p>
        )}
      </div>
      
      {question.image && (
        <div className="mb-6 flex justify-center">
          <img 
            src={question.image} 
            alt={question.title} 
            className="max-h-60 object-contain rounded-lg"
          />
        </div>
      )}
      
      <div className="grid gap-3">
        {question.options.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className={cn(
              "justify-start h-auto p-4 text-left transition-all",
              selectedOption === option.id ? "ring-2 ring-quiz-accent" : "hover:bg-quiz-neutral",
              "group"
            )}
            onClick={() => handleOptionSelect(option.id)}
            disabled={!!selectedOption}
          >
            <div className="flex items-center w-full gap-3">
              {option.image && (
                <img 
                  src={option.image} 
                  alt={option.text} 
                  className="max-h-12 object-contain"
                />
              )}
              <span className="flex-1">{option.text}</span>
              {showFeedback && selectedOption === option.id && (
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600">
                  <CheckIcon className="h-4 w-4" />
                </span>
              )}
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuizQuestion;
