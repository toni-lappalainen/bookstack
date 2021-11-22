import React, { useState } from 'react';

const DataContext = React.createContext();

const DataContextProvider = (props) => {
	const [booksArray, setBooksArray] = useState(null);
	const [selectedBook, setSelectedBook] = useState(null);
	return (
		<DataContext.Provider
			value={{
				booksArray,
				setBooksArray,
				selectedBook,
				setSelectedBook,
			}}
		>
			{props.children}
		</DataContext.Provider>
	);
};

export { DataContext, DataContextProvider };
