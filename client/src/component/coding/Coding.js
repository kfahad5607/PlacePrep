import React, { useState } from "react";
import "./Coding.css";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import CodeDescription from "./CodeDescription";
import CodingSolution from "./CodingSolution";
import CodeEditor from "./CodeEditor";

const Coding = () => {
    const [key, setKey] = useState("description");
    
    return (
        <Row className="coding-container">
            <Col>
                <Tabs className='navTabs' activeKey={key} onSelect={(e) => setKey(e)}>
                    <Tab eventKey="description" title={<span><i class="fa fa-list-alt" aria-hidden="true"></i>Description</span>}>
                        <CodeDescription />
                    </Tab>
                    <Tab eventKey="solution" title={<span><i class="fa fa-flask" aria-hidden="true"></i>Solution</span>}>
                        <CodingSolution />
                    </Tab>
                </Tabs>
            </Col>
            <Col className="editor-container">
                <CodeEditor/>
            </Col>
        </Row>
    );
};

export default Coding;
