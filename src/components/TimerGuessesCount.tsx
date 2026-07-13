import type { JSX } from "react"
import type { Language } from "../languages"

type TimerGuessesCountProps = {
  currentWord: string;
  guessedLetters: string[];
  languages: Language[];
  timer: number;
  isGameWon: boolean;
  isGameLost: boolean;
}

export default function TimerGuessesCount({ 
    currentWord, 
    guessedLetters, 
    languages, 
    timer, 
    isGameWon, 
    isGameLost 
  }: TimerGuessesCountProps): JSX.Element {
  
  const wrongGuessCount: number = guessedLetters.filter(letter => !currentWord.split("").includes(letter)).length;
  const numGuessesLeft: number = (languages.length - 1) - wrongGuessCount;

  const guessClass: string = isGameWon ? "guess-count won" : isGameLost ? "guess-count failed" : "guess-count"
  const timerClass: string = isGameWon ? "timer-count won" : isGameLost ? "timer-count failed" : "timer-count"

  return (
    <section className="guess-timer-count">
      <p className={guessClass}>Remaining Guesses: <span className="guesses">{numGuessesLeft}</span></p>
      <p className={timerClass}>Time Remaining: <span className="time">{timer} seconds</span></p>
    </section>
  )
}