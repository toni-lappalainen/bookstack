import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { sendGetBookListRequest } from '../database';
import { DataContext } from '../Contexts/ContextProvider';

const Booklist = () => {
	//const [books, setBooks] = useState(null);
	const { booksArray, setBooksArray, selectedBook, setSelectedBook } =
		useContext(DataContext);

	// Get list of books in server
	useEffect(() => {
		const getData = async () => {
			try {
				const fetchData = await sendGetBookListRequest();
				setBooksArray(fetchData.data.books);
			} catch (err) {
				console.log(err);
			}
		};
		getData();
	}, []);

	const selectRow = (row) => {
		const book = booksArray.find((x) => x._id === row._id);
		setSelectedBook(book);
	};

	// Array for the DataTable
	const columns = [
		{
			name: 'Author',
			selector: (row) => row.author,
			sortable: true,
		},
		{
			name: 'Title',
			selector: (row) => row.title,
			sortable: true,
		},
	];

	const renderTable = () => {
		if (booksArray === null) return <DataTable progressPending noHeader />;
		else
			return (
				<DataTable
					title="Books"
					columns={columns}
					data={booksArray}
					defaultSortField="author"
					pagination
					highlightOnHovers
					dense
					noHeader
					striped
					highlightOnHover
					selectableRows
					selectableRowsSingle
					selectableRowsHighlight
					onRowClicked={(row) => selectRow(row)}
				/>
			);
	};

	return <div>{renderTable()}</div>;
};

export default Booklist;
