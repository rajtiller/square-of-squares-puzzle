import type { Square } from "../types/Square";
import { getSquareColor } from "../utils/squareUtils";

interface SquareItemProps {
  square: Square;
  cellSize: number;
  onDragStart: (square: Square, e: React.DragEvent<HTMLDivElement>) => void;
}

export const SquareItem = ({
  square,
  cellSize,
  onDragStart,
}: SquareItemProps) => {
  return (
    <div
      className="square-item"
      draggable
      onDragStart={(e) => onDragStart(square, e)}
      style={{
        width: square.size * cellSize,
        height: square.size * cellSize,
        backgroundColor: getSquareColor(square.size),
      }}
    >
      {square.size}×{square.size}
    </div>
  );
};
