import type { MaxSize } from "../types/Square";

interface ControlsProps {
  maxSize: MaxSize;
  gridSize: number;
  onToggleMode: () => void;
  onReset: () => void;
}

export const Controls = ({
  maxSize,
  gridSize,
  onToggleMode,
  onReset,
}: ControlsProps) => {
  return (
    <div className="controls">
      <div className="grid-info">
        <strong>Mode:</strong> {maxSize}×{maxSize} squares → {gridSize}×
        {gridSize} grid
      </div>
      <button onClick={onToggleMode} className="grid-info">
        Switch to {maxSize === 8 ? "9×9" : "8×8"} Mode
      </button>
      <button onClick={onReset} className="grid-info">Reset</button>
    </div>
  );
};
