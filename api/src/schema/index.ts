import { buildSchema } from "graphql";
import queries from "./queries";
import mutations from "./mutations";

export const schema = buildSchema(`
    type Specialty {
      name: String!
    }

    type Company {
      name: String,
      logo: String,
      specialties: [String],
      city: String
    }

    input CompanyFilterInput {
      searchQuery: String!,
      searchFilters: [String!],
    }

    type Query {
      specialties: [Specialty],
      companies (filters: CompanyFilterInput): [Company]
    }
`);

export const resolvers = {
  ...queries,
  ...mutations,
};
