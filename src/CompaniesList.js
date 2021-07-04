import React, { useState, useEffect } from 'react';
import CompanyInfo from './CompanyDetails';
import SearchForm from './SearchForm';
import JoblyApi from './Api';

const Companies = () => {
	const [ companiesList, setCompaniesList ] = useState(null);

	useEffect(function getAPIComanies() {
		// call async search 
		search();
	}, []);

	// search/filter api based on search bar
	async function search(name) {
		let companies = await JoblyApi.getCompanies(name);
		setCompaniesList(companies);
	}

	if (!companiesList) return <h1>Loading. . .</h1>;
	return (
		<div className="Companies col-md-8 offset-md-2">
			<SearchForm searchFunc={search} />
			{companiesList.length ? (
				<div className="Companies-list">
					{companiesList.map((company) => (
						<CompanyInfo
							key={company.handle}
							handle={company.handle}
							name={company.name}
							description={company.description}
							logoUrl={company.logoUrl}
						/>
					))}
				</div>
			) : (
				<p>Sorry no results found!</p>
			)}
		</div>
	);
};

export default Companies;