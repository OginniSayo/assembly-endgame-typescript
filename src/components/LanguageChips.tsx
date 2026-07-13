import type { JSX } from "react";
import type { Language } from "../languages";
import clsx from "clsx";

type LanguageChipsProps = {
  languages: Language[];
  wrongGuessCount: number;
}

const LanguageChips = ({ languages, wrongGuessCount }: LanguageChipsProps): JSX.Element => {

  const languageElements: JSX.Element[] = languages.map((language: Language, index: number): JSX.Element => {

    const languageChipStyles: Omit<Language, "name"> = {
      backgroundColor: language.backgroundColor,
      color: language.color
    }
  
    const isLanguageLost: boolean = index < wrongGuessCount;

    const languageChipClassName: string = clsx("chip", isLanguageLost && "lost")
    
    return (
      <span 
        className={languageChipClassName}
        key={language.name} 
        style={languageChipStyles}
      >
        {language.name}
      </span>
    )
  });

  return (
    <section className="language-chips">
      {languageElements}
    </section>
  )
}

export default LanguageChips
