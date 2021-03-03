import React, { useEffect, Fragment, useRef, useState } from "react";
import "./CodeQuestDisp.css";
import { Container, Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
    getQuestions,
    filterQuestions,
    clearFilter,
} from "../../store/actions/codeActions";
import CodeTableRow from "./codeTableRow";
import Spinner from "../layout/Spinner";
import Pagination from "./Pagination";
import paginate from "./paginate";
import _ from "lodash";

const CodeQuestions = (props) => {
    const { getQuestions, filterQuestions, clearFilter } = props;
    const { user } = props.auth;
    const { questions, filtered, loading } = props.code;

    const [pageDetails, setPageDetails] = useState({
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: "difficulty", order: "asc" },
    });
    const { pageSize, currentPage, sortColumn } = pageDetails;
    const text = useRef("");

    useEffect(() => {
        getQuestions();
        //     eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (filtered === null) {
            text.current = "";
            clearFilter();
        }
    }, [filtered]);

    const onchange = (e) => {
        if (text.current.value !== "") {
            filterQuestions(e.target.value);
        } else {
            clearFilter();
        }
    };

    const handlePageChange = (page) => {
        setPageDetails({ ...pageDetails, currentPage: page });
    };

    const handleOnChange = (e) => {
        setPageDetails({ ...pageDetails, pageSize: e.target.value });
    };

    const handleSort = (path) => {
        const sortColumn = { ...pageDetails.sortColumn };
        if (sortColumn.path === path)
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        setPageDetails({ ...pageDetails, sortColumn });
    };

    if (questions !== null && questions.length === 0) {
        return <h4>Currently There are No Question Available</h4>;
    }

    const filteredQsn = filtered !== null ? filtered : questions;

    const sortedQsn = _.orderBy(
        filteredQsn,
        [
            function (item) {
                if (sortColumn.path === "difficulty") return item.difficulty;
                else return item.title.toLowerCase();
            },
        ],
        [sortColumn.order]
    );

    const newQuestions = paginate(sortedQsn, currentPage, pageSize);
    const qsnNumber = _.range(1, newQuestions.length + 1);
    return (
        <Fragment>
            {questions !== null && !loading ? (
                <Container className="container-codeQuest">
                    <h3 className="text-center  mb-2 pt-4 ">
                        Coding Questions
                    </h3>
                    <div className="title-border mb-4">
                        <span></span>
                    </div>
                    <div className="displayQuest pb-2">
                        <div className="row">
                            <div className="col-12 pb-2">
                                <Form>
                                    <Form.Group controlId="codingquestionSearch">
                                        <Form.Control
                                            className=" codingQuestSearch"
                                            type="text"
                                            ref={text}
                                            placeholder="Search question titles, descriptions or ID"
                                            onChange={onchange}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>

                        <div className='table-responsive' >
                            <table className="table">

                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th
                                            scope="col"
                                            onClick={() => handleSort("title")}
                                        >
                                            Title
                                    </th>
                                        <th scope="col">Solution</th>
                                        <th
                                            scope="col"
                                            onClick={() => handleSort("difficulty")}
                                        >
                                            Difficulty
                                    </th>
                                        <th scope="col">{user?.role === 'student' ? 'Author' : 'Submissions'}</th>
                                        {(user?.role === 'faculty' || user?.role === 'admin') && <th scope="col">Operations</th>}
                                    </tr>
                                </thead>
                                <tbody className="tbodyCode">
                                    {newQuestions.map((question, index) => (
                                        <CodeTableRow
                                            question={question}
                                            key={index}
                                            id={qsnNumber[index]}
                                            user={user}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="ml-3 ">
                                <Form>
                                    <Form.Group controlId="SelectRowsPerpage">
                                        <Form.Control
                                            as="select"
                                            name="pageSize"
                                            className="dispCode-inputFiled rowsPerPg"
                                            value={pageSize}
                                            onChange={handleOnChange}
                                        >
                                            <option
                                                value={10}
                                                className="optionSelect"
                                            >
                                                10
                                            </option>
                                            <option
                                                value={25}
                                                className="optionSelect"
                                            >
                                                25
                                            </option>
                                            <option
                                                value={50}
                                                className="optionSelect"
                                            >
                                                50
                                            </option>
                                            <option
                                                value={100}
                                                className="optionSelect"
                                            >
                                                100
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </div>
                            <span className="labelRowsPerPg mt-2 col-4">
                                rows per page.
                            </span>

                            <Pagination
                                itemCounts={filteredQsn.length}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </Container>
            ) : (
                    <Spinner />
                )}
        </Fragment>
    );
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    code: state.code,
});

export default connect(mapStateToProps, {
    getQuestions,
    filterQuestions,
    clearFilter,
})(CodeQuestions);
