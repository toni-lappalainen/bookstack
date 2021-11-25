import React, { useContext, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { sendGetBookListRequest } from '../apiRequests';
import { DataContext } from '../Contexts/ContextProvider';

// Component for showing the list of books in DataTable
const Booklist = () => {
	const { booksArray, setBooksArray, selectedBook, setSelectedBook } =
		useContext(DataContext);

	// Get list of books in server and assing it to booksArray
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
		// eslint-disable-next-line
	}, []);

	// when Row/book in table is clicked, select that book as currently edited book
	const selectRow = (row) => {
		const book = booksArray.find((x) => x._id === row._id);
		setSelectedBook(book);
	};

	// change row color to implicate which book is currently selected
	const selectedRowStyle = [
		{
			when: (row) =>
				selectedBook !== null && row._id === selectedBook._id,
			style: {
				backgroundColor: 'green',
				color: 'white',
			},
		},
	];

	// Array for the DataTable
	const columns = [
		{
			name: 'AUTHOR',
			selector: (row) => row.author,
			sortable: true,
			wrap: true,
		},
		{
			name: 'TITLE',
			selector: (row) => row.title,
			sortable: true,
			wrap: true,
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
					conditionalRowStyles={selectedRowStyle}
					onRowClicked={(row) => selectRow(row)}
				/>
			);
	};

	return <div className="content content__list">{renderTable()}</div>;
};

export default Booklist;
