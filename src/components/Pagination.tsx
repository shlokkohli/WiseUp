import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex my-5 justify-center">
      <button
        className="border p-2 border-r-0 rounded-l-md"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft/>
      </button>
      <span className="flex p-2 items-center border">
        {currentPage} / {totalPages}
      </span>
      <button
      className="border p-2 border-l-0 rounded-r-md"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleRight/>
      </button>
    </div>
  );
}