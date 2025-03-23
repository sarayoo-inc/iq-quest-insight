
import { correctAnswers, getIQLevel, getInsightsForLevel, IQLevel } from './quizData';

export interface QuizResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
  level: IQLevel;
  insights: string[];
}

export const calculateScore = (
  userAnswers: Record<string, string>,
  isPremium: boolean = false
): QuizResult => {
  const totalQuestions = Object.keys(correctAnswers).length;
  
  // Count correct answers
  const correctCount = Object.entries(userAnswers).reduce((count, [questionId, answerId]) => {
    if (correctAnswers[questionId] === answerId) {
      return count + 1;
    }
    return count;
  }, 0);
  
  // Calculate raw score (0-10)
  const score = correctCount;
  
  // Get IQ level based on score
  const level = getIQLevel(score);
  
  // Get insights based on level and premium status
  const insights = getInsightsForLevel(level, isPremium);
  
  return {
    score,
    correctCount,
    totalQuestions,
    level,
    insights
  };
};
