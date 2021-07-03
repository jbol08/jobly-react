import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = ({ signUp }) => {
	const INITIAL_STATE = {
		email     : '',
		password  : '',
		firstName : '',
		lastName  : '',
		username  : ''
	};

	const history = useHistory();
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ errors, setErrors ] = useState([]);

	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		let res = await signUp(formData);
		if (res.success) {
			setFormData(INITIAL_STATE);
			history.push('/companies');
		} else setErrors(res.errors);
	};

	return (
		<div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<h2 className="text-primary mb-3">Sign Up</h2>
			<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="Signup-username form-group">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								id="username"
								className="form-control"
								name="username"
								placeholder="username"
								onChange={handleChange}
								value={formData.username}
							/>
						</div>
						<div className="Signup-password form-group">
							<label htmlFor="password">Password</label>
							<input
								className="form-control"
								type="password"
								id="password"
								name="password"
								placeholder="Password"
								onChange={handleChange}
								value={formData.password}
							/>
						</div>
						<div className="Signup-first form-group">
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								id="firstName"
								className="form-control"
								name="firstName"
								placeholder="firstName"
								onChange={handleChange}
								value={formData.firstName}
							/>
						</div>
						<div className="Signup-last form-group">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								id="lastName"
								className="form-control"
								name="lastName"
								placeholder="lastName"
								onChange={handleChange}
								value={formData.lastName}
							/>
						</div>
						<div className="Signup-email form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								id="email"
								className="form-control"
								name="email"
								placeholder="email"
								onChange={handleChange}
								value={formData.email}
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
						<button className="btn btn-primary btn-block" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;