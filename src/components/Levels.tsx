import type {JSX} from "react"
import type { Level } from "../levels"
import clsx from "clsx"

type LevelProps = {
  levels: Level[];
  selectedLevel: Level | null;
  selectLevel: (level: Level) => void;
}


export default function Levels({ 
    levels, 
    selectedLevel, 
    selectLevel 
  }: LevelProps): JSX.Element {
    
    
    return (
      <section className="levels">
      {levels.map((level: Level) => {
        
        const levelClassName: string = clsx(
          "level", 
          selectedLevel?.name === level.name && "selected-level"
        )

        const levelStyles: Omit<Level, "name" | "timer"> = { 
          backgroundColor: level.backgroundColor, 
          color: level.color
        }

        return (
          <button 
            key={level.name} 
            className={levelClassName}
            style={levelStyles}
            onClick={() => selectLevel(level)}
          >
            {level.name}
          </button>
        )
      })
      }
    </section>
  )
}