import { useState, useEffect } from 'react';

const GameBoard = ({ words, onAllMatchesDone }) => {
  const [selectedOriginal, setSelectedOriginal] = useState(null);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [shuffledTranslations, setShuffledTranslations] = useState([]);

  // 1. Initialize and shuffle translations ONLY when words changes.
  // This effect's only job is to create the shuffled list.
  useEffect(() => {
    if (words.length > 0) {
      // Create shuffled translations array
      const translations = [...words].sort(() => Math.random() - 0.5);
      // Set the shuffled translations
      setShuffledTranslations(translations);
    }
  }, [words]); // Runs only when the reference to the 'words' prop changes.

  // 2. Reset the game state whenever a new set of words is loaded (i.e., when 'words' changes).
  // This ensures that when a new game starts, the selections and matches are cleared.
  // This is now separated from the shuffling to keep the concerns clean.
  useEffect(() => {
    setMatchedPairs([]);
    setSelectedOriginal(null);
    setSelectedTranslation(null);
  }, [words]); // Runs only when the reference to the 'words' prop changes.

  // --- CLICK HANDLERS (No change) ---

  const handleOriginalClick = (wordId) => {
    if (matchedPairs.includes(wordId)) return;
    setSelectedOriginal(wordId);
  };

  const handleTranslationClick = (index) => {
    const translationWord = shuffledTranslations[index];
    if (matchedPairs.includes(translationWord.id)) return;
    setSelectedTranslation(index);
  };

  // --- MATCH CHECKING LOGIC (No change) ---
  // This useEffect depends on selectedOriginal and selectedTranslation, 
  // and the setMatchedPairs state update here is the one causing the re-render.
  // Because 'words' is not changing here, the two effects above should NOT fire.
  useEffect(() => {
    if (selectedOriginal !== null && selectedTranslation !== null) {
      const originalWord = words.find(w => w.id === selectedOriginal);
      const translationWord = shuffledTranslations[selectedTranslation];

      // Check if this is a correct match
      if (originalWord && translationWord && originalWord.id === translationWord.id) {
        if (!matchedPairs.includes(originalWord.id)) {
          // Correct match - add to matched pairs
          const newMatchedPairs = [...matchedPairs, originalWord.id];
          setMatchedPairs(newMatchedPairs);

          // ONLY call onAllMatchesDone when ALL words are matched
          if (newMatchedPairs.length === words.length) {
            setTimeout(() => {
              onAllMatchesDone();
            }, 1000);
          }
        }
      }

      // Reset selection after delay
      setTimeout(() => {
        setSelectedOriginal(null);
        setSelectedTranslation(null);
      }, 500);
    }
  }, [selectedOriginal, selectedTranslation, words, shuffledTranslations, onAllMatchesDone]);

  if (shuffledTranslations.length === 0) {
    return <div className="text-center p-8">Loading words...</div>;
  }

  return (
    <div className='game-board h-full flex flex-col justify-center'>
      
      <div className="text-white flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold mb-8 md:text-3xl lg:text-4xl">Hehee (Michael jackson laugh)</h1>
      </div>


      <div className="flex justify-between gap-8">
        {/* Original words side - in original order */}
        <div className="flex-1">
          <h3 className="text-center text-xl mb-4 text-white">Original Words</h3>
          <div className="flex flex-col justify-center items-center
          ">
            {words.map((word) => (
              <button
                key={word.id}
                onClick={() => handleOriginalClick(word.id)}
                className={` transition-all ${matchedPairs.includes(word.id)
                    ? 'bg-green-500 text-white border-green-600 cursor-default'
                    : selectedOriginal === word.id
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                disabled={matchedPairs.includes(word.id)}
              >
                {word.word}
              </button>
            ))}
          </div>
        </div>

        {/* Translation words side - shuffled */}
        <div className="flex-1">
          <h3 className="text-center text-xl mb-4 text-white">Arabic</h3>
          <div className="flex flex-col justify-center items-center">
            {shuffledTranslations.map((word, index) => (
              <button
                key={`${word.id}-${index}`}
                onClick={() => handleTranslationClick(index)}
                className={`transition-all ${matchedPairs.includes(word.id)
                    ? 'bg-green-500 text-white border-green-600 cursor-default'
                    : selectedTranslation === index
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white border-gray-300 hover:bg-gray-100'
                  }`}
                disabled={matchedPairs.includes(word.id)}
              >
                {word.translation}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;