import React from 'react';
import { Link } from 'react-router-dom';

const CompanyInfo = ({ name, handle, description, logoUrl }) => {
	return (
		<Link to={`/companies/${handle}`}>
			<div className="card-body">
				<h5>
					{name}
					{logoUrl && <img src={logoUrl} alt={`${name} logo`}/>}
				</h5>
				<p>
					<small>{description}</small>
				</p>
			</div>
		</Link>
	);
};

export default CompanyInfo;