import React, { useState } from "react";

function AdminPaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            tabIndex="-1"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            Previous
          </a>
        </li>
        <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
          <a className="page-link" href="#" onClick={() => handlePageClick(1)}>
            1
          </a>
        </li>
        <li className={`page-item ${currentPage === 2 ? "active" : ""}`}>
          <a className="page-link" href="#" onClick={() => handlePageClick(2)}>
            2
          </a>
        </li>
        <li className={`page-item ${currentPage === 2 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default AdminPaginationComponent;
