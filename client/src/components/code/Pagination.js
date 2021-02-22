import React from "react";
import _ from "lodash";

const Pagination = (props) => {
    const { itemCounts, pageSize, currentPage, onPageChange } = props;
    const pageCounts = Math.ceil(itemCounts / pageSize);
    if (pageCounts === 1) return null;
    const pages = _.range(1, pageCounts + 1);

    return (
        <div className=" paginatt ">
            <nav aria-label="Page navigation example">
                <ul className="pagination nav2">
                    {pages.map((page) => (
                        <li
                            className=" "
                            key={page}
                            className={currentPage === page ? "active" : " "}
                        >
                            <a
                                className="page-link pagntColor"
                                style={{ cursor: 'pointer' }}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
