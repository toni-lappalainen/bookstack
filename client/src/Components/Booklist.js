import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { sendGetBookListRequest } from '../database';

const Booklist = () => {
	const [books, setBooks] = useState(null);

	// Get list of books in server
	useEffect(() => {
		async function getData() {
			try {
				const fetchData = await sendGetBookListRequest();
				console.log(fetchData);
				setBooks(fetchData.data.books);
				console.log(books.data.books);
			} catch (err) {
				console.log(err);
			}
		}
		getData();
	}, []);

	// Array for the DataTable
	const columns = [
		{
			name: 'Author',
			selector: 'author',
			sortable: true,
		},
		{
			name: 'Title',
			selector: 'title',
			sortable: true,
		},
		{
			name: 'Description',
			selector: 'description',
			sortable: false,
		},
	];

	const renderTable = () => {
		if (books === null) return <DataTable progressPending noHeader />;
		else
			return (
				<DataTable
					title="Books"
					columns={columns}
					data={books}
					defaultSortField="author"
					pagination
					highlightOnHovers
					dense
					noHeader
				/>
			);
	};

	return <div>{renderTable()}</div>;
};

export default Booklist;
