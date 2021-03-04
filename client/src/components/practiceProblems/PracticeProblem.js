import React, { useEffect } from 'react';
import AptiTopicsTemplate from './AptiTopicsTemplate';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getCategoryAndTopic } from '../../store/actions/practiceProblemActions';


const PracticeProblem = (props) => {
    const { auth: { user }, practiceProblem: { catAndTopic }, getCategoryAndTopic } = props;

    useEffect(() => {
        getCategoryAndTopic();
    }, []);

    const createLink = (
		<Link to="/addTopic" className="btn btn-primary create-btn">
			<i class="fa fa-plus" aria-hidden="true"></i>
			Create
		</Link>
	);

    return (
        <div>
            {(user.role === "admin" || user.role === "faculty") && (
				<div className="create-quiz-row">{createLink}</div>
			)}
            {catAndTopic ?
                <>
                    { catAndTopic.distinctCategory.map((ele, index) => <AptiTopicsTemplate
                        key={index}
                        title={ele}
                        topics={catAndTopic.distinctTopicByCat[index]}
                    />)}
                </>
                : <Spinner />}
        </div>
    );
};

const mapStateToProps = state => ({
    practiceProblem: state.practiceProblem,
    auth: state.auth
});

export default connect(mapStateToProps, { getCategoryAndTopic })(PracticeProblem);