import { useState } from "react";
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

  const [hoverPosition, setHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

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

  const handlePlacedSquareDragStart = (
    square: Square,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    // Set the dragged square FIRST before removing it
    setDraggedSquare(square);

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Then remove it from the grid
    // Use setTimeout to ensure state updates in the right order
    setTimeout(() => {
      removeSquare(square.id);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
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

    setHoverPosition({ x, y });
  };

  const handleDragLeave = () => {
    setHoverPosition(null);
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
    setHoverPosition(null);
  };

  const handleDropOnBank = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedSquare) return;

    // Just clear the dragged square - it's already removed from the grid
    setDraggedSquare(null);
    setHoverPosition(null);
  };

  const handleDragEnd = () => {
    // If drag ends without a valid drop, restore the square if it was placed
    if (draggedSquare && draggedSquare.placed && draggedSquare.x >= 0) {
      placeSquare(draggedSquare.id, draggedSquare.x, draggedSquare.y);
    }
    setDraggedSquare(null);
    setHoverPosition(null);
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
          onDragOver={handleDragOver}
          onDrop={handleDropOnBank}
        />

        <PuzzleGrid
          gridSize={gridSize}
          cellSize={CELL_SIZE}
          squares={squares}
          draggedSquare={draggedSquare}
          hoverPosition={hoverPosition}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnGrid}
          onPlacedSquareDragStart={handlePlacedSquareDragStart}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
}

export default App;
