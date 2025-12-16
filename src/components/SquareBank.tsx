import type { Square } from "../types/Square";
import { SquareItem } from "./SquareItem";

interface SquareBankProps {
  squares: Square[];
  cellSize: number;
  onDragStart: (square: Square, e: React.DragEvent<HTMLDivElement>) => void;
}

export const SquareBank = ({
  squares,
  cellSize,
  onDragStart,
}: SquareBankProps) => {
  const availableSquares = squares.filter((sq) => !sq.placed);

  return (
    <div className="square-bank">
      <h3>Available Squares</h3>
      <div className="squares-list">
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
