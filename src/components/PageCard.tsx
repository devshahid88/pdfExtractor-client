import type { ReactNode } from "react";

interface Props {
  pageNumber: number;
  selected: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export default function PageCard({
  pageNumber,
  selected,
  onToggle,
  children,
}: Props) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer border-2 rounded-lg p-2 flex flex-col items-center transition-all ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="w-full overflow-hidden rounded bg-gray-100 mb-2 flex justify-center items-center min-h-[150px]">
        {children}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-4 h-4 text-blue-600"
        />
        <span className="font-medium text-gray-700">Page {pageNumber}</span>
      </div>
    </div>
  );
}
