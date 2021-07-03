import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const Login = ({ login }) => {
	const history = useHistory();

	const INITIAL_STATE = {
		username : '',
		password : ''
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ errors, setErrors ] = useState([]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let res = await login(formData);
		if (res.success) {
			setFormData(INITIAL_STATE);
			history.push('/companies');
		} else setErrors(res.errors);
	};

	return (
		<div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 Login-card">
			<h2 className="text-success mb-3">Log In</h2>
			<div className=" card">
				<div className="card-body">
					<form onSubmit={handleSubmit}>
						<div className="Login-username form-group">
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
						<div className="Login-password form-group">
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
						{errors.length ? (
							<div className="alert alert-danger" role="alert">
								{errors.map((error) => (
									<p className="mb-0 small" key={error}>
										{error}
									</p>
								))}
							</div>
						) : null}
						<button className="btn btn-success float-right" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;