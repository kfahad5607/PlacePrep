import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteQuestion } from "../../store/actions/codeActions";

const CodeTableRow = ({ auth: { user }, question, id, deleteQuestion }) => {
    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>
                <Link className="questTitle" to={`/code/${question.slug}`}>
                    {capitalize(question.title)}
                </Link>
            </td>
            <td className="">
                <span>
                    <a
                        className="fa fa-book questSol"
                        aria-hidden="true"
                        href="!#"
                    ></a>
                </span>
            </td>
            <td className="">
                {question.difficulty === "10" && (
                    <span className=" diffMod badge badgeSuccess ">
                        Easy
                    </span>
                )}
                {question.difficulty === "20" && (
                    <span className=" diffMod badge badgeWarning ">
                        Medium
                    </span>
                )}
                {question.difficulty === "30" && (
                    <span className=" diffMod badge badgeDanger ">
                        Hard
                    </span>
                )}
            </td>
            {user?.role === 'student' && <td>{question.author?.name}</td>}
            {(user.role === 'faculty' || user.role === 'admin') &&
                <td>
                    <Link to={`/codeSubmissions/${question._id}`} className='alert-link' style={{ color: '#775ecf' }} >
                        <i className="fa fa-chevron-circle-right operation-D ml-5 mt-1" aria-hidden="true" ></i>
                    </Link>
                </td>
            }

            {(user.role === 'faculty' || user.role === 'admin') && <td>
                <span>
                    <Link
                        className="fa fa-pencil-square operation-E mr-3 "
                        aria-hidden="true"
                        to={`/editCodeQuestion/${question.slug}`}
                    ></Link>
                </span>
                <span>
                    <a
                        className="fa fa-trash operation-D"
                        aria-hidden="true"
                        href="#!"
                        onClick={() => deleteQuestion(question._id)}
                    ></a>
                </span>
            </td>}
        </tr>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteQuestion })(CodeTableRow);
