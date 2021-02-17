import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { deleteQuestion } from "../../store/actions/codeActions";

const codeTableRow = ({ question, id, user, deleteQuestion }) => {
    return (
        <tr>
            <th scope="row" >{id + 1}</th>
            <td ><Link className="questTitle" to={`/code/${question._id}`}>{question.title}</Link></td>
            <td className=""><span><a className="fa fa-book questSol" aria-hidden="true" href="#"></a></span></td>
            <td className=""><span className=" diffMod badge  ">{question.difficulty}</span></td>
            <td>53.4 %</td>
            {/* {user.role === 'faculty' &&  */}
            <td>
                <span>
                    <a className="fa fa-pencil-square operation-E mr-3 " aria-hidden="true" href="#"></a>
                </span>
                <span >
                    <a className="fa fa-trash operation-D" aria-hidden="true" href="#" onClick={() => deleteQuestion(question._id)}></a>
                </span>
            </td>
            {/* } */}
        </tr>
    )
}

export default connect(null, {deleteQuestion})(codeTableRow)
