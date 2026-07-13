import type { JSX } from "react";
import clsx from "clsx";

type KeyboardProps = {
  alphabetArr: string[];
  guessedLetters: string[];
  currentWordArr: string[];
  isGameWon: boolean;
  isGameLost: boolean;
  addGuessedLetter: (letter: string) => void;
}

const Keyboard = ({ 
    alphabetArr,
    guessedLetters, 
    currentWordArr, 
    isGameWon, 
    isGameLost, 
    addGuessedLetter 
  }: KeyboardProps): JSX.Element => {

  const keyboardElements: JSX.Element[] = alphabetArr.map((letter: string): JSX.Element => {
    
    const isGuessed: boolean = guessedLetters.includes(letter);
    const isCorrect: boolean = currentWordArr.includes(letter);
    
    const keyboardClass: string = clsx({
      alphabet: true,
      correct: isGuessed && isCorrect,
      incorrect: isGuessed && !isCorrect
    })
    
    return (
      <button
        disabled={isGuessed || isGameWon || isGameLost} 
        aria-disabled={isGuessed || isGameWon || isGameLost}
        aria-label={`Letter ${letter}`}
        key={letter} 
        className={keyboardClass}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
    
  });
  return (
    <section className="keyboard">
      {keyboardElements}
    </section>
  )
}

export default Keyboard
