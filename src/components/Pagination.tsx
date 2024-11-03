import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-end mt-4 px-2 py-3">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">
          {currentPage} - {totalPages} / {totalPages}
        </span>
        <div className="flex items-center">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="p-1 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
