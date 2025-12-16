import { Controls } from "./components/Controls";
import { SquareBank } from "./components/SquareBank";
import { PuzzleGrid } from "./components/PuzzleGrid";
import { usePuzzle } from "./hooks/usePuzzle";
import { CELL_SIZE, getGridSize } from "./constants/puzzleConfig";
import { calculateSnapPosition } from "./utils/squareUtils";
import type { Square } from "./types/Square";
import "./App.css";

function App() {
  const {
    maxSize,
    squares,
    draggedSquare,
    dragOffset,
    setDraggedSquare,
    setDragOffset,
    placeSquare,
    removeSquare,
    resetPuzzle,
    toggleMode,
  } = usePuzzle(8);

  const gridSize = getGridSize(maxSize);

  const handleDragStart = (
    square: Square,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    setDraggedSquare(square);

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDropOnGrid = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedSquare) return;

    const gridElement = e.currentTarget;
    const rect = gridElement.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const { x, y } = calculateSnapPosition(
      mouseX,
      mouseY,
      dragOffset,
      CELL_SIZE,
      draggedSquare.size,
      gridSize
    );

    placeSquare(draggedSquare.id, x, y);
    setDraggedSquare(null);
  };

  return (
    <div className="app">
      <h1>Square of Squares Puzzle</h1>

      <Controls
        maxSize={maxSize}
        gridSize={gridSize}
        onToggleMode={toggleMode}
        onReset={resetPuzzle}
      />

      <div className="puzzle-container">
        <SquareBank
          squares={squares}
          cellSize={CELL_SIZE}
          onDragStart={handleDragStart}
        />

        <PuzzleGrid
          gridSize={gridSize}
          cellSize={CELL_SIZE}
          squares={squares}
          onDragOver={handleDragOver}
          onDrop={handleDropOnGrid}
          onSquareClick={removeSquare}
        />
      </div>
    </div>
  );
}

export default App;
