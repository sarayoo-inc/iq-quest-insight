
import { Question } from '@/components/QuizQuestion';

export const questions: Question[] = [
  {
    id: '1',
    title: 'Which number comes next in the sequence?',
    description: '2, 4, 8, 16, ...',
    type: 'multiple-choice',
    options: [
      { id: '1a', text: '18' },
      { id: '1b', text: '24' },
      { id: '1c', text: '32' },
      { id: '1d', text: '64' },
    ],
    timeLimit: 30,
  },
  {
    id: '2',
    title: 'Find the odd one out:',
    type: 'multiple-choice',
    options: [
      { id: '2a', text: 'Piano' },
      { id: '2b', text: 'Guitar' },
      { id: '2c', text: 'Drum' },
      { id: '2d', text: 'Flute' },
      { id: '2e', text: 'Trumpet' },
    ],
    timeLimit: 20,
  },
  {
    id: '3',
    title: 'Complete the pattern',
    description: 'What shape should replace the question mark?',
    type: 'pattern',
    image: 'https://static.vecteezy.com/system/resources/previews/009/344/796/original/iq-test-icons-set-intelligence-quotient-concept-logical-thinking-puzzle-game-line-with-editable-stroke-vector.jpg',
    options: [
      { id: '3a', text: 'Circle' },
      { id: '3b', text: 'Triangle' },
      { id: '3c', text: 'Square' },
      { id: '3d', text: 'Rectangle' },
    ],
    timeLimit: 45,
  },
  {
    id: '4',
    title: 'If a clock shows 3:45, what is the angle between the hour and minute hands?',
    type: 'multiple-choice',
    options: [
      { id: '4a', text: '112.5 degrees' },
      { id: '4b', text: '157.5 degrees' },
      { id: '4c', text: '177.5 degrees' },
      { id: '4d', text: '97.5 degrees' },
    ],
    timeLimit: 60,
  },
  {
    id: '5',
    title: 'Which of these is not a primary color?',
    type: 'multiple-choice',
    options: [
      { id: '5a', text: 'Red' },
      { id: '5b', text: 'Blue' },
      { id: '5c', text: 'Yellow' },
      { id: '5d', text: 'Green' },
    ],
    timeLimit: 15,
  },
  {
    id: '6',
    title: 'If ZEBRA is coded as 26522118, how would MONKEY be coded?',
    type: 'multiple-choice',
    options: [
      { id: '6a', text: '13152511525' },
      { id: '6b', text: '1392110525' },
      { id: '6c', text: '1315141125' },
      { id: '6d', text: '1315141521' },
    ],
    timeLimit: 60,
  },
  {
    id: '7',
    title: 'A train travels 360 km in 4 hours. What is its speed?',
    type: 'multiple-choice',
    options: [
      { id: '7a', text: '72 km/h' },
      { id: '7b', text: '80 km/h' },
      { id: '7c', text: '90 km/h' },
      { id: '7d', text: '120 km/h' },
    ],
    timeLimit: 30,
  },
  {
    id: '8',
    title: 'Which word is most different from the others?',
    type: 'multiple-choice',
    options: [
      { id: '8a', text: 'Apple' },
      { id: '8b', text: 'Plum' },
      { id: '8c', text: 'Potato' },
      { id: '8d', text: 'Orange' },
    ],
    timeLimit: 25,
  },
  {
    id: '9',
    title: 'Solve the equation: 3x + 12 = 24',
    type: 'multiple-choice',
    options: [
      { id: '9a', text: 'x = 4' },
      { id: '9b', text: 'x = 6' },
      { id: '9c', text: 'x = 8' },
      { id: '9d', text: 'x = 12' },
    ],
    timeLimit: 40,
  },
  {
    id: '10',
    title: 'Which figure completes the sequence?',
    type: 'logical',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4M9HWC8zMFujOtjeu7PEtpG5d7W8VbRXmUg&usqp=CAU',
    options: [
      { id: '10a', text: 'Figure A' },
      { id: '10b', text: 'Figure B' },
      { id: '10c', text: 'Figure C' },
      { id: '10d', text: 'Figure D' },
    ],
    timeLimit: 60,
  }
];

// The correct answers (for score calculation)
export const correctAnswers = {
  '1': '1c', // 32
  '2': '2c', // Drum (not a wind or string instrument)
  '3': '3b', // Triangle
  '4': '4a', // 112.5 degrees
  '5': '5d', // Green
  '6': '6c', // 1315141125
  '7': '7c', // 90 km/h
  '8': '8c', // Potato (not a fruit)
  '9': '9a', // x = 4
  '10': '10b' // Figure B
};

export interface IQLevel {
  name: string;
  range: string;
  description: string;
  percentage: string;
  minScore: number;
  maxScore: number;
}

export const iqLevels: IQLevel[] = [
  {
    name: 'Below Average',
    range: '70-89',
    description: 'This score indicates cognitive abilities that may benefit from further development. You may find certain types of problem-solving more challenging.',
    percentage: 'Bottom 15%',
    minScore: 0,
    maxScore: 3
  },
  {
    name: 'Average',
    range: '90-109',
    description: 'This score places you in the average range of cognitive abilities. You demonstrate balanced reasoning capabilities across most types of problems.',
    percentage: 'Middle 50%',
    minScore: 4,
    maxScore: 6
  },
  {
    name: 'Above Average',
    range: '110-119',
    description: 'This score indicates strong cognitive abilities. You excel at pattern recognition and logical reasoning compared to the general population.',
    percentage: 'Top 25%',
    minScore: 7,
    maxScore: 8
  },
  {
    name: 'Superior',
    range: '120-129',
    description: 'This score indicates exceptional cognitive abilities. You demonstrate superior problem-solving skills and can quickly recognize complex patterns.',
    percentage: 'Top 10%',
    minScore: 9,
    maxScore: 10
  }
];

export const getIQLevel = (score: number): IQLevel => {
  return iqLevels.find(level => 
    score >= level.minScore && score <= level.maxScore
  ) || iqLevels[0];
};

export const basicInsights = [
  "You have strong pattern recognition abilities",
  "Your logical reasoning skills are well-developed",
  "You process information at an above-average speed",
  "Your spatial reasoning abilities are noteworthy",
  "You show aptitude for mathematical concepts"
];

export const premiumInsights = [
  "You excel particularly at sequential pattern recognition",
  "Your verbal reasoning shows advanced conceptual understanding",
  "Your processing speed places you in the top percentile for your age group",
  "You demonstrate exceptional working memory capacity",
  "Your problem-solving approach shows creative lateral thinking",
  "You have an intuitive grasp of mathematical relationships",
  "Your spatial visualization abilities are particularly strong",
  "You show cognitive flexibility when approaching novel problems",
  "Your analytical reasoning is methodical and precise",
  "You demonstrate above-average attentional control"
];

export const getInsightsForLevel = (level: IQLevel, isPremium: boolean) => {
  // Basic insights available to all users
  let insights = basicInsights.slice(0, 3);
  
  // Premium users get more detailed insights based on their level
  if (isPremium) {
    const premiumCount = level.name === 'Superior' ? 5 : 
                         level.name === 'Above Average' ? 4 :
                         level.name === 'Average' ? 3 : 2;
    
    insights = [...insights, ...premiumInsights.slice(0, premiumCount)];
  }
  
  return insights;
};
