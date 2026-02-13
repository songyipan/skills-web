import { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";

interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function PaginationNav({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 7,
}: PaginationNavProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const paginationItems = useMemo(() => {
    const items: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      const showEllipsisStart = currentPage > 3;
      const showEllipsisEnd = currentPage < totalPages - 2;

      if (showEllipsisStart) {
        items.push("ellipsis-start");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(i);
      }

      if (showEllipsisEnd) {
        items.push("ellipsis-end");
      }

      items.push(totalPages);
    }

    return items;
  }, [currentPage, totalPages, maxVisiblePages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {paginationItems.map((item, index) => (
          <PaginationItem key={index}>
            {item === "ellipsis-start" || item === "ellipsis-end" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(item as number)}
                isActive={currentPage === item}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
