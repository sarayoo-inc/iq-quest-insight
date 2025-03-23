
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between mb-2 text-sm text-quiz-muted">
        <span>Question {currentStep} of {totalSteps}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 w-full bg-quiz-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-quiz-accent rounded-full transition-all duration-500 ease-out-expo"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
