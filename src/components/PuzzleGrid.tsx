import type { Square } from "../types/Square";
import { PlacedSquare } from "./PlacedSquare";
import { getSquareColor } from "../utils/squareUtils";

const DRAG_SCALE = 0.7;

interface PuzzleGridProps {
  gridSize: number;
  cellSize: number;
  squares: Square[];
  draggedSquare: Square | null;
  hoverPosition: { x: number; y: number } | null;
  isLegalPosition: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
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
  draggedSquare,
  hoverPosition,
  isLegalPosition,
  onDragOver,
  onDragLeave,
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
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* Hover preview */}
        {draggedSquare && hoverPosition && (
          <div
            className="hover-preview"
            style={{
              position: "absolute",
              left: hoverPosition.x * cellSize,
              top: hoverPosition.y * cellSize,
              width: draggedSquare.size * cellSize,
              height: draggedSquare.size * cellSize,
              backgroundColor: isLegalPosition
                ? getSquareColor(draggedSquare.size)
                : "#ff4444",
              pointerEvents: "none",
              border: isLegalPosition
                ? "2px dashed #333"
                : "2px dashed #ff0000",
              boxSizing: "border-box",
            }}
          >
            {/* Inner square at 70% centered */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: `${draggedSquare.size * cellSize * DRAG_SCALE}px`,
                height: `${draggedSquare.size * cellSize * DRAG_SCALE}px`,
                backgroundColor: isLegalPosition
                  ? getSquareColor(draggedSquare.size)
                  : "#ff4444",
                opacity: 0.8,
              }}
            />
          </div>
        )}

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
