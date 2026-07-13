import type {JSX} from "react";
import clsx from "clsx";

type WordLettersProps = {
  currentWordArr: string[];
  guessedLetters: string[];
  isGameWon: boolean;
  isGameLost: boolean;
}

const WordLetters = ({ 
    currentWordArr, 
    guessedLetters, 
    isGameWon, 
    isGameLost 
  }: WordLettersProps): JSX.Element => {

  const currentWordElements: JSX.Element[] = currentWordArr.map((letter: string, index: number): JSX.Element => {
    const shouldRevealLetter: boolean = isGameLost || guessedLetters.includes(letter);
    const letterClassName: string = clsx(
      "letter",
      isGameWon && "correct-letter",
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    )

  });

  return (
    <section className="word">
      {currentWordElements}
    </section>
  )
}

export default WordLetters
