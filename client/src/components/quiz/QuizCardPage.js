import React, { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import Spinner from "../layout/Spinner";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQuizzes, filterQuizzes, clearFilterQuizzes } from "../../store/actions/quizActions";

const QuizCardPage = (props) => {
	const {
		auth: { user },
		quiz: { quizzes, filtered },
		getQuizzes,
		filterQuizzes,
		clearFilterQuizzes
	} = props;

	useEffect(() => {
		getQuizzes();
		return () => { };

		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (filtered === null) {
			setQuery('');
			clearFilterQuizzes();
		}
		//eslint-disable-next-line
	}, [filtered]);

	const [query, setQuery] = useState('');

	const handleOnChange = (e) => {
		setQuery(e.target.value);

		if (e.target.value !== "") {
			filterQuizzes(e.target.value);
		}
		else {
			clearFilterQuizzes();
		}
	};

	const createLink = (
		<Link to="/createQuiz" className="btn btn-primary create-btn">
			<i className="fa fa-plus" aria-hidden="true"></i>
			Create
		</Link>
	);


	if (quizzes !== null && quizzes.length === 0) {
		return (
			<div className="text-center mt-3">
				{user.role === "admin" || user.role === "faculty" ? (
					<>
						<h4>
							Currently There are No Quizzes Available. Instead create one{" "}
						</h4>
						{createLink}
					</>
				) : (
					<h4>Currently There are No Quizzes Available.</h4>
				)}
			</div>
		);
	}

	const filteredQuizzes = filtered ? filtered : quizzes;

	return (
		<>
			{/* <div className="row mt-3 ml-3 mr-3 text-center"> */}
			<div className="row mt-3 ml-3 mr-3 text-center" style={{ marginRight: "0px" }}>
				<div
					className={`${user.role === "admin" || user.role === "faculty"
						? "col-xl-10"
						: "col-xl-12"
						} pb-2`}
				>
					<Form>
						<Form.Group controlId="codingquestionSearch">
							<Form.Control
								className="bgWhite "
								type="text"
								value={query}
								placeholder="Search quiz titles, topics or category"
								onChange={handleOnChange}
							/>
						</Form.Group>
					</Form>
				</div>
				{(user.role === "admin" || user.role === "faculty") && (
					<div className="col-xl-2 pb-2" >{createLink}</div>
				)}
			</div>
			{quizzes ? (
				filteredQuizzes.map((ele) => <QuizCard key={ele._id} quizObj={ele} />)
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

export default connect(mapStateToProps, { getQuizzes, filterQuizzes, clearFilterQuizzes })(QuizCardPage);
