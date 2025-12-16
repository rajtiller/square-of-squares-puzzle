import type { MaxSize } from "../types/Square";

export const CELL_SIZE = 20; // Increased from 15 to 20

export const GRID_SIZES: Record<MaxSize, number> = {
  8: 36,
  9: 45,
};

export const getGridSize = (maxSize: MaxSize): number => {
  return GRID_SIZES[maxSize];
};
