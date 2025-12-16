import type { Square } from "../types/Square";
import { getSquareColor } from "../utils/squareUtils";

interface PlacedSquareProps {
  square: Square;
  cellSize: number;
  onClick: () => void;
}

export const PlacedSquare = ({
  square,
  cellSize,
  onClick,
}: PlacedSquareProps) => {
  return (
    <div
      className="placed-square"
      style={{
        position: "absolute",
        left: square.x * cellSize,
        top: square.y * cellSize,
        width: square.size * cellSize,
        height: square.size * cellSize,
        backgroundColor: getSquareColor(square.size),
      }}
      onClick={onClick}
    >
      {square.size}×{square.size}
    </div>
  );
};
