/* eslint-disable no-empty */
import { ApolloClient, InMemoryCache } from '@apollo/client';

export default function createApolloClient() {
	return new ApolloClient({
		uri: 'http://localhost:8000/graphql/',
		cache: new InMemoryCache(),
	});
}
