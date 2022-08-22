import React from "react";
import { DOTS, usePagination } from "../../hooks/CustomPagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex max-w-5xl m-auto text-2xl justify-center">
      <h4
        onClick={onPrevious}
        className="text-4xl cursor-pointer flex justify-center text-center "
      >
        &lt;
      </h4>
      <li onClick={onPrevious}>
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, ind) => {
        if (pageNumber === DOTS) {
          return <li key={ind}>&#8230;</li>;
        }

        return (
          <li
            className="bg-gray-400 mx-2 rounded-md px-4 py-2 cursor-pointer"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <h4
        onClick={onNext}
        className="text-4xl cursor-pointer flex justify-center text-center "
      >
        &gt;
      </h4>
      <li onClick={onNext}>
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
