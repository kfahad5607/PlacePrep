import React, { useEffect, Fragment, useState, useRef } from 'react';
import "../../code/CodeQuestDisp.css";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import QuizSubTabRow from './QuizSubTabRow';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import _ from 'lodash';
import Pagination from '../../code/Pagination';
import paginate from '../../code/paginate';
import {
    getQuizSubmissions,
    getQuizSubmission,
    filterQuizSubmissions,
    clearFilterQuizSub
} from '../../../store/actions/quizActions';

const QuizSubmissions = (props) => {
    const { auth: { user },
        quiz: { submissions, filteredSubmissions },
        getQuizSubmissions,
        filterQuizSubmissions,
        clearFilterQuizSub,
        match } = props;

    const text = useRef('');

    const [pageDetails, setPageDetails] = useState({
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: "submittedAt", order: "asc" },
    });
    const { pageSize, currentPage, sortColumn } = pageDetails;


    const { quizId } = match.params;

    useEffect(() => {
        if (user?.role === 'student') {
            getQuizSubmissions({ user: user._id });
        }
        else if (user?.role === 'faculty') {
            getQuizSubmissions({ quiz: quizId });
        }
        return () => {
        };

        // eslint-disable-next-line
    }, [user]);

    if (submissions !== null && submissions.length === 0) {
        return <h4 className="text-center mt-3"> Currently There are No Quiz Submissions.</h4>;
    }

    const handleFilterChange = (e) => {
        if (text.current.value !== "") {
            filterQuizSubmissions(e.target.value, user?.role === 'student' ? true : false);
        } else {
            clearFilterQuizSub();
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

    const filteredSub = filteredSubmissions ? filteredSubmissions : submissions;

    const sortedSub = _.orderBy(
        filteredSub,
        [
            function (item) {
                if (sortColumn.path === "score") {
                    return item.score;
                }
                else if (sortColumn.path === 'name') {
                    return item.user.name;
                }
                else if (sortColumn.path === 'submittedAt') {
                    return new Date(item.createdAt).getTime();
                }
                else if (sortColumn.path === 'timeTaken') {
                    let min = item.timeTaken.minutes;
                    let sec = item.timeTaken.seconds;
                    let totTimeInSec = (min * 60) + sec;
                    return totTimeInSec;
                }
                else if (sortColumn.path === 'title') {
                    return item.quiz.title;
                }
                else {
                    return item.user.name.toLowerCase();
                };

            },
        ],
        [sortColumn.order]
    );

    const newSubmissions = paginate(sortedSub, currentPage, pageSize);
    // const subNumber = _.range(1, newSubmissions.length + 1);


    return (
        <Fragment>

            {submissions !== null ? (<Container className="container-codeQuest">
                <h3 className="text-center  mb-2 pt-4 ">
                    Quiz Submissions
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
                                        placeholder="Search submissions"
                                        onChange={handleFilterChange}
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
                                    <th scope="col" onClick={() => handleSort(`${user?.role === 'student' ? 'title' : 'name'}`)}>{user?.role === 'student' ? 'Title' : 'Name'}</th>
                                    <th scope="col" onClick={() => handleSort("submittedAt")} >Submitted At</th>
                                    <th scope="col" onClick={() => handleSort("timeTaken")} >Time Taken</th>
                                    <th scope="col" onClick={() => handleSort("score")} >Score</th>
                                    {(user?.role === 'faculty' || user?.role === 'admin') && <th scope="col">Operation</th>}
                                </tr>
                            </thead>
                            <tbody className="tbodyCode">
                                {/* {submissions.map((ele, index) => <QuizSubTabRow key={ele._id} name={ele.user.name} eleObj={ele} idx={index} />)} */}
                                {newSubmissions.map((ele, index) => <QuizSubTabRow key={ele._id} name={ele.user.name} eleObj={ele} idx={index} />)}

                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="ml-3 ">
                            <Form>
                                <Form.Group controlId="SelectRowsPerpage">
                                    <Form.Control
                                        as="select"
                                        className="dispCode-inputFiled rowsPerPg"
                                        value={pageSize}
                                        onChange={handleOnChange}
                                    >
                                        <option value={10} className="optionSelect">
                                            10
                                </option>
                                        <option value={25} className="optionSelect">
                                            25
                                </option>
                                        <option value={50} className="optionSelect">
                                            50
                                </option>
                                        <option value={100} className="optionSelect">
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
                            itemCounts={filteredSub.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />

                        <div className=" paginatt ">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination nav2">
                                    <li className="">
                                        <i
                                            className="page-link cursor-pointer"
                                            aria-label="Previous"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pagntColor"
                                            >
                                                &laquo;
                                    </span>
                                        </i>
                                    </li>
                                    <li className=" ">
                                        <a
                                            className="page-link pagntColor"
                                            href="#1"
                                        >
                                            1
                                </a>
                                    </li>
                                    <li className="active">
                                        <a
                                            className="page-link pagntColor "
                                            href="#2"
                                        >
                                            2
                                </a>
                                    </li>
                                    <li className=" ">
                                        <a
                                            className="page-link pagntColor "
                                            href="#3"
                                        >
                                            3
                                </a>
                                    </li>
                                    <li className="">
                                        <i
                                            className="page-link cursor-pointer"
                                            aria-label="Next"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="pagntColor"
                                            >
                                                &raquo;
                                    </span>
                                        </i>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </Container>) :
                (
                    <Spinner />
                )
            }
        </Fragment >
    );
};

const mapStateToProps = (state) => ({
    quiz: state.quiz,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getQuizSubmissions,
    getQuizSubmission,
    filterQuizSubmissions,
    clearFilterQuizSub,
})(QuizSubmissions);
