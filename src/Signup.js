import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Signup({ signup }){
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

	function handleChange (event) {
		const { name, value } = event.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	async function handleSubmit(event){
		event.preventDefault();
		let result = await signup(formData);
		if (result.success) {
			setFormData(INITIAL_STATE);
			history.push('/companies');
		} else setErrors(result.errors);
	};

	return (
		<div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
			<h2 className="text-primary mb-3">Sign Up</h2>
			<div className="card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="username form-group">
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
						<div className="password form-group">
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
						<div className="first form-group">
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
						<div className="last form-group">
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
						<div className="email form-group">
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