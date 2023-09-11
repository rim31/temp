import React from "react";

export default function Pagination(props) {
  const { currentPage, totalPages } = props;
  return (
    <div className="pagination">
      <button
        className="button"
        onClick={() => props.goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Page précédente
      </button>
      {currentPage} / {totalPages} pages
      <button
        className="button"
        onClick={() => props.goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Page suivante
      </button>
    </div>
  );
}
