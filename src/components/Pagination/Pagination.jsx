import { usePagination } from "../../hooks/usePagination";
import clsx from "clsx";

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  totalPageCount,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPageCount,
    onPageChange,
  });

  if (currentPage == 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={clsx("max-w-screen flex justify-center h-8 text-sm mt-15")}>
      {/* Left navigation arrow */}
      {currentPage != 1 && (
        <li
          className={clsx(
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight hover:border rounded-2xl mx-2 bg-transparent",
            "dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
            "text-gray-500 border-gray-300  hover:bg-gray-100 hover:text-gray-700"
          )}
          onClick={onPrevious}
          key={"LEFT"}
        >
          <span className="sr-only">Previous</span>
          <svg
            className="w-2.5 h-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </li>
      )}
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === "DOTS") {
          return (
            <li
              className={clsx(
                "flex items-center justify-center px-3 h-8 ms-0 leading-tight  mx-2 rounded-2xl",
                "dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                "text-gray-500  border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              )}
              key={"DOTS"}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={clsx(
              "flex items-center justify-center px-3 h-8 ms-0 leading-tight  hover:border  mx-2 rounded-2xl",
              "dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              "text-gray-700 border-gray-900 hover:bg-gray-300 hover:text-gray-900",
              currentPage == pageNumber &&
                "dark:bg-gray-700  bg-gray-300 border dark:text-white text-gray-700"
            )}
            onClick={() => onPageChange(pageNumber)}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      {currentPage != totalPageCount && (
        <li
          className={clsx(
            "flex items-center justify-center px-3 h-8 ms-0 leading-tight mx-2 bg-transparent rounded-2xl hover:border",
            "dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
            "text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          )}
          onClick={onNext}
          key={"right"}
        >
          <svg
            className="w-2.5 h-2.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </li>
      )}
    </ul>
  );
}
