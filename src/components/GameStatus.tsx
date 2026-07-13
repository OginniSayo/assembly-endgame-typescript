import clsx from "clsx"

import type { JSX } from "react"

type GameStatusProps = {
  isGameWon: boolean;
  isGameLost: boolean;
  farewellMessage: string;
}

const GameStatus = ({ isGameWon, isGameLost, farewellMessage }: GameStatusProps): JSX.Element => {

  const gameStatusClass: string = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost
  })

  return (
    <section 
      aria-live="polite" 
      role="status" 
      className={ gameStatusClass }
    >
      {isGameWon && <>
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </>}

      {!isGameWon && !isGameLost && farewellMessage && (
        <div className="farewell-message">"{farewellMessage}" 🫡</div>
      )}

      {isGameLost && <>
        <h2>Game over!</h2>
        <p style={{textAlign: 'center'}}>You lose! Better start learning Assembly 😭</p>
      </>}
    </section>
  )
  
}

export default GameStatus
