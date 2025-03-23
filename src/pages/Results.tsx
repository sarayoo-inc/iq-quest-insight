
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ResultCard from '@/components/ResultCard';
import PaymentModal from '@/components/PaymentModal';
import { calculateScore } from '@/utils/scoreCalculator';
import { toast } from 'sonner';

const Results = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [quizResult, setQuizResult] = useState<ReturnType<typeof calculateScore> | null>(null);
  
  useEffect(() => {
    // Get user answers from session storage
    const storedAnswers = sessionStorage.getItem('quizAnswers');
    
    if (!storedAnswers) {
      // No answers found, redirect back to quiz
      toast.error('No quiz data found. Please take the quiz first.');
      navigate('/quiz');
      return;
    }
    
    // Simulate loading
    setTimeout(() => {
      const userAnswers = JSON.parse(storedAnswers);
      const result = calculateScore(userAnswers, isPremium);
      setQuizResult(result);
      setScore(result.score);
      setIsLoading(false);
    }, 1500);
    
    // Check if user has premium access
    const hasPremium = localStorage.getItem('isPremium') === 'true';
    setIsPremium(hasPremium);
  }, [navigate, isPremium]);
  
  const handleUpgrade = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentSuccess = () => {
    // Store premium status in localStorage
    localStorage.setItem('isPremium', 'true');
    setIsPremium(true);
    setShowPaymentModal(false);
    
    // Recalculate score with premium insights
    if (quizResult) {
      const userAnswers = JSON.parse(sessionStorage.getItem('quizAnswers') || '{}');
      const result = calculateScore(userAnswers, true);
      setQuizResult(result);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-quiz-light">
      <Header />
      
      <main className="flex-1 pt-24 px-4 flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <div className="h-16 w-16 border-4 border-quiz-accent/30 border-t-quiz-accent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-medium mb-2">Analyzing your responses...</h2>
            <p className="text-muted-foreground">Calculating your IQ score and insights</p>
          </div>
        ) : (
          quizResult && (
            <ResultCard 
              score={quizResult.score}
              maxScore={quizResult.totalQuestions}
              level={quizResult.level}
              insights={quizResult.insights}
              isPremium={isPremium}
              onUpgrade={handleUpgrade}
            />
          )
        )}
      </main>
      
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Results;
