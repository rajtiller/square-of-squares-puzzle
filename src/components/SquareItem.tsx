import type { Square } from "../types/Square";
import { getSquareColor } from "../utils/squareUtils";

const DRAG_SCALE = 0.7;

interface SquareItemProps {
  square: Square;
  cellSize: number;
  isDragging?: boolean;
  onDragStart: (square: Square, e: React.DragEvent<HTMLDivElement>) => void;
}

export const SquareItem = ({
  square,
  cellSize,
  isDragging = false,
  onDragStart,
}: SquareItemProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
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
    <div
      className="square-item"
      draggable
      onDragStart={handleDragStart}
      style={{
        width: isDragging
          ? square.size * cellSize * DRAG_SCALE
          : square.size * cellSize,
        height: isDragging
          ? square.size * cellSize * DRAG_SCALE
          : square.size * cellSize,
        backgroundColor: getSquareColor(square.size),
      }}
    >
      {square.size}×{square.size}
    </div>
  );
};
