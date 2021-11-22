import './App.css';
import React, { useEffect, useContext } from 'react';
import Booklist from './Components/Booklist';
import BookForm from './Components/BookForm';
import { DataContext, DataContextProvider } from './Contexts/ContextProvider';

const App = () => {
	//	const { booksArray, setBooksArray } = DataContext();

	return (
		<div className="App">
			<header className="App-header">
				<h1>Bookstack Client</h1>
			</header>
			<DataContextProvider>
				<Booklist />
				<BookForm />
			</DataContextProvider>
		</div>
	);
};

export default App;
