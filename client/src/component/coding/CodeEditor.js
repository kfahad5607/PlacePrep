import React, { Fragment, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/material.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/ayu-mirage.css"
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/scroll/simplescrollbars.css"
import "codemirror/addon/scroll/simplescrollbars"
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";

// require("codemirror/addon/scroll/simplescrollbars.js");

const CodeEditor = () => {
    const [editorSelect, setEditorSelect] = useState({
        lang: "text/x-csrc",
        theme: "material",
        mime: "text/x-csrc",
    });
    const [code, setCode] = useState("");
    const handleOnChange = (e) => {
        let selectedMime = e.target.selectedOptions[0].getAttribute(
            "data-mime"
        );
        setEditorSelect({
            ...editorSelect,
            [e.target.name]: e.target.value,
            mime: selectedMime,
        });
    };
    let options = {
        lineNumbers: true,
        mode: editorSelect.lang,
        theme: editorSelect.theme,
        mime: editorSelect.mime,
        styleActiveLine: true,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        scrollbarStyle: 'overlay'
    };

    // const handleOnBeforeChangeCode = (editor, data, value) => {
    //     setCode(value)

    // }

    const handleOnChangeCode = (editor, data, newCode) => {
        setCode(newCode);
    };

    const handleOnClick = (e) => {
        if (e.target.value === "resetCode") {
            setCode("");
        }
    };
    return (
        <Fragment>
            <div className="head">
                <Form inline className="editor-option-form">
                    <Form.Control
                        as="select"
                        name="lang"
                        className="mr-sm-2 editor-select"
                        onChange={handleOnChange}
                    >
                        <option value="text/x-csrc" data-mime="text/x-csrc">
                            C
                        </option>
                        <option value="text/x-c++src" data-mime="text/x-c++src">
                            C++
                        </option>
                        <option value="text/x-java" data-mime="text/x-java">
                            Java
                        </option>
                        <option value="text/x-python" data-mime="text/x-python">
                            Python
                        </option>
                    </Form.Control>
                    <Form.Control
                        as="select"
                        name="theme"
                        className="mr-sm-2 editor-select"
                        onChange={handleOnChange}
                    >
                        <option value="material">Material</option>
                        <option value="ayu-mirage">Ayu Mirage</option>
                        <option value="base16-light">light</option>
                        <option value="blackboard">Blackboard</option>
                        <option value="eclipse">Eclipse</option>
                    </Form.Control>
                </Form>
            </div>
            <CodeMirror
                value={code}
                options={options}
                autoFocus={true}
                onBeforeChange={handleOnChangeCode}
                onChange={handleOnChangeCode}
            />
            <div className="editor-controls">
                <div>
                    <Button
                        className="button reset-code-btn"
                        value="resetCode"
                        onClick={handleOnClick}
                    >
                        <i className="fa fa-undo" aria-hidden="true"></i>
                        Reset Code
                    </Button>
                </div>
                <div className="editor-actions">
                    <Button className="button run-code-btn">
                        <i className="fa fa-play" aria-hidden="true"></i>
                        <span>Run Code</span>
                    </Button>
                    <Button className="button submit-code-btn">Submit</Button>
                </div>
            </div>
            <div className="console-container">
                <pre>
                    <Alert variant='success'>
                        Run Code Result: Success!
                    </Alert>
                </pre>
            </div>
        </Fragment>
    );
};

export default CodeEditor;
