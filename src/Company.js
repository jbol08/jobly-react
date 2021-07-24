import React, { useState, useEffect } from 'react';
import JoblyApi from './Api';
import JobCardList from './JobCardList';
import { useParams } from 'react-router-dom';

const Company = () => {
	const { handle } = useParams();
	const [ company, setCompany ] = useState(null);

	// async function to get a single company

	useEffect(
		function getCompanyWithJobs() {
			const getCompany = async () => {
				const res = await JoblyApi.getCompany(handle);
				setCompany(res);
			};
			getCompany();
		},
		[ handle ]
	);

	if (!company) return <h1>Loading. . .</h1>;
	return (
		<div className="Company col-md-8 offset-md-2">
			<h4>{company.name}</h4>
			<p>{company.description}</p>
			<JobCardList jobs={company.jobs} />
		</div>
	);
};

export default Company;