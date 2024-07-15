'use client'
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image'
import { AiOutlineLinkedin, AiOutlineGithub, AiOutlineMail } from 'react-icons/ai';
import { FiSun, FiMoon, FiArrowDown } from 'react-icons/fi';

export default function RandysWebsite({ darkMode, toggleTheme, scrollToAboutMe, downButtonRef }) {
  const canvasRef = useRef(null);
  const obstacleRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState();
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameArea, setGameArea] = useState(false);
  const directionRef = useRef({ x: 10, y: 0 });


  const handlers = useSwipeable({
    onSwipedLeft: () => {
      directionRef.current ={ x: -10, y: 0 };
    },
    onSwipedRight: () => {
      directionRef.current = { x: 10, y: 0 }
    },
    onSwipedUp: () => {
      directionRef.current ={ x: 0, y: -10 }
    },
    onSwipedDown: () => {
      directionRef.current ={ x: 0, y: 10 }
    },
  });

  const doesCollideWithObstacles = (newFood) => {
    const obstacles = obstacleRefs.current.filter(Boolean);
    return obstacles.some(obstacle => {
      const rect = obstacle.getBoundingClientRect();
      return (
        newFood.x < rect.right &&
        newFood.x + 10 > rect.left &&
        newFood.y < rect.bottom &&
        newFood.y + 10 > rect.top
      );
    });
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setSnake([{ x: 50, y: 100 }]);
    directionRef.current = { x: 10, y: 0 };
  
    const topMargin = 16 * 4;
    const gameArea = {
      top: topMargin,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
    setGameArea(gameArea);
  
    // Generate random initial position for the food
    const randomFoodPosition = () => {
      let newFood;
      do {
        newFood = {
          x: Math.floor(Math.random() * (gameArea.right - gameArea.left) / 10) * 10 + gameArea.left,
          y: Math.floor(Math.random() * (gameArea.bottom - gameArea.top) / 10) * 10 + gameArea.top,
        };
      } while (doesCollideWithObstacles(newFood));
      return newFood;
    };
    const initialFoodPosition = randomFoodPosition();
    setFood(initialFoodPosition);
  };
  


  const endGame = () => {
    setGameStarted(false);
    setSnake([]);
    setFood(null);
    setScore(0); 
    clearCanvas();
  }

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    let gameLoop;

    if (gameStarted) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (snake && snake.length > 0) {
          ctx.fillStyle = 'green';
          snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 10, 10);
          });
        }
      
        if (food) {
          ctx.fillStyle = 'red';
          ctx.fillRect(food.x, food.y, 10, 10);
        }
      };

      gameLoop = setInterval(() => {
        const newSnake = [...snake];
        const head = { x: newSnake[0].x + directionRef.current.x, y: newSnake[0].y + directionRef.current.y };
      
        if (head.x >= gameArea.right) head.x = gameArea.left;
        if (head.y >= gameArea.bottom) head.y = gameArea.top;
        if (head.x < gameArea.left) head.x = gameArea.right - 10; 
        if (head.y < gameArea.top) head.y = gameArea.bottom - 10;

        if (doesCollideWithObstacles(snake[0])) {
          setGameStarted(false);
          setIsModalOpen(true);
        }

        newSnake.unshift(head);

        if (Math.abs(snake[0].x - food.x) < 10 && Math.abs(snake[0].y - food.y) < 10) {
          setScore((prevScore) => prevScore + 1);
          let newFood;
          do {
            newFood = {
              x: Math.floor((Math.random() * (gameArea.right - gameArea.left) / 10)) * 10 + gameArea.left,
              y: Math.floor((Math.random() * (gameArea.bottom - gameArea.top) / 10)) * 10 + gameArea.top,
            };
          } while (
            doesCollideWithObstacles(newFood) ||
            snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
          );
          setFood(newFood);
        } else {
          newSnake.pop();
        }

        setSnake(newSnake);
        draw();
      
      }, 75) ;
    }else {
      clearInterval(gameLoop);
    }

    return () => clearInterval(gameLoop);
  }, [gameStarted, snake, food, directionRef.current]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStarted) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault()
            directionRef.current ={ x: 0, y: -10 };
            break;
          case 'ArrowDown':
            e.preventDefault()
            directionRef.current ={ x: 0, y: 10 };
            break;
          case 'ArrowLeft':
            e.preventDefault()
            directionRef.current ={ x: -10, y: 0 };
            break;
          case 'ArrowRight':
            e.preventDefault()
            directionRef.current ={ x: 10, y: 0 };
            break;
          default:
            break;
        }
      }
    };
  
    if (gameStarted) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted]);

  const closeModal = () => {
    setIsModalOpen(false);
    setGameStarted(false);
    endGame();
  };


  return (
    <div 
      style={{ touchAction: gameStarted ? 'none' : 'auto', minHeight: '100vh'  }} 
      className={`flex flex-col items-center w-full h-auto overflow-hidden relative ${darkMode ? 'bg-gradient-to-l from-black via-gray-900 to-black text-gray-300' : 'bg-gradient-to-l from-white via-gray-100 to-white text-black'}`}
      {...handlers}
    >
      {!gameStarted ? (
        <div className="absolute top-16 right-0 mt-4 mr-4 z-10">
          <button
            className="py-2 px-4 bg-blue-800 rounded mb-4 z-10 text-white"
            onClick={(e) => {
              e.preventDefault();
              startGame();
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className='z-10 absolute top-16 right-0 mt-4 mr-4 flex flex-col items-center'>
          <button ref={(el) => (obstacleRefs.current[0] = el)} className="py-2 px-4 bg-red-500 border-black rounded lg:mb-4 z-10" onClick={endGame}>Exit Game</button>
          <h1 ref={(el) => (obstacleRefs.current[1] = el)} className="text-md mb-4">Score: {score}</h1>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full h-auto px-4 pt-40 mb-10">

        <div className="flex flex-col-reverse md:flex-row items-center justify-center mb-4 ">
          <Image width={800} height={1200} ref={(el) => (obstacleRefs.current[4] = el)} className="w-60 h-60 md:w-80 md:h-80 mr-0 md:mr-8 rounded-full mb-4 md:mb-0" src="/randy.jpg" alt="Randy Lee" />
          <div className="text-center md:text-left">
            <p ref={(el) => (obstacleRefs.current[2] = el)} className='text-3xl md:text-5xl mb-2 text-red-600'>Hello!</p>
            <h1 ref={(el) => (obstacleRefs.current[2] = el)} className="text-3xl md:text-5xl mb-2"> My Name is <span className=' text-blue-600'>Randy</span></h1>
            <h1 ref={(el) => (obstacleRefs.current[3] = el)} className="text-md md:text-lg mb-5">I'm a Software Engineer. Come explore my digital home!</h1>
          </div>
        </div>

        <div
          className={`flex flex-row items-center justify-center mt-4 lg:mt-10 ${gameStarted ? 'pointer-events-none' : ''}`}
        >         
        <a
            ref={(el) => (obstacleRefs.current[5] = el)}
            href="https://www.linkedin.com/in/randyclee"
            target="_blank"
            className={`flex items-center border-blue-700  text-blue-700  hover:text-blue-300 border rounded-lg px-4 py-2 lg:mx-8 mx-2 transition-colors duration-300`}
            style={{ zIndex: 1 }}
          >
            <AiOutlineLinkedin className="w-6 h-6 " />
            <span className="hidden sm:inline ml-2">LinkedIn</span>
          </a>
          <a
            ref={(el) => (obstacleRefs.current[6] = el)}
            href="https://github.com/randyclee"
            target="_blank"
            className={`flex items-center border border-teal-700 text-teal-700 hover:text-teal-300 rounded-lg px-4 py-2 lg:mx-8 mx-2 transition-colors duration-300`}
            style={{ zIndex: 1 }}
          >
            <AiOutlineGithub className="w-6 h-6" />
            <span className="hidden sm:inline ml-2">GitHub</span>
          </a>
          <a
            ref={(el) => (obstacleRefs.current[7] = el)}
            href="mailto:rclee.business@gmail.com"
            className={`flex items-center border border-sky-700 text-sky-700 hover:text-sky-300 rounded-lg px-4 py-2 lg:mx-8 mx-2 transition-colors duration-300`}
            style={{ zIndex: 1 }}
          >
            <AiOutlineMail className="w-6 h-6" />
            <span className="hidden sm:inline ml-2">Email</span>
          </a>
          <button
            onClick={toggleTheme}
            ref={(el) => (obstacleRefs.current[8] = el)}
            className={`flex items-center border border-rose-700 text-rose-700 hover:text-rose-300 rounded-lg px-4 py-2 lg:mx-8 mx-2 transition-colors duration-300`}
            style={{ zIndex: 1 }}
          >
            {darkMode ? (
              <>
                <FiSun className="w-6 h-6" />
                <span className="hidden sm:inline ml-2">Light Mode</span>
              </>
            ) : (
              <>
                <FiMoon className="w-6 h-6" />
                <span className="hidden sm:inline ml-2">Dark Mode</span>
              </>
            )}
          </button>
        </div>
       
      </div>
      <button
          onClick={scrollToAboutMe}
          style={{ zIndex: 1 }}
          ref={(el) => {
            obstacleRefs.current[9] = el;
            downButtonRef.current = el  
          }}
          className={`mb-8 md:mb-2 lg:mt-5 bottom-4 left-1/2 transform font-bold py-2 px-4 rounded-full border
            ${gameStarted ? 'pointer-events-none' : ''} 
            ${darkMode ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}
          `}
        >
          <FiArrowDown className="text-xl animate-bounce" />
      </button>
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute top-0 left-0 z-0"
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black text-white bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-gray-200 text-black p-8 rounded shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Game Over!</h2>
            <p className="text-lg mb-4">Your Score: {score}</p>
            <button onClick={closeModal} className="py-2 px-4 bg-blue-500 text-white rounded focus:outline-none">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
