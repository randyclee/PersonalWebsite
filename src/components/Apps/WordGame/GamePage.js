'use client'
import { useState, useEffect } from 'react';
import WordDisplay from '@/components/Apps/WordGame/WordDisplay';
import jsonData from '@/mockData/Apps/WordGame/Words.json';
import Modal from './Modal'; // Adjust the path based on your file structure

export default function Home({darkMode}) {
    const [currentWords, setCurrentWords] = useState([]);
    const [selectedLetterIds, setSelectedLetterIds] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const [confirmedWords, setConfirmedWords] = useState([]);
    const [displayedLetters, setDisplayedLetters] = useState([]);
    const [showRestartConfirmation, setShowRestartConfirmation] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const openModal = (message, success) => {
        console.log("openModal called with", message, success); 
        setModalMessage(message);
        setIsSuccess(success);
        setShowModal(true);
      };

      const confirmRestart = () => {
        setShowRestartConfirmation(true);
        openModal("Are you sure you want to restart?", null);
      };

      const handleSubmit = () => {
        const confirmedWordList = confirmedWords.map(wordObj => wordObj.word);
        const loadedWordList = currentWords;
      
        const isCorrect = loadedWordList.length === confirmedWordList.length && 
                          loadedWordList.every(word => confirmedWordList.includes(word));
      
        if (isCorrect) {
          openModal("Completed, good job!", true);
          setConfirmedWords([]);
          loadNewWords();
        } else {
          openModal("All words do not match!", false);
        }
      };
      
    useEffect(() => {
      loadNewWords();
    }, []);
  
    const loadNewWords = () => {
      const categories = Object.keys(jsonData);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setCurrentCategory(randomCategory.replace(/_/g, ' '));
  
      const categoryWords = jsonData[randomCategory];
      const shuffledWords = shuffleArray(categoryWords);
      const selectedWords = shuffledWords.slice(0, 4).map(word => shuffleString(word));

      setCurrentWords(selectedWords);
      setSelectedLetterIds([]);
      let flatLetters = selectedWords.join('').split('');
      setDisplayedLetters(flatLetters.map((letter, index) => ({ letter, id: index.toString() })));
    };

    const shuffleArray = (array) => {
      let currentIndex = array.length, temporaryValue, randomIndex;
    
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    };
  
    const shuffleString = (str) => {
      const arr = str.split('');
      return shuffleArray(arr).join('');
    };
  
    const shuffleLetters = () => {
        setDisplayedLetters(shuffleArray([...displayedLetters]));
    };
  
    const onSelectLetter = (id) => {
      const selectedLetter = displayedLetters.find(letterObj => letterObj.id === id);
      if (selectedLetter) {
        setSelectedLetterIds([...selectedLetterIds, selectedLetter]); 
        setDisplayedLetters(displayedLetters.filter(letterObj => letterObj.id !== id));
      }
    };
    
    const onConfirmWord = () => {
      if(selectedLetterIds.length !== 0){
          const word = selectedLetterIds.map(letterObj => letterObj.letter).join('');
          const wordObj = {
          word: word,
          letterIds: selectedLetterIds.map(letterObj => letterObj.id)
          };
          setConfirmedWords([...confirmedWords, wordObj]);
          setSelectedLetterIds([]); 
      }
    };

    const clearSelection = () => {
      const lettersToReAdd = selectedLetterIds.map(id => {
        const letterIndex = parseInt(id.id, 10);
        return { letter: currentWords.join('')[letterIndex], id: id.id };
      });
    
      setDisplayedLetters(shuffleArray([...displayedLetters, ...lettersToReAdd]));
      setSelectedLetterIds([]);
    };
      
    const onRemoveWord = (wordObjToRemove) => {
      setConfirmedWords(confirmedWords.filter(wordObj => wordObj !== wordObjToRemove));
    
      const lettersToReAdd = wordObjToRemove.letterIds.map(id => {
        const letterIndex = parseInt(id, 10);
        return { letter: currentWords.join('')[letterIndex], id };
      });
    
      setDisplayedLetters(shuffleArray([...displayedLetters, ...lettersToReAdd]));
    };

  return (
    <div className={`pt-16 ${darkMode ? "bg-gradient-to-l from-black via-gray-900 to-black text-gray-200" : "bg-gray-100 text-black"}`}>
            <div className="w-full text-center mt-6 px-4">
                <h3 className="text-3xl font-bold">Categories Game</h3>
                <p className="text-center mx-auto text-md mt-2" style={{ maxWidth: '600px' }}>
                    Find the 4 words related to the category shown. Click on a letter to start
                </p>
            </div>

            <div className="flex justify-center pt-6 ">
                <div className="space-x-3">
                    <button onClick={confirmRestart} className={`${darkMode ? "bg-blue-700 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded text-lg`}>
                        Restart
                    </button>
                    <button onClick={shuffleLetters} className={`${darkMode ? "bg-yellow-700 hover:bg-yellow-500 text-white" : "bg-yellow-500 hover:bg-yellow-700 text-black"} text-white font-bold py-2 px-4 rounded text-lg`}>
                        Shuffle Letters
                    </button>
                </div>
            </div>

            <div className={`flex flex-col items-center mt-10 pb-16 p-4 w-full lg:px-64`}>
                <h2 className="text-2xl font-bold mb-4">{currentCategory.toUpperCase()}</h2>
              <WordDisplay darkMode={darkMode} displayedLetters={displayedLetters} onSelectLetter={onSelectLetter} />
              <div className={`flex items-center border-b text-lg p-2 m-4 mt-12 ${darkMode?"border-white":"border-black"}`}>
                {selectedLetterIds.map(letterObj => letterObj.letter).join('')}
                <button onClick={clearSelection} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    X
                </button>
                <button onClick={onConfirmWord} className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    ✔️
                </button>
                </div>
                <div className="mt-4">
          {confirmedWords.map((wordObj, index) => (
            <div key={index} className="flex items-center m-2">
              {wordObj.word}
              <button onClick={() => onRemoveWord(wordObj)} className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                X
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit} className={`${darkMode? "bg-blue-700 hover:bg-blue-500 text-white":"bg-blue-500 hover:bg-blue-700 text-black"} mt-6 text-white font-bold py-2 px-4 rounded text-lg`}>
          Submit
        </button>



<Modal
  showModal={showModal || showRestartConfirmation}
  message={modalMessage}
  onSuccess={showRestartConfirmation ? () => {
    setShowRestartConfirmation(false)
    setShowModal(false)
    loadNewWords()
    }
     : 
    null
    }
  onContinue={() => {
    setShowModal(false);
    setShowRestartConfirmation(false);
  }}
/>
    </div>
    </div>

  );
}
