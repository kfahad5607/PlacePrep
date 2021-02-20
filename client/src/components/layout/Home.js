import React, { useState } from "react";
import Navbar from "./Navbar";
import "../mainview/styles.css";
import SideBar from "../sidebar/SideBar";
import MainView from "../mainview/MainView";
import UserProfile from "../auth/UserProfile";
import CreateQuiz from "../quiz/CreateQuiz";
import Coding from "../coding/Coding";
import CodeQuestions from "../coding/CodeQuestions";
import CreateCodeQuestion from "../code/CreateCodeQues";
import QuizCard from "../quiz/QuizCard";
import QuizPage from "../quiz/QuizPage";
import { Route, Switch } from "react-router-dom";

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebarBtn = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar onClick={ () => toggleSidebarBtn()}/>
            <div style={{ display: "flex", height: "100vh" }}>
                <SideBar sidebarOpen={sidebarOpen} onClick={ () => toggleSidebarBtn()}/>
                <div className="mainview-container">
                    <Switch>
                        <Route path="/me" component={UserProfile} />
                        <Route path="/createQuiz" component={CreateQuiz} />
                        <Route path="/code/:id" component={Coding} />
                        <Route
                            path="/codeQuestions"
                            component={CodeQuestions}
                        />
                        <Route
                            path="/createCodeQuestion"
                            component={CreateCodeQuestion}
                        />
                        <Route
                            path="/editCodeQuestion/:id"
                            component={CreateCodeQuestion}
                        />
                        <Route path="/quizzes" component={QuizCard} />
                        <Route path="/quiz" component={QuizPage} />
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default Home;
