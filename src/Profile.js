import React, { useState, useContext } from "react";

import JoblyApi from "./Api";
import UserContext from "./UserContext";
import useTimedMessage from './hooks/UseTimedMessage';

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
	const INITIAL_STATE = {
		username  : currentUser.username,
		email     : currentUser.email,
		firstName : currentUser.firstName,
		lastName  : currentUser.lastName,
		password  : ''
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ errors, setErrors ] = useState([]);
	const [ updated, setUpdated ] = useTimedMessage();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let userUpdated;

		let newData = {
			firstName : formData.firstName,
			lastName  : formData.lastName,
			email     : formData.email
		};
		let username = formData.username;
		setFormData((formData) => ({ ...formData }));
		try {
			userUpdated = await JoblyApi.updateUser(username, newData);
		} catch (errors) {
			console.error(errors);
			setErrors(errors);
			return;
		}
		setErrors([]);
		setUpdated(true);
		setCurrentUser(userUpdated);
	};

	return (
		<div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<h2 className="text-warning mb-2">Edit Profile</h2>
			<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="Profile-username form-group">
							<label htmlFor="userName">Username</label>
							<p className="form-control-plaintext">{formData.username}</p>
						</div>
						<div className="Profile-email form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								id="email"
								name="email"
								placeholder="Email"
								onChange={handleChange}
								value={formData.email}
								className="form-control"
							/>
						</div>
						<div className="Profile-first form-group">
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								placeholder="First name"
								onChange={handleChange}
								value={formData.firstName}
								className="form-control"
							/>
						</div>
						<div className="Profile-last form-group">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								placeholder="Last name"
								onChange={handleChange}
								value={formData.lastName}
								className="form-control"
							/>
						</div>
						{errors.length ? (
							<div className="alert alert-danger" role="alert">
								{errors.map((error) => (
									<p className="mb-0 small" key={error}>
										{error}
									</p>
								))}
							</div>
						) : null}
						{updated ? (
							<div className="alert alert-success" role="alert">
								<p className="mb-0 small">User Info Updated!</p>
							</div>
						) : null}
						<button className="btn btn-block btn-warning" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProfileForm;
  