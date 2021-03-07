import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCodeSubmission } from '../../../store/actions/codeActions';

const CodeSubTabRow = (props) => {
    const { auth: { user },
        eleObj, idx, name, deleteCodeSubmission } = props;

    return (
        <tr>
            <th scope="row" >{idx + 1}</th>
            {(user.role === 'faculty' || user.role === 'admin') ?
                <td ><Link className="questTitle" to={`/codeSubmission/${eleObj._id}`}>{name}</Link></td>
                :
                <td ><Link className="questTitle" to={`/codeSubmission/${eleObj._id}`}>{eleObj.question.title}</Link></td>
            }
            <td ><span>{new Date(eleObj.createdAt).toLocaleString('en-us', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span></td>
            <td>{eleObj.language}</td>
            <td >
                {eleObj.status === "Accepted" && (
                    <span className="subStatus badge badgeSuccess ">
                        {eleObj.status}
                    </span>
                )}
                {eleObj.status === "Not Accepted" && (
                    <span className="subStatus badge badgeWarning ">
                        {eleObj.status}
                    </span>
                )}
                {(eleObj.status === "Compile-time Error" || eleObj.status === "Runtime Error") && (
                    <span className="subStatus badge badgeDanger ">
                        {eleObj.status}
                    </span>
                )}
            </td>
            {user.role === 'student' && <td >
                <span className='pl-4' style={{ cursor: 'pointer' }} onClick={() => deleteCodeSubmission(eleObj._id)} >
                    <i className="fa fa-trash operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                </span></td>}
        </tr>
    );
};

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        code: state.code
    });
};

export default connect(mapStateToProps, { deleteCodeSubmission })(CodeSubTabRow);
