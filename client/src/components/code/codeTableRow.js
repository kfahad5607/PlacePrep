import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteQuestion } from "../../store/actions/codeActions";

const codeTableRow = ({ question, id, user, deleteQuestion }) => {
    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>
                <Link className="questTitle" to={`/code/${question._id}`}>
                {capitalize(question.title)}
                </Link>
            </td>
            <td className="">
                <span>
                    <a
                        className="fa fa-book questSol"
                        aria-hidden="true"
                        href="#"
                    ></a>
                </span>
            </td>
            <td className="">
                {question.difficulty === "easy" && (
                    <span className=" diffMod badge badgeSuccess ">
                        {capitalize(question.difficulty)}
                    </span>
                )}
                {question.difficulty === "medium" && (
                    <span className=" diffMod badge badgeWarning ">
                        {capitalize(question.difficulty)}
                    </span>
                )}
                {question.difficulty === "hard" && (
                    <span className=" diffMod badge badgeDanger ">
                        {capitalize(question.difficulty)}
                    </span>
                )}
            </td>
            <td>53.4 %</td>
            {/* {user.role === 'faculty' &&  */}
            <td>
                <span>
                    <Link
                        className="fa fa-pencil-square operation-E mr-3 "
                        aria-hidden="true"
                        to={`/editCodeQuestion/${question._id}`}
                    ></Link>
                </span>
                <span>
                    <a
                        className="fa fa-trash operation-D"
                        aria-hidden="true"
                        href="#"
                        onClick={() => deleteQuestion(question._id)}
                    ></a>
                </span>
            </td>
            {/* } */}
        </tr>
    );
};

export default connect(null, { deleteQuestion })(codeTableRow);
