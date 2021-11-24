import React from 'react';
import Booklist from './Components/Booklist';
import BookForm from './Components/BookForm';
import { DataContextProvider } from './Contexts/ContextProvider';

const App = () => {
	return (
		<div className="container">
			<header className="header">
				<h1 className="heading-primary u-center-text">
					Bookstack Client
				</h1>
			</header>
			<DataContextProvider>
				<Booklist />
				<BookForm />
			</DataContextProvider>
		</div>
	);
};

export default App;
