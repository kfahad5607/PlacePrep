import React, { useState, useEffect, Fragment } from "react";
import "../Coding.css";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import CodeDescription from "../CodeDescription";
import CodingSolution from "../CodingSolution";
import CodeEditorSub from "./CodeEditorSub";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getCodeSubmission } from "../../../store/actions/codeActions";
import Spinner from '../../layout/Spinner';

const CodingSub = (props) => {

    const { getCodeSubmission } = props;
    const { currentSubmission } = props.code;
    const { id } = useParams();

    useEffect(() => {
        getCodeSubmission(id);
    }, []);

    const [key, setKey] = useState("description");

    return (
        <Fragment>
            { currentSubmission !== null ?
                <Row className="coding-container">
                    <Col>
                        <Tabs className='navTabs' activeKey={key} onSelect={(e) => setKey(e)}>
                            <Tab eventKey="description" title={<span><i className="fa fa-list-alt" aria-hidden="true"></i>Description</span>}>
                                <CodeDescription current={currentSubmission.question} />
                            </Tab>
                            {/* {current.solution &&} */}
                            <Tab eventKey="solution" title={<span><i className="fa fa-flask" aria-hidden="true"></i>Solution</span>}>
                                <CodingSolution current={currentSubmission.question} />
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col className="editor-container">
                        <CodeEditorSub
                            key={currentSubmission.userSolution}
                            slugProp={currentSubmission.question.slug}
                            userSolution={currentSubmission.userSolution}
                            language={currentSubmission.language}
                            inputs={currentSubmission.question.noOfInputs}
                            quesId={currentSubmission.question._id} />
                    </Col>
                </Row> : <Spinner />}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    code: state.code
});

export default connect(mapStateToProps, { getCodeSubmission })(CodingSub);