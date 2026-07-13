import type { JSX } from "react"

type NewGameButtonProps = {
  isGameWon: boolean;
  isGameLost: boolean;
  startNewGame: () => void;
}

const NewGameButton = ({ 
    isGameWon, 
    isGameLost, 
    startNewGame 
  }: NewGameButtonProps): JSX.Element | null => {

  {if (!isGameWon && !isGameLost) {
    return null;
  } 
  else {
    return (
      <button 
        className="new-game" 
        onClick={startNewGame}
      >
        New Game
      </button>
    )
  }
  }
}

export default NewGameButton
