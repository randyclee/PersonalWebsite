'use client'
import { useState, useEffect } from 'react';
import WordDisplay from './WordDisplay';
import jsonData from '@/data/WordGame/ChineseWords.json';
import Modal from './Modal'; 

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
        const isCorrect = confirmedWords.every(confirmedWordObj => {
          const confirmedLeftPart = confirmedWordObj.leftPart;
          const confirmedRightPart = confirmedWordObj.rightPart;
      
          return currentWords.some(currentWordObj => 
            confirmedLeftPart === currentWordObj.leftPart && confirmedRightPart === currentWordObj.rightPart
          );
        });
      
        if (isCorrect && confirmedWords.length === currentWords.length) {
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
      const selectedWords = shuffleArray(categoryWords).slice(0, 4);
      const wordParts = selectedWords.flatMap(word => [word.leftPart, word.rightPart]);
  
      setCurrentWords(selectedWords);
      setSelectedLetterIds([]);
      setDisplayedLetters(wordParts.map((part, index) => ({ letter: part, id: index.toString() })));
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
  
    const shuffleLetters = () => {
        setDisplayedLetters(shuffleArray([...displayedLetters]));
    };
  
    
    
    const onConfirmWord = () => {
      if (selectedLetterIds.length !== 0) {
        const word = selectedLetterIds.map(letterObj => letterObj.letter).join('');
        const wordObj = {
          leftPart: selectedLetterIds[0].letter, // Use the first selected letter as the left part
          rightPart: selectedLetterIds[selectedLetterIds.length - 1].letter, // Use the last selected letter as the right part
        };
        setConfirmedWords([...confirmedWords, wordObj]);
        setSelectedLetterIds([]);
      }
    };


    const clearSelection = () => {
      const lettersToReAdd = selectedLetterIds.map(idObj => {
          return { letter: idObj.letter, id: idObj.id };
      });

      setDisplayedLetters([...displayedLetters, ...lettersToReAdd]);
      setSelectedLetterIds([]);
  };

  const onRemoveWord = (wordObjToRemove) => {
    const updatedConfirmedWords = confirmedWords.filter(wordObj => 
      wordObj.leftPart !== wordObjToRemove.leftPart ||
      wordObj.rightPart !== wordObjToRemove.rightPart
    );
  
    // Generate unique IDs based on a combination of the letter and a timestamp
    const removedLetters = [
      { letter: wordObjToRemove.leftPart, id: `removed-left-${Date.now()}` },
      { letter: wordObjToRemove.rightPart, id: `removed-right-${Date.now() + 1}` }
    ];
  
    setConfirmedWords(updatedConfirmedWords);
    setDisplayedLetters(prevDisplayedLetters => [...prevDisplayedLetters, ...removedLetters]);
  };
  
  
  const onSelectLetter = (id) => {
    const selectedLetter = displayedLetters.find(letterObj => letterObj.id === id);
    if (selectedLetter) {
      setSelectedLetterIds(prevSelectedLetterIds => [...prevSelectedLetterIds, selectedLetter]);
      setDisplayedLetters(prevDisplayedLetters => prevDisplayedLetters.filter(letterObj => letterObj.id !== id));
    }
  };
  
  
  
  return (
    <div className={`pt-16 ${darkMode ? "bg-gradient-to-l from-black via-gray-900 to-black text-gray-200" : "bg-gray-100 text-black"}`}>
            <div className="w-full text-center mt-6 px-4">
                <h3 className="text-3xl font-bold">Chinese Categories Game</h3>
                <p className="text-center mx-auto text-md mt-2" style={{ maxWidth: '600px' }}>
                    Find the 4 relations to the category shown. This can be one word split into its separate parts or two Words split up. Click on a word to start
                </p>
            </div>

            <div className="flex justify-center pt-6 ">
                <div className="space-x-3">
                    <button onClick={confirmRestart} className={`${darkMode ? "bg-blue-700 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded text-lg`}>
                        Restart
                    </button>
                    <button onClick={shuffleLetters} className={`${darkMode ? "bg-yellow-700 hover:bg-yellow-500 text-white" : "bg-yellow-500 hover:bg-yellow-700 text-black"} text-white font-bold py-2 px-4 rounded text-lg`}>
                        Shuffle Words
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
                      {wordObj.leftPart}{wordObj.rightPart}
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
          setDisplayedLetters([])
          setConfirmedWords([])
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
