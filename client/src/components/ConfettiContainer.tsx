import type { JSX } from "react";
import { useState, useEffect } from "react"
import Confetti from "react-confetti"

const ConfettiContainer = ({ isGameWon }: {isGameWon: boolean}): JSX.Element | null => {

  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number
  }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if(!isGameWon) {
    return null;
  }
  else {
    return (
      <>    
        {isGameWon && <Confetti
          width={windowSize.width}
          height={windowSize.height}
          style={{ position: "fixed", top: 0, left: 0 }}
          recycle={false}
          numberOfPieces={1000}
        />}
      </>
    )
  }

}

export default ConfettiContainer
