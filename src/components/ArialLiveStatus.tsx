import type { JSX } from "react"

type ArialLiveStatusProps = {
  currentWord: string;
  lastGuessedLetter: string;
  guessedLetters: string[];
  numGuessesLeft: number;
}

const ArialLiveStatus = ({ 
    currentWord, 
    lastGuessedLetter, 
    guessedLetters, 
    numGuessesLeft 
  }: ArialLiveStatusProps): JSX.Element => {
  return (
    <>
      {/* Combined visually-hidden aria-live region for status updates */}
      <section 
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        <p>
          {currentWord.includes(lastGuessedLetter) ? 
            `Correct! The letter ${lastGuessedLetter} is in the word.` :
            `Wrong! The letter ${lastGuessedLetter} is not in the word.`
          }
          You have ${numGuessesLeft} attempts left.
        </p>
        <p>
          Current word: {currentWord.split("").map((letter: string) =>
          guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}
        </p>
      </section>   
    </>

  )
}

export default ArialLiveStatus
