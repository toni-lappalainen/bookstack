import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../Contexts/ContextProvider';

const BookForm = (props) => {
	const { selectedBook } = useContext(DataContext);
	const [book, setBook] = useState({
		author: '',
		title: '',
		description: '',
	});

	useEffect(() => {
		if (selectedBook !== null) setBook(selectedBook);
	}, [selectedBook]);

	return (
		<>
			<label>
				Author:
				<input type="text" value={book.author} />
			</label>
			<label>
				Title:
				<input type="text" value={book.title} />
			</label>
			<label>
				Description:
				<textarea type="text" value={book.description} />
			</label>
			<input type="submit" value="Save new" />
			<input type="submit" value="Update" />
			<input type="submit" value="Delete" />
		</>
	);
};

export default BookForm;
