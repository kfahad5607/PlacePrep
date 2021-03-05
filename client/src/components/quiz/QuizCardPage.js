import React, { useEffect } from "react";
import QuizCard from "./QuizCard";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQuizzes } from "../../store/actions/quizActions";

const QuizCardPage = (props) => {
	const {
		auth: { user },
		quiz: { quizzes, loading: quizLoading },
		getQuizzes,
	} = props;

	useEffect(() => {
		if (user?.role === "faculty" || user?.role === "admin") {
			getQuizzes();
		}
		else if (user?.role === "student") {
			getQuizzes();
		}
		return () => { };

	}, []);

	const createLink = (
		<Link to="/createQuiz" className="btn btn-primary create-btn">
			<i className="fa fa-plus" aria-hidden="true"></i>
			Create
		</Link>
	);


	if (quizzes !== null && quizzes.length === 0) {
		return (
			<div>
				{user.role === "admin" || user.role === "faculty" ? (
					<h4>
						Currently There are No Quizzes Available. Instead create one{" "}
						{createLink}
					</h4>
				) : (
						<h4>Currently There are No Quizzes Available.</h4>
					)}
			</div>
		);
	}

	return (
		<>
			{(user.role === "admin" || user.role === "faculty") && (
				<div className="create-quiz-row">{createLink}</div>
			)}
			{quizzes ? (
				quizzes.map((ele) => <QuizCard key={ele._id} quizObj={ele} />)
			) : (
					<Spinner />
				)}
		</>
	);
};

const mapStateToProps = (state) => ({
	quiz: state.quiz,
	auth: state.auth,
});

export default connect(mapStateToProps, { getQuizzes })(QuizCardPage);
