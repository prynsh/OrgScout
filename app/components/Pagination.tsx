import React from "react";
import { PaginationProps } from "../types/types";



export default function Pagination({ page, setPage }: PaginationProps) {
  const totalPages = 41;

  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
      <button
        key="prev"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="px-2 md:px-4 py-1 md:py-2 rounded-md bg-[#e3c7b6] text-black text-sm md:text-base border border-[#d6b5a0] hover:bg-[#d6b5a0] disabled:opacity-50"
      >
        Previous
      </button>
    );

    pageNumbers.push(
      <button
        key={1}
        onClick={() => setPage(1)}
        className={`w-6 h-6 md:w-8 md:h-8 text-sm md:text-base rounded-md flex items-center justify-center ${
          page === 1
            ? "bg-white border-2 border-[#d6b5a0] text-black"
            : "bg-[#e3c7b6] text-black border border-[#d6b5a0] hover:bg-[#d6b5a0]"
        }`}
      >
        1
      </button>
    );

    if (page > 3) {
      pageNumbers.push(
        <span key="ellipsis1" className="px-1 md:px-2 flex items-center">
          ...
        </span>
      );
    }

    let startPage = Math.max(2, page - 2);
    let endPage = Math.min(totalPages - 1, page + 2);

    if (page <= 3) {
      startPage = 2;
      endPage = Math.min(6, totalPages - 1);
    } else if (page >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 5);
      endPage = totalPages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`w-6 h-6 md:w-8 md:h-8 text-sm md:text-base rounded-md flex items-center justify-center ${
            page === i
              ? "bg-white border-2 border-[#d6b5a0] text-black"
              : "bg-[#e3c7b6] text-black border border-[#d6b5a0] hover:bg-[#d6b5a0]"
          }`}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages - 3) {
      pageNumbers.push(
        <span key="ellipsis2" className="px-1 md:px-2 flex items-center">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={`w-6 h-6 md:w-8 md:h-8 text-sm md:text-base rounded-md flex items-center justify-center ${
            page === totalPages
              ? "bg-white border-2 border-[#d6b5a0] text-black"
              : "bg-[#e3c7b6] text-black border border-[#d6b5a0] hover:bg-[#d6b5a0]"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    pageNumbers.push(
      <button
        key="next"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="px-2 md:px-4 py-1 md:py-2 rounded-md bg-[#e3c7b6] text-black text-sm md:text-base border border-[#d6b5a0] hover:bg-[#d6b5a0] disabled:opacity-50"
      >
        Next
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 p-2 md:p-4">
      {renderPageNumbers()}
    </div>
  );
}
