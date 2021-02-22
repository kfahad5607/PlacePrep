import React, { useEffect } from 'react';
import AptiTopicsTemplate from './AptiTopicsTemplate';
import { connect } from 'react-redux';
import { getCategoryAndTopic } from '../../store/actions/practiceProblemActions';


const PracticeProblem = (props) => {
    const { practiceProblem: { catAndTopic }, getCategoryAndTopic } = props;

    useEffect(() => {
        getCategoryAndTopic();
    }, []);

    return (
        <div>
            {catAndTopic ?
                <>
                    { catAndTopic.distinctCategory.map((ele, index) => <AptiTopicsTemplate
                        key={index}
                        title={ele}
                        topics= {catAndTopic.distinctTopicByCat[index]}
                    />)}
                </>
                : <h3>Loading...</h3>}
        </div>
    );
};

const mapStateToProps = state => ({
    practiceProblem: state.practiceProblem
});

export default connect(mapStateToProps, { getCategoryAndTopic })(PracticeProblem);