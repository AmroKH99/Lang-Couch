import React, { useState } from "react";
import DarkVeil from "./components/DarkVeil";
import LangSelect from "./components/LangSelect";
import LevelSelect from "./components/LevelSelect";
import Game from "./components/Game";
import Footer from "./components/Footer";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("header");
  const [userSelections, setUserSelections] = useState({
    language: '',
    difficulty: ''
  });

  const handleLanguageSelect = (language) => {
    setUserSelections(prev => ({ ...prev, language: language }));
    setCurrentScreen('level');
  };

  const handleDifficultySelect = (difficulty) => {
    setUserSelections(prev => ({ ...prev, difficulty: difficulty }));
    setCurrentScreen('game');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-transparent">
      {/* --- DarkVeil Background --- */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* --- Foreground Application Content --- */}
      <div className="flex flex-col justify-center items-center w-full h-full relative z-10 text-black">
        {currentScreen === "header" && (
          <LangSelect onLanguageSelect={handleLanguageSelect} />
        )}
        {currentScreen === "level" && (
          <LevelSelect onDifficultySelect={handleDifficultySelect}
          selectedLanguage={userSelections.language} />
        )}
        {currentScreen === "game" && <Game  userSelections={userSelections}/>}
        <Footer />
      </div>
    </div>
  );
};

export default App;
