import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';

function JobCard({ id, title, salary, equity, companyName }) {
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
	const [ applied, setApplied ] = useState();
	function formatSalary(salary) {
		return salary.toLocaleString('en-US', { maximumFractionDigits: 2 });
	}

	useEffect(
		() => {
			setApplied(hasAppliedToJob(id));
		},
		[ id, hasAppliedToJob ]
	);


	const handleClick = async (e) => {
		if (hasAppliedToJob(id)) return;
		applyToJob(id);
		setApplied(true);
	};

	return (
		<div className="JobCard card">
			<div className="card-body">
				<h6 className="card-title">{title}</h6>
				<p>{companyName}</p>
				{salary && (
					<div>
						<small>Salary: ${formatSalary(salary)}</small>
					</div>
				)}
				{equity !== undefined && (
					<div>
						<small>Equity: {equity}</small>
					</div>
				)}
				<button
					className="btn btn-danger text-uppercase float-right"
					onClick={handleClick}
					disabled={applied}
				>
					{applied ? 'Applied' : 'Apply'}
				</button>
			</div>
		</div>
	);
};

export default JobCard;
