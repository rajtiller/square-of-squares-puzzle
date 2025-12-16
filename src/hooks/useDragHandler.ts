import { useState } from "react";
import type { Square } from "../types/Square";
import { CELL_SIZE } from "../constants/puzzleConfig";
import { isPositionLegal } from "../utils/squareUtils";

interface UseDragHandlerProps {
  gridSize: number;
  placedSquares: Square[];
  onPlaceSquare: (squareId: string, x: number, y: number) => void;
  onRemoveSquare: (squareId: string) => void;
}

export const useDragHandler = ({
  gridSize,
  placedSquares,
  onPlaceSquare,
  onRemoveSquare,
}: UseDragHandlerProps) => {
  const [draggedSquare, setDraggedSquare] = useState<Square | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoverPosition, setHoverPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isLegalPosition, setIsLegalPosition] = useState(true);
  const [wasPlaced, setWasPlaced] = useState(false);

  const calculateDragOffset = (
    e: React.DragEvent<HTMLDivElement>,
    square: Square
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    return {
      x: clickX - centerX,
      y: clickY - centerY,
    };
  };

  const handleDragStart = (
    square: Square,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    setDraggedSquare(square);
    setDragOffset(calculateDragOffset(e, square));
    setWasPlaced(false);
  };

  const handlePlacedSquareDragStart = (
    square: Square,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    setDraggedSquare(square);
    setDragOffset(calculateDragOffset(e, square));
    setWasPlaced(true);

    setTimeout(() => {
      onRemoveSquare(square.id);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!draggedSquare) return;

    const gridElement = e.currentTarget;
    const rect = gridElement.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Center is where we want the square's center to be
    const centerX = mouseX - dragOffset.x;
    const centerY = mouseY - dragOffset.y;

    // Calculate top-left based on center
    const topLeftX = centerX - (draggedSquare.size * CELL_SIZE) / 2;
    const topLeftY = centerY - (draggedSquare.size * CELL_SIZE) / 2;

    // Snap to grid
    const gridX = Math.round(topLeftX / CELL_SIZE);
    const gridY = Math.round(topLeftY / CELL_SIZE);

    // Ensure square stays within bounds
    const boundedX = Math.max(
      0,
      Math.min(gridX, gridSize - draggedSquare.size)
    );
    const boundedY = Math.max(
      0,
      Math.min(gridY, gridSize - draggedSquare.size)
    );

    const position = { x: boundedX, y: boundedY };
    const legal = isPositionLegal(position, draggedSquare, placedSquares);

    setHoverPosition(position);
    setIsLegalPosition(legal);
  };

  const handleDragLeave = () => {
    setHoverPosition(null);
    setIsLegalPosition(true);
  };

  const handleDropOnGrid = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedSquare || !hoverPosition) return;

    // Only place if position is legal
    if (isLegalPosition) {
      onPlaceSquare(draggedSquare.id, hoverPosition.x, hoverPosition.y);
    }

    setDraggedSquare(null);
    setHoverPosition(null);
    setIsLegalPosition(true);
    setWasPlaced(false);
  };

  const handleDropOnBank = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggedSquare) return;

    setDraggedSquare(null);
    setHoverPosition(null);
    setIsLegalPosition(true);
    setWasPlaced(false);
  };

  const handleDragEnd = (draggedSquareState: Square | null) => {
    if (
      wasPlaced &&
      draggedSquareState &&
      draggedSquareState.placed &&
      draggedSquareState.x >= 0
    ) {
      onPlaceSquare(
        draggedSquareState.id,
        draggedSquareState.x,
        draggedSquareState.y
      );
    }
    setDraggedSquare(null);
    setHoverPosition(null);
    setIsLegalPosition(true);
    setWasPlaced(false);
  };

  return {
    draggedSquare,
    hoverPosition,
    isLegalPosition,
    handleDragStart,
    handlePlacedSquareDragStart,
    handleDragOver,
    handleDragLeave,
    handleDropOnGrid,
    handleDropOnBank,
    handleDragEnd,
  };
};
