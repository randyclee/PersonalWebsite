import Letter from './Letter';


export default function WordDisplay({  darkMode, displayedLetters, onSelectLetter }) {
    return (
        <div className="flex flex-wrap justify-center">
            {displayedLetters.map(({ letter, id }) => (
                <Letter
                    key={id}
                    id={id}
                    letter={letter}
                    onSelect={onSelectLetter}
                    darkMode={darkMode}
                />
            ))}
        </div>
    );
}