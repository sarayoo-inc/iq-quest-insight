
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import QuizQuestion from '@/components/QuizQuestion';
import { questions, correctAnswers } from '@/utils/quizData';

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1); // -1 for intro screen
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  const currentQuestion = currentQuestionIndex >= 0 ? questions[currentQuestionIndex] : null;
  const isIntroScreen = currentQuestionIndex === -1;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  useEffect(() => {
    // Reset quiz state when component mounts
    setCurrentQuestionIndex(-1);
    setUserAnswers({});
  }, []);
  
  useEffect(() => {
    if (currentQuestion?.timeLimit && currentQuestionIndex >= 0) {
      setTimeRemaining(currentQuestion.timeLimit);
      
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === 1) {
            clearInterval(timer);
            // Auto-move to next question on timeout
            handleNextQuestion();
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, currentQuestion]);
  
  const handleStartQuiz = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentQuestionIndex(0);
      setIsTransitioning(false);
    }, 300);
  };
  
  const handleAnswer = (optionId: string) => {
    if (!currentQuestion) return;
    
    // Save the user's answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
    
    // Move to the next question after a small delay
    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };
  
  const handleNextQuestion = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (isLastQuestion) {
        // Store answers in sessionStorage to retrieve on results page
        sessionStorage.setItem('quizAnswers', JSON.stringify(userAnswers));
        navigate('/results');
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-quiz-light">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 px-4 flex flex-col items-center justify-center">
        {isIntroScreen ? (
          <Card className={`max-w-3xl w-full transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">IQ Assessment</CardTitle>
              <CardDescription>
                This assessment contains {questions.length} questions that measure different aspects of cognitive ability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-quiz-secondary/30 p-4 rounded-lg space-y-2">
                <h3 className="font-medium">Instructions:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Each question has a time limit - work quickly but carefully</li>
                  <li>• You cannot return to previous questions</li>
                  <li>• Some questions include images or patterns</li>
                  <li>• Answer all questions to the best of your ability</li>
                </ul>
              </div>
              <p className="text-center text-muted-foreground">
                The assessment takes approximately 15 minutes to complete
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={handleStartQuiz}
                className="px-8 bg-quiz-accent hover:bg-quiz-accent/90 hover-lift"
              >
                Begin Assessment
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <>
            <div className="w-full max-w-3xl mb-8">
              <ProgressBar 
                currentStep={currentQuestionIndex + 1} 
                totalSteps={questions.length}
              />
            </div>
            
            {currentQuestion && (
              <QuizQuestion 
                question={currentQuestion}
                onAnswer={handleAnswer}
                className={isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Quiz;
