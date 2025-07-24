import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PaginatorProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Paginator({ currentPage, total, limit, onPageChange, className }: PaginatorProps) {
  const totalPages = Math.ceil(total / limit);
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const endPage = Math.min(totalPages, startPage + 4);
  const pageNumbers = [];
  for (let p = startPage; p <= endPage; p++) {
    pageNumbers.push(p);
  }

  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent className="bg-transparent">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer text-[#e0e0ff] bg-transparent border border-[#4b3fdd]/30"}
          />
        </PaginationItem>
        {/* Show first page */}
        {currentPage > 3 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)} className="text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-black rounded-full">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="text-[#e0e0ff]" />
            </PaginationItem>
          </>
        )}
        {/* Main page range */}
        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={page === currentPage}
              className={
                (page === currentPage
                  ? "bg-white text-[#2c2840] border border-[#4b3fdd]"
                  : "text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white") +
                " rounded-full px-3 py-1 font-semibold transition-all"
              }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* Show last page */}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis className="text-[#e0e0ff]" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)} className="text-[#e0e0ff] hover:bg-[#4b3fdd] hover:text-white rounded-full">
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer text-[#e0e0ff] hover:text-black bg-transparent border border-[#4b3fdd]/30"} 
          />  
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
} 