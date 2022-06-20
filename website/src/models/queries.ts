/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const GET_SPECIALTIES = gql`
	query getSpecialties {
		specialties {
			name
		}
	}
`;

export const GET_COMPANIES = gql`
	query getCompanies($searchFilters: [String!], $searchQuery: String!) {
		companies(filters: { searchFilters: $searchFilters, searchQuery: $searchQuery }) {
			name
			logo
			specialties
			city
		}
	}
`;
