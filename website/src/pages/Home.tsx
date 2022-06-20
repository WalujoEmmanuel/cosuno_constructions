/* eslint-disable  react/function-component-definition */
import React from 'react';
import Header from '../components/Header';
import SearchPage from '../components/SearchPage';
import styles from './Home.module.scss';

function Home() {
	return (
		<div className={styles.App}>
			<Header />
			<SearchPage />
		</div>
	);
}

export default Home;
