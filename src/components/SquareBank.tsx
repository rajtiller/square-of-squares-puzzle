import type { Square } from "../types/Square";
import { SquareItem } from "./SquareItem";

interface SquareBankProps {
  squares: Square[];
  cellSize: number;
  onDragStart: (square: Square, e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const SquareBank = ({
  squares,
  cellSize,
  onDragStart,
  onDrop,
  onDragOver,
}: SquareBankProps) => {
  const availableSquares = squares.filter((sq) => !sq.placed);

  return (
    <div className="square-bank">
      <h3>Available Squares (Drag here to remove)</h3>
      <div className="squares-list" onDragOver={onDragOver} onDrop={onDrop}>
        {availableSquares.map((square) => (
          <SquareItem
            key={square.id}
            square={square}
            cellSize={cellSize}
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
};
