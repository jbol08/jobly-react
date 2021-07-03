import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import JoblyApi from './api';
import JobCardList from './JobCardList';
const JobList = () => {
	const [ jobs, setJobs ] = useState(null);

	useEffect(function getAPIJobs() {
		search();
	}, []);

	
	async function search(title) {
		let allJobs = await JoblyApi.getJobs(title);
		setJobs(allJobs);
	}

	if (!jobs) return <h1>Loading. . .</h1>;
	return (
		<div className="JobList col-md-8 offset-md-2">
			<SearchForm searchFunc={search} />
			{jobs.length ? <JobCardList jobs={jobs} /> : <p>No jobs found!</p>}
		</div>
	);
};

export default JobList;

