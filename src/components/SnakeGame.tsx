import { useCallback, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

const GAME_SPEED = 150;

export const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameSize, setGameSize] = useState({ width: 40, height: 20 });
  const gameRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(
    (currentSnake: Position[]) => {
      let newFood: Position;
      do {
        newFood = {
          x: Math.floor(Math.random() * gameSize.width),
          y: Math.floor(Math.random() * gameSize.height),
        };
      } while (
        currentSnake.some(
          (segment) => segment.x === newFood.x && segment.y === newFood.y,
        )
      );
      return newFood;
    },
    [gameSize],
  );

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((currentSnake) => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (
        head.x < 0 ||
        head.x >= gameSize.width ||
        head.y < 0 ||
        head.y >= gameSize.height
      ) {
        setGameOver(true);
        return currentSnake;
      }

      if (
        newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        return currentSnake;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameSize, generateFood]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q") {
        window.dispatchEvent(new CustomEvent("exitSnake"));
        return;
      }

      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    },
    [direction, gameOver],
  );

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  }, [generateFood]);

  useEffect(() => {
    const updateGameSize = () => {
      if (gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        const cellSize = Math.min(rect.width / 50, rect.height / 30);
        const width = Math.floor(rect.width / cellSize);
        const height = Math.floor(rect.height / cellSize);
        setGameSize({ width, height });
      }
    };

    updateGameSize();
    window.addEventListener("resize", updateGameSize);
    return () => window.removeEventListener("resize", updateGameSize);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!gameOver) {
      intervalRef.current = setInterval(moveSnake, GAME_SPEED);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [moveSnake, gameOver]);

  useEffect(() => {
    setFood(generateFood(snake));
  }, [gameSize, generateFood, snake]);

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gameSize.height; y++) {
      for (let x = 0; x < gameSize.width; x++) {
        let cellType = "empty";

        if (snake.some((segment) => segment.x === x && segment.y === y)) {
          cellType = snake[0].x === x && snake[0].y === y ? "head" : "body";
        } else if (food.x === x && food.y === y) {
          cellType = "food";
        }

        grid.push(
          <div
            key={`${x}-${y}`}
            className={`
              w-3 h-3 border border-gray-800
              ${cellType === "head" ? "bg-green" : ""}
              ${cellType === "body" ? "bg-teal" : ""}
              ${cellType === "food" ? "bg-red" : ""}
              ${cellType === "empty" ? "bg-base" : ""}
            `}
          />,
        );
      }
    }
    return grid;
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="text-white text-2xl mb-4 flex items-center gap-8">
        <div>Score: {score}</div>
        <div className="text-sm text-gray-400">
          Use WASD or Arrow Keys to move • Press Q to quit
        </div>
      </div>

      <div
        ref={gameRef}
        className="border-2 border-gray-600 bg-gray-900 flex-1 max-w-6xl max-h-96 mx-4"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gameSize.width}, 1fr)`,
          gridTemplateRows: `repeat(${gameSize.height}, 1fr)`,
          aspectRatio: `${gameSize.width} / ${gameSize.height}`,
        }}
      >
        {renderGrid()}
      </div>

      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-4xl mb-4">Game Over!</div>
            <div className="text-xl mb-4">Final Score: {score}</div>
            <div className="text-sm text-gray-400 mb-4">Press Q to quit</div>
            <button
              onClick={resetGame}
              className="bg-green hover:bg-teal text-white px-6 py-2 rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
