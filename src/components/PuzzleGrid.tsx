import type { Square } from "../types/Square";
import { PlacedSquare } from "./PlacedSquare";

interface PuzzleGridProps {
  gridSize: number;
  cellSize: number;
  squares: Square[];
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onPlacedSquareDragStart: (
    square: Square,
    e: React.DragEvent<HTMLDivElement>
  ) => void;
  onDragEnd: () => void;
}

export const PuzzleGrid = ({
  gridSize,
  cellSize,
  squares,
  onDragOver,
  onDrop,
  onPlacedSquareDragStart,
  onDragEnd,
}: PuzzleGridProps) => {
  const placedSquares = squares.filter((sq) => sq.placed);

  return (
    <div className="grid-container">
      <h3>
        Target Grid ({gridSize}×{gridSize})
      </h3>
      <div
        className="grid"
        style={{
          width: gridSize * cellSize,
          height: gridSize * cellSize,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              #ddd 0px,
              #ddd 1px,
              transparent 1px,
              transparent ${cellSize}px
            ),
            repeating-linear-gradient(
              90deg,
              #ddd 0px,
              #ddd 1px,
              transparent 1px,
              transparent ${cellSize}px
            )
          `,
        }}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {placedSquares.map((square) => (
          <PlacedSquare
            key={square.id}
            square={square}
            cellSize={cellSize}
            onDragStart={onPlacedSquareDragStart}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  );
};
