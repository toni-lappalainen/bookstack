import React, { useContext, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { sendGetBookListRequest } from '../apiRequests';
import { DataContext } from '../Contexts/ContextProvider';

// Component for showing the list of books in DataTable
const Booklist = () => {
	const { booksArray, setBooksArray, setSelectedBook } =
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
	}, []);

	// when Row/book in table is clicked, select that book as currently edited book
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
					onRowClicked={(row) => selectRow(row)}
				/>
			);
	};

	return <div>{renderTable()}</div>;
};

export default Booklist;
