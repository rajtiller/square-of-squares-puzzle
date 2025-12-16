import type { Square, MaxSize } from "../types/Square";

export const initializeSquares = (maxSize: MaxSize): Square[] => {
  const newSquares: Square[] = [];

  for (let size = maxSize; size >= 1; size--) {
    for (let i = 0; i < size; i++) {
      newSquares.push({
        id: `${size}-${i}`,
        size,
        x: -1,
        y: -1,
        placed: false,
      });
    }
  }

  return newSquares;
};

export const getSquareColor = (size: number): string => {
  return `hsl(${(size * 40) % 360}, 70%, 60%)`;
};

export const calculateSnapPosition = (
  mouseX: number,
  mouseY: number,
  dragOffset: { x: number; y: number },
  cellSize: number,
  squareSize: number,
  gridSize: number
): { x: number; y: number } => {
  // Calculate position relative to grid with offset
  const adjustedX = mouseX - dragOffset.x;
  const adjustedY = mouseY - dragOffset.y;

  // Snap to grid
  const gridX = Math.round(adjustedX / cellSize);
  const gridY = Math.round(adjustedY / cellSize);

  // Ensure square stays within bounds
  const boundedX = Math.max(0, Math.min(gridX, gridSize - squareSize));
  const boundedY = Math.max(0, Math.min(gridY, gridSize - squareSize));

  return { x: boundedX, y: boundedY };
};

export const isPositionLegal = (
  position: { x: number; y: number },
  square: Square,
  placedSquares: Square[]
): boolean => {
  // Check if the square would overlap with any placed squares
  for (const placed of placedSquares) {
    // Skip checking against itself
    if (placed.id === square.id) continue;

    // Check if rectangles overlap
    const noOverlapX =
      position.x + square.size <= placed.x ||
      position.x >= placed.x + placed.size;
    const noOverlapY =
      position.y + square.size <= placed.y ||
      position.y >= placed.y + placed.size;

    // If there's overlap in both dimensions, position is illegal
    if (!noOverlapX && !noOverlapY) {
      return false;
    }
  }

  return true;
};
