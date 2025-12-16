import type { Square } from "../types/Square";
import { getSquareColor } from "../utils/squareUtils";

const DRAG_SCALE = 0.7;

interface SquareBankProps {
  squares: Square[];
  cellSize: number;
  draggedSquareId?: string;
  onDragStart: (square: Square, e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const SquareBank = ({
  squares,
  cellSize,
  draggedSquareId,
  onDragStart,
  onDrop,
  onDragOver,
}: SquareBankProps) => {
  const availableSquares = squares.filter(
    (sq) => !sq.placed && sq.id !== draggedSquareId
  );

  // Group by size and count
  const squareCounts = new Map<number, number>();
  availableSquares.forEach((sq) => {
    squareCounts.set(sq.size, (squareCounts.get(sq.size) || 0) + 1);
  });

  // Sort by size descending
  const sortedSizes = Array.from(squareCounts.keys()).sort((a, b) => b - a);

  const handleDragStart = (
    square: Square,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    // Create a custom drag image at 70% size
    const dragImg = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImg.style.width = `${square.size * cellSize * DRAG_SCALE}px`;
    dragImg.style.height = `${square.size * cellSize * DRAG_SCALE}px`;
    dragImg.style.position = "absolute";
    dragImg.style.top = "-1000px";
    document.body.appendChild(dragImg);

    e.dataTransfer.setDragImage(
      dragImg,
      (square.size * cellSize * DRAG_SCALE) / 2,
      (square.size * cellSize * DRAG_SCALE) / 2
    );

    setTimeout(() => document.body.removeChild(dragImg), 0);

    onDragStart(square, e);
  };

  return (
    <div className="square-bank">
      <h3>Available Squares</h3>
      <div className="squares-list" onDragOver={onDragOver} onDrop={onDrop}>
        {sortedSizes.length === 0 ? (
          <div className="no-squares">All squares placed!</div>
        ) : (
          sortedSizes.map((size) => {
            // Get one example square of this size for dragging
            const exampleSquare = availableSquares.find(
              (sq) => sq.size === size
            );
            if (!exampleSquare) return null;

            return (
              <div key={size} className="square-count-item">
                <div
                  className="square-item"
                  draggable
                  onDragStart={(e) => handleDragStart(exampleSquare, e)}
                  style={{
                    width: size * cellSize,
                    height: size * cellSize,
                    backgroundColor: getSquareColor(size),
                  }}
                >
                  {size}×{size}
                </div>
                <div className="square-badge">{squareCounts.get(size)}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
