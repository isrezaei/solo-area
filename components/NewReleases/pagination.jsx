import {HStack} from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import {
    active,
    breakClassName,
    breakLinkClassName, next,
    page,
    pageLink,
    pagination,
    previous
} from "../Sidebar/PaginationStyle";

const Pagination = ({handlePageClick}) => {
    return (
        <HStack >
            <ReactPaginate
                onPageChange={handlePageClick}
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
        </HStack>
    );
};

export default Pagination;