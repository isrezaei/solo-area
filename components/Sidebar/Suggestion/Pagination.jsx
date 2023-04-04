import React from 'react';
import ReactPaginate from "react-paginate";
import {
    active,
    breakClassName,
    breakLinkClassName,
    next,
    page,
    pageLink,
    pagination,
    previous
} from "../PaginationStyle";

const Pagination = ({handlePagination}) => {
    return (
        <ReactPaginate
            onPageChange={handlePagination}
            marginPagesDisplayed={0}
            pageRangeDisplayed={4}
            pageCount={10}
            breakLabel="..."
            breakClassName={breakClassName}
            breakLinkClassName={breakLinkClassName}
            containerClassName={pagination}
            pageClassName={page}
            pageLinkClassName={pageLink}
            activeClassName={active}
            previousClassName={previous}
            nextClassName={next}
            previousLinkClassName=""
            nextLinkClassName=""
            previousLabel=""
            nextLabel=""
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;