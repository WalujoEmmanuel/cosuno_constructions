/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { specialties, companies } from "../db";

const queries = {
  specialties: async (_args: any, _context: any) => {
    return specialties;
  },
  companies: async ({ filters }: any, _context: any) => {
    const { searchFilters, searchQuery } = filters;

    const filteredCompanies =
      searchFilters.length === 0
        ? companies
        : companies.filter((company: any) => {
            return company.specialties.some(
              (specialty: string) => searchFilters.indexOf(specialty) >= 0
            );
          });

    return filteredCompanies.filter((company: any) => {
      return company.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  },
};

export default queries;
