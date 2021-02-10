
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
// import QuizQues from './components/quiz/QuizQues';
// import QuizCard from './components/quiz/QuizCard';
// import QuizPage from './components/quiz/QuizPage';
// import SideBar from './components/sidebar/SideBar';
// import MainView from './components/mainview/MainView';
// import CreateQuiz from './components/quiz/CreateQuiz';
// import CreateCodeQues from './components/code/CreateCodeQues';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Coding from './components/coding/Coding';
import UserProfile from './components/auth/UserProfile'
import CodeQuestions from './components/coding/CodeQuestions'

const App = () => {
  {/* <div style={{ display: 'flex', height: '100vh' }}> */ }

  {/* </div> */ }
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/code" component={Coding} />
        <Route exact path="/me" component={UserProfile} />
        <Route exact path="/codeQuestions" component={CodeQuestions} />
      </Switch>
    </Router>
  );
};

export default App;
