import en from './EnglishWords.js';
import es from './SpanishWords.js';
import gr from './GermanWords.js';

// Centralized word bank
const wordBank = {
  en, // english
  es, // spanish  
  gr, // german
};

// Utility functions
export const getWords = (language, difficulty) => {
  return wordBank[language]?.[difficulty] || [];
};

export const getRandomWords = (language, difficulty, count = 5) => {
  const words = getWords(language, difficulty);
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getAllWordsCount = (language, difficulty) => {
  return getWords(language, difficulty).length;
};

export default wordBank;