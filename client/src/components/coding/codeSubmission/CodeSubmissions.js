import React, { useEffect, Fragment, useState, useRef } from 'react';
import "../../code/CodeQuestDisp.css";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import CodeSubTabRow from './CodeSubTabRow';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import _ from 'lodash';
import Pagination from '../../code/Pagination';
import paginate from '../../code/paginate';
import {
    getCodeSubmissions,
    filterCodeSubmissions,
    clearFilterCodeSub,
} from '../../../store/actions/codeActions';

const CodeSubmissions = (props) => {
    const { auth: { user },
        code: { submissions, filteredSubmissions },
        getCodeSubmissions,
        filterCodeSubmissions,
        clearFilterCodeSub,
        match } = props;

    const text = useRef('');

    const [pageDetails, setPageDetails] = useState({
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: "submittedAt", order: "asc" },
    });
    const { pageSize, currentPage, sortColumn } = pageDetails;


    const { codeId } = match.params;

    useEffect(() => {
        if (user?.role === 'student') {
            getCodeSubmissions({ user: user._id });
        }
        else if (user?.role === 'faculty') {
            getCodeSubmissions({ code: codeId });
        }
        return () => {
        };
    }, [user]);

    if (submissions !== null && submissions.length === 0) {
        return <h4>Currently There are No Code Submissions.</h4>;
    }

    const handleFilterChange = (e) => {
        if (text.current.value !== "") {
            filterCodeSubmissions(e.target.value, user?.role === 'student' ? true : false);
        } else {
            clearFilterCodeSub();
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
                if (sortColumn.path === "status") {
                    return item.status;
                }
                else if (sortColumn.path === 'name') {
                    return item.user.name;
                }
                else if (sortColumn.path === 'submittedAt') {
                    return new Date(item.createdAt).getTime();
                }
                else if (sortColumn.path === 'language') {
                    return item.language;
                }
                else if (sortColumn.path === 'title') {
                    return item.question.title;
                }
                else {
                    return item.user.name.toLowerCase();
                };

            },
        ],
        [sortColumn.order]
    );

    const newSubmissions = paginate(sortedSub, currentPage, pageSize);
    const subNumber = _.range(1, newSubmissions.length + 1);


    return (
        <Fragment>

            {submissions !== null ? (<Container className="container-codeQuest">
                <h3 className="text-center  mb-2 pt-4 ">
                    Code Submissions
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
                        <table className="table  ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" onClick={() => handleSort(`${user?.role === 'student' ? 'title' : 'name'}`)}>{user?.role === 'student' ? 'Title' : 'Name'}</th>
                                    <th scope="col" onClick={() => handleSort("submittedAt")} >Submitted At</th>
                                    <th scope="col" onClick={() => handleSort("language")} >Language</th>
                                    <th scope="col" onClick={() => handleSort("status")} >Status</th>
                                    {user?.role === 'student' && <th scope="col">Operation</th>}
                                </tr>
                            </thead>
                            <tbody className="tbodyCode">
                                {/* {submissions.map((ele, index) => <QuizSubTabRow key={ele._id} name={ele.user.name} eleObj={ele} idx={index} />)} */}
                                {newSubmissions.map((ele, index) => <CodeSubTabRow key={ele._id} name={ele.user.name} eleObj={ele} idx={index} />)}
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
                    </div>
                </div>
            </Container>) :
                (
                    <Spinner />
                )
            }
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    code: state.code,
    auth: state.auth
});

export default connect(mapStateToProps, {
    getCodeSubmissions,
    filterCodeSubmissions,
    clearFilterCodeSub
})(CodeSubmissions);
