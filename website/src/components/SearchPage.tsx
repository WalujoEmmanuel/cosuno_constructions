/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  react/no-array-index-key */
/* eslint-disable  no-nested-ternary */
import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_COMPANIES, GET_SPECIALTIES } from '../models/queries';
import styles from './SearchPage.module.scss';

interface ICompany {
	name: string;
	logo: string;
	specialties: string[];
	city: string;
}

const SearchPage = () => {
	const [companies, setCompanies] = useState<ICompany[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [searchFilters, setSearchFilters] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [showError, setShowError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const handleGetSpecialties = useQuery(GET_SPECIALTIES);
	const handleGetCompanies = useQuery(GET_COMPANIES, {
		variables: {
			searchFilters,
			searchQuery,
		},
	});

	useEffect(() => {
		const { loading, data } = handleGetSpecialties;

		if (!loading && data) {
			const sortedSpecialties = (data.specialties || []).map((specialty: any) => specialty.name);
			setFilters(sortedSpecialties);
		}
	}, [handleGetSpecialties]);

	useEffect(() => {
		const { loading, error, data } = handleGetCompanies;

		if (error) {
			setShowError(true);
			setErrorMessage(error.message);
		}

		if (!loading && data) {
			setCompanies(data.companies || []);
		}
	}, [handleGetCompanies, searchFilters, searchQuery]);

	const handleCheckFilter = (event: any) => {
		if (event.target.checked) {
			setSearchFilters([...searchFilters, event.target.value]);
		} else {
			setSearchFilters([...searchFilters.filter((filter) => filter !== event.target.value)]);
		}
	};

	return (
		<div className={styles.Wrapper}>
			<form className={styles.Form} method="POST">
				<div className={styles.Form__Search}>
					<input
						type="text"
						name="search"
						placeholder="Search Company"
						value={searchQuery}
						onChange={(event: any) => setSearchQuery(event.target.value)}
					/>
				</div>
				<div className={styles.Form__Filters}>
					<p className={styles.Form__Filters__Title}>Filter By Specialties: </p>
					{filters.map((filter: string) => (
						<div className={styles.Form__Filters__Filter} key={filter}>
							<input
								type="checkbox"
								id={filter}
								defaultChecked={searchFilters.includes(filter)}
								name="filter"
								defaultValue={filter}
								onChange={handleCheckFilter}
							/>
							<label htmlFor={filter}>{filter}</label>
						</div>
					))}
				</div>
			</form>

			<div className={styles.Display}>
				<p className={styles.Display__Title}>Companies</p>
				<div className={styles.Companies}>
					{showError ? (
						<div className={styles.Error}>
							<p>{errorMessage || 'An Error Occurred'}</p>
						</div>
					) : !companies.length ? (
						<div className={styles.NoCompany}>
							<p>No Companies Registered.</p>
						</div>
					) : (
						companies.map((company: any, index: any) => (
							<div className={styles.Company} key={index}>
								<div className={styles.Company__Logo}>
									<img src={company.logo} alt="logo" />
								</div>
								<div className={styles.Company__Details}>
									<p className={styles.Company__Details__Name}>{company.name}</p>
									<p className={styles.Company__Details__City}>
										City: <span>{company.city}</span>
									</p>
									<p className={styles.Company__Details__Specialties}>
										Specialties: <span>{company.specialties.toString()}</span>
									</p>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
