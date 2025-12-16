import { useState, useEffect } from "react";
import type { Square, MaxSize } from "../types/Square";
import { initializeSquares } from "../utils/squareUtils";

export const usePuzzle = (initialMaxSize: MaxSize = 8) => {
  const [maxSize, setMaxSize] = useState<MaxSize>(initialMaxSize);
  const [squares, setSquares] = useState<Square[]>([]);
  const [draggedSquare, setDraggedSquare] = useState<Square | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSquares(initializeSquares(maxSize));
  }, [maxSize]);

  const placeSquare = (squareId: string, x: number, y: number) => {
    setSquares((prev) =>
      prev.map((sq) =>
        sq.id === squareId ? { ...sq, x, y, placed: true } : sq
      )
    );
  };

  const removeSquare = (squareId: string) => {
    setSquares((prev) =>
      prev.map((sq) => (sq.id === squareId ? { ...sq, placed: false } : sq))
    );
  };

  const resetPuzzle = () => {
    setSquares((prev) =>
      prev.map((sq) => ({ ...sq, x: -1, y: -1, placed: false }))
    );
  };

  const toggleMode = () => {
    setMaxSize((prev) => (prev === 8 ? 9 : 8));
  };

  return {
    maxSize,
    squares,
    draggedSquare,
    dragOffset,
    setDraggedSquare,
    setDragOffset,
    placeSquare,
    removeSquare,
    resetPuzzle,
    toggleMode,
  };
};
