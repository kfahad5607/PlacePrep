import React, { Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import PracticeQuizOption from './PracticeQuizOption';
import ViewAnswer from './ViewAnswer';
import { Link } from 'react-router-dom';
import '../quiz/quiz.css';
import { connect } from 'react-redux';
import { deletePracticeProblem } from '../../store/actions/practiceProblemActions';

const PracticeQuizQues = (props) => {
    const { auth: { user }, deletePracticeProblem } = props;

    return props.questions.map((ele, index) => {
        return (
            <Fragment key={index}>
                <Accordion className='my-2'>
                    <Card>
                        {(user.role === 'faculty' || user.role === 'admin') && <div style={{ margin: 'auto' }} >
                            <Link to={`/editpracticeproblem/${ele._id}`}>
                                <i className="fa fa-pencil-square operation-E mr-3 op" aria-hidden="true" ></i>
                            </Link>
                            <span onClick={() => deletePracticeProblem(ele._id)} style={{ cursor: 'pointer' }} >
                                <i className="fa fa-trash operation-D mr-3 mt-1 op" aria-hidden="true" ></i>
                            </span>
                        </div>}
                        <Card.Body>
                            <Card.Title>
                                {`${index + 1}.`} {ele.question}
                            </Card.Title>
                            {ele.answers.map((ansEle, ansIdx) => <PracticeQuizOption
                                key={ansIdx}
                                text={ansEle}
                                isCorrect={ansEle === ele.correctAnswer ? true : false} />)}

                            <ViewAnswer eKey='0' correctOption={ele.correctAnswer} />
                        </Card.Body>
                    </Card>
                </Accordion>
            </Fragment>
        );
    });

};

const mapstateToProps = state => ({
    auth: state.auth,
    practiceProblem: state.practiceProblem
});

export default connect(mapstateToProps, { deletePracticeProblem })(PracticeQuizQues);