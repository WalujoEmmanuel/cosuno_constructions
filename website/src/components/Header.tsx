import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.Header}>
			<img src="logo.svg" className={styles.Header__logo} alt="logo" />
			<p className={styles.Header__title}>Cosumo Constructions</p>
		</header>
	);
};

export default Header;
