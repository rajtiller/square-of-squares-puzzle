import type { Square } from "../types/Square";
import { getSquareColor } from "../utils/squareUtils";

interface PlacedSquareProps {
  square: Square;
  cellSize: number;
  onDragStart: (square: Square, e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

export const PlacedSquare = ({
  square,
  cellSize,
  onDragStart,
  onDragEnd,
}: PlacedSquareProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // Create a custom drag image at 70% size
    const dragImg = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImg.style.width = `${square.size * cellSize * 0.7}px`;
    dragImg.style.height = `${square.size * cellSize * 0.7}px`;
    dragImg.style.position = "absolute";
    dragImg.style.top = "-1000px";
    document.body.appendChild(dragImg);

    e.dataTransfer.setDragImage(
      dragImg,
      (square.size * cellSize * 0.7) / 2,
      (square.size * cellSize * 0.7) / 2
    );

    setTimeout(() => document.body.removeChild(dragImg), 0);

    onDragStart(square, e);
  };

  return (
    <div
      className="placed-square"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      style={{
        position: "absolute",
        left: square.x * cellSize,
        top: square.y * cellSize,
        width: square.size * cellSize,
        height: square.size * cellSize,
        backgroundColor: getSquareColor(square.size),
        cursor: "grab",
      }}
    >
      {square.size}×{square.size}
    </div>
  );
};
