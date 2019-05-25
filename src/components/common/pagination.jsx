import React from "react";
import PropTypes from 'prop-types'
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
  const pagesCount = itemsCount / pageSize;
  if (pagesCount <= 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Pagination guide">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={
              page === currentPage ? "page-item disabled " : "page-item"
            }
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <button className="btn btn-sm btn-outline-success">CurrentPage: {currentPage}</button> 
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;
