// components

import Header from "./components/Header"
import TimerGuessesCount from "./components/TimerGuessesCount";
import Levels from "./components/Levels";
import ConfettiContainer from "./components/ConfettiContainer"
import GameStatus from "./components/GameStatus"
import LanguageChips from "./components/LanguageChips"
import WordLetters from "./components/WordLetters"
import ArialLiveStatus from "./components/ArialLiveStatus"
import Keyboard from "./components/Keyboard"
import NewGameButton from "./components/NewGameButton";

import { useState, useEffect, useRef } from "react"
import { languages } from "./languages"

// utils
import { getFarewellText, getRandomWord } from "./utils";
import { levels } from "./levels";

// types
import type { Level } from "./levels";

export default function App() {
  // State values
  const [currentWord, setCurrentWord] = useState<string>((): string => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [farewellMessage, setFarewellMessage] = useState<string>("");

  const [selectedLevel, setSelectedLevel] = useState<Level>(levels[0]);

  const [timer, setTimer] = useState<number>(selectedLevel ? selectedLevel.timer : levels[0].timer);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);


  // Derived values
  const numGuessesLeft: number = languages.length - 1
  const wrongGuessCount: number = guessedLetters.filter((letter: string): boolean => !currentWord.split("").includes(letter)).length;
  const isGameLost: boolean = wrongGuessCount >= languages.length - 1 || timer === 0;
  const isGameWon: boolean = currentWord.split("").every(letter => guessedLetters.includes(letter));

  const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1];

  // Static values
  const alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");
  const currentWordArr = currentWord.split("");


  // useEffects
  useEffect(() => {
    if (timerActive && !isGameWon && !isGameLost) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000)
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive, isGameWon, isGameLost]);

  useEffect(() => {
    if (timer === 0) {
      setTimerActive(false);
    }
  }, [timer]);



  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guessedLetters, isGameWon, isGameLost]);

  
  // functions

  function startNewGame(): void {
    setGuessedLetters([])
    setCurrentWord(getRandomWord());
    setFarewellMessage("");
    setTimer(selectedLevel ? selectedLevel.timer : 120);
    setTimerActive(false);
  }

  function selectLevel(level: Level): void {
    setSelectedLevel(level);
    setTimer(level.timer);
    setGuessedLetters([])
    setCurrentWord(getRandomWord());
    setFarewellMessage("");
    setTimerActive(false);
  }
  
  function addGuessedLetter(letter: string): void {
    if (guessedLetters.includes(letter)) return;
    
    const updatedLetters: string[] = [...guessedLetters, letter];
    const isWrong: boolean = !currentWord.split("").includes(letter);
    const updatedWrongCount: number = updatedLetters.filter((l: string): boolean => !currentWord.split("").includes(l)).length;

    if (isWrong && updatedWrongCount < languages.length - 1) {
      setFarewellMessage(getFarewellText(languages[updatedWrongCount - 1].name));
    } else {
      setFarewellMessage("");
    }

    setGuessedLetters(updatedLetters);
    setTimerActive(true);
  }

  function handleKeyDown(event: KeyboardEvent): void {
    const pressedKey = event.key.toLowerCase();
    if (alphabetArr.includes(pressedKey)) {
      addGuessedLetter(pressedKey);
    }
  }


  
  return (
    <>
      <ConfettiContainer isGameWon={isGameWon} />
      <Header />

      <main>
        <Levels 
          levels= {levels} 
          selectedLevel= {selectedLevel} 
          selectLevel= {selectLevel}
        />

        <TimerGuessesCount 
          currentWord = {currentWord}
          guessedLetters = {guessedLetters}
          languages = {languages}
          timer = {timer}
          isGameWon = {isGameWon}
          isGameLost = {isGameLost}
        />

        <GameStatus 
          isGameWon={isGameWon} 
          isGameLost={isGameLost} 
          farewellMessage={farewellMessage} 
        />

        <LanguageChips 
          languages={languages}
          wrongGuessCount={wrongGuessCount}
        />

        <WordLetters 
          currentWordArr={currentWordArr}
          guessedLetters={guessedLetters}
          isGameWon={isGameWon}
          isGameLost={isGameLost}
        />

        <ArialLiveStatus 
          currentWord={currentWord}
          lastGuessedLetter={lastGuessedLetter}
          guessedLetters={guessedLetters}
          numGuessesLeft={numGuessesLeft}
        />

        <Keyboard 
          alphabetArr={alphabetArr}
          guessedLetters={guessedLetters}
          currentWordArr={currentWordArr}
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          addGuessedLetter={addGuessedLetter}
        />

        <NewGameButton 
          startNewGame={startNewGame} 
          isGameWon={isGameWon} 
          isGameLost={isGameLost}
        />

      </main>

    </>
  )
}
