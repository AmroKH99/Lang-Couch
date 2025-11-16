import { useState, useEffect } from 'react';
import { getRandomWords } from '../words/index';
import GameBoard from './GameBoard';

const Game = ({ userSelections, onReset }) => {
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
    <div className="p-8 h-full flex flex-col items-center">
      <GameBoard 
        words={currentWords}
        onAllMatchesDone={handleAllMatchesDone}
      />
      <button onClick={() => onReset()} className='text-lg inline-flex justify-center w-32 m-2 py-2 border border-white rounded-full font-normal bg-black text-white
        md:text-4xl md:w-xs
        lg:text-3xl lg:w-xs lg:p-2 lg:font-normal
        cursor-pointer'>Reset</button>
    </div>
  );
};

export default Game;