import React, { useState, useEffect, Fragment } from "react";
import "./Coding.css";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import CodeDescription from "./CodeDescription";
import CodingSolution from "./CodingSolution";
import CodeEditor from "./CodeEditor";
import {useParams} from "react-router-dom"
import { connect } from "react-redux";
import { getQuestion } from "../../store/actions/codeActions";
import Spinner from '../layout/Spinner'

const Coding = (props) => {

    const { getQuestion } = props;
    const { current } = props.code
    const {slug} = useParams()

    useEffect(() => {
        getQuestion(slug)
    }, [])

    const [key, setKey] = useState("description");
    
    return (
        <Fragment>
        { current !== null ?
        <Row className="coding-container">
            <Col>
                <Tabs className='navTabs' activeKey={key} onSelect={(e) => setKey(e)}>
                    <Tab eventKey="description" title={<span><i className="fa fa-list-alt" aria-hidden="true"></i>Description</span>}>
                        <CodeDescription current={current}/>
                    </Tab>
                    {/* {current.solution &&} */}
                    <Tab eventKey="solution" title={<span><i className="fa fa-flask" aria-hidden="true"></i>Solution</span>}>
                        <CodingSolution current={current}/>
                    </Tab>
                </Tabs>
            </Col>
            <Col className="editor-container">
                <CodeEditor/>
            </Col>
        </Row> : <Spinner /> }
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    code: state.code
});

export default connect(mapStateToProps,{ getQuestion})(Coding);