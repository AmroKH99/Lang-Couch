import { useState, useEffect } from 'react';
import { getRandomWords } from '../words/index';
import GameBoard from './GameBoard';

const Game = ({ userSelections }) => {
  const [currentWords, setCurrentWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNewWordSet();
  }, [userSelections]);

  const loadNewWordSet = () => {
    setIsLoading(true);
    const words = getRandomWords(
      userSelections.language, 
      userSelections.difficulty, 
      5
    );
    setCurrentWords(words);
    setIsLoading(false);
  };

  const handleAllMatchesDone = () => {
      loadNewWordSet(); 
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading words...</div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col">
      <GameBoard 
        words={currentWords}
        onAllMatchesDone={handleAllMatchesDone}
      />
    </div>
  );
};

export default Game;