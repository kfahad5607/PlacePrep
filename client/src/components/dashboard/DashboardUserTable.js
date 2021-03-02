import React, { Fragment, useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Pagination from "../code/Pagination";
import paginate from "../code/paginate";
import _ from "lodash";
import { connect } from "react-redux";
import {
	filterUsers,
	clearUserFilter,
	deleteUser,
	updateUser,
} from "../../store/actions/authActions";

const DashboardUserTable = (props) => {
	const {
		auth: { user, allUsers, filteredUsers },
		filterUsers,
		clearUserFilter,
		updateUser,
		deleteUser,
	} = props;

	const [pageDetails, setPageDetails] = useState({
		pageSize: 10,
		currentPage: 1,
		sortColumn: { path: "difficulty", order: "asc" },
	});
	const { pageSize, currentPage, sortColumn } = pageDetails;
	const text = useRef("");

	useEffect(() => {
		if (filterUsers === null) {
			text.current = "";
			clearUserFilter();
		}
		//eslint-disable-next-line
	}, [filteredUsers]);

	const onchange = (e) => {
		console.log("hi");
		if (text.current.value !== "") {
			filterUsers(e.target.value);
		} else {
			clearUserFilter();
		}
	};

	const handleOnChange = (e) => {
		setPageDetails({ ...pageDetails, pageSize: e.target.value });
	};

	const handleOnChangeRole = (e, id) => {
		updateUser({
			id,
			role: e.target.value,
		});
	};

	const handlePageChange = (page) => {
		setPageDetails({ ...pageDetails, currentPage: page });
	};

	const handleSort = (path) => {
		const sortColumn = { ...pageDetails.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}
		setPageDetails({ ...pageDetails, sortColumn });
	};

	if (allUsers !== null && allUsers.length === 0) {
		return <h4>Currently There are No Question Available</h4>;
	}

	const filteredUsr = filteredUsers !== null ? filteredUsers : allUsers;

	const sortedUsr = _.orderBy(
		filteredUsr,
		[
			function (item) {
				if (sortColumn.path === "name") return item.name.toLowerCase();
				if (sortColumn.path === "email") return item.email.toLowerCase();
				if (sortColumn.path === "role") return item.role.toLowerCase();
			},
		],
		[sortColumn.order]
	);

	const newUsers = paginate(sortedUsr, currentPage, pageSize);

	return (
		<Fragment>
			{allUsers !== null && (
				<>
					<h3 className="text-center mb-2 pt-3 ">USERS</h3>
					<div className="title-border mb-4">
						<span></span>
					</div>
					<div className="row">
						<div className="col-10 pb-2">
							<Form>
								<Form.Group controlId="codingquestionSearch">
									<Form.Control
										className=" codingQuestSearch"
										type="text"
										placeholder="Search users by role, name or Email"
										ref={text}
										onChange={onchange}
									/>
								</Form.Group>
							</Form>
						</div>
						<div className="col-2 pb-2">
							<Button>Create</Button>
						</div>
					</div>
					<div className="table-responsive ">
						<table className="table table-bordered table-striped tbr text-center mb-3">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col" onClick={() => handleSort("name")}>
										Name
									</th>
									<th scope="col" onClick={() => handleSort("email")}>
										Email
									</th>
									<th scope="col" onClick={() => handleSort("role")}>
										Role
									</th>
									{user.role === "admin" && (
										<th scope="col">Delete</th>
									)}
								</tr>
							</thead>
							<tbody className="tbodyCode">
								{newUsers.map((currentUser, index) => (
									<tr key={index}>
										<th scope="row" className="pad-td">
											{index + 1}
										</th>
										<td className="pad-td">{currentUser.name}</td>
										<td className="pad-td">{currentUser.email}</td>
										{user.role === "admin" ? (
											<td>
												<Form>
													<Form.Group controlId="SelectRole">
														<Form.Control
															as="select"
															name="pageSize"
															className="roledrop"
															value={currentUser.role}
															onChange={(e) =>
																handleOnChangeRole(
																	e,
																	currentUser._id
																)
															}
														>
															<option
																value="student"
																className="optionSelect"
															>
																Student{" "}
															</option>
															<option
																value="faculty"
																className="optionSelect"
															>
																{" "}
																Faculty
															</option>
															<option
																value="admin"
																className="optionSelect"
															>
																Admin{" "}
															</option>
														</Form.Control>
													</Form.Group>
												</Form>
											</td>
										) : (
											<td className="pad-td">{currentUser.role}</td>
										)}
										{user.role === "admin" && (
											<td>
												<span>
													<a
														className="fa fa-trash operation-D pt-2"
														aria-hidden="true"
														href="#!"
														onClick={() =>
															deleteUser(currentUser._id)
														}
													> </a>
												</span>
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* pagination starts here */}
					<div className="row">
						<div className="ml-3 ">
							<Form>
								<Form.Group controlId="SelectRowsPerpage">
									<Form.Control
										as="select"
										name="pageSize"
										className="dispCode-inputFiled rowsPerPg"
										value={pageSize}
										onChange={handleOnChange}
									>
										<option value={10} className="optionSelect">
											10
										</option>
										<option value={25} className="optionSelect">
											25
										</option>
										<option value={50} className="optionSelect">
											50
										</option>
										<option value={100} className="optionSelect">
											100
										</option>
									</Form.Control>
								</Form.Group>
							</Form>
						</div>
						<span className="labelRowsPerPg mt-2 col-4">
							rows per page.
						</span>

						{/* pagination Component yahaa aayega */}
						<Pagination
							itemCounts={filteredUsr.length}
							pageSize={pageSize}
							currentPage={currentPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {
	filterUsers,
	clearUserFilter,
	updateUser,
	deleteUser,
})(DashboardUserTable);
