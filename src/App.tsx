import { Controls } from "./components/Controls";
import { SquareBank } from "./components/SquareBank";
import { PuzzleGrid } from "./components/PuzzleGrid";
import { usePuzzle } from "./hooks/usePuzzle";
import { useDragHandler } from "./hooks/useDragHandler";
import { CELL_SIZE, getGridSize } from "./constants/puzzleConfig";
import "./App.css";

function App() {
  const {
    maxSize,
    squares,
    draggedSquare: puzzleDraggedSquare,
    placeSquare,
    removeSquare,
    resetPuzzle,
    toggleMode,
  } = usePuzzle(8);

  const gridSize = getGridSize(maxSize);
  const placedSquares = squares.filter((sq) => sq.placed);

  const {
    draggedSquare,
    hoverPosition,
    isLegalPosition,
    handleDragStart,
    handlePlacedSquareDragStart,
    handleDragOver,
    handleDragLeave,
    handleDropOnGrid,
    handleDropOnBank,
    handleDragEnd,
  } = useDragHandler({
    gridSize,
    placedSquares,
    onPlaceSquare: placeSquare,
    onRemoveSquare: removeSquare,
  });

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
          draggedSquareId={draggedSquare?.id}
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
          isLegalPosition={isLegalPosition}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDropOnGrid}
          onPlacedSquareDragStart={handlePlacedSquareDragStart}
          onDragEnd={() => handleDragEnd(draggedSquare)}
        />
      </div>
    </div>
  );
}

export default App;
