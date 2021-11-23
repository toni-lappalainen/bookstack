import axios from 'axios';

const url = 'http://localhost:3002/';

const sendGetBookListRequest = async () => {
	try {
		const response = await axios.get(url + 'books');
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.error(err);
	}
};

const sendPostBookRequest = async (book) => {
	try {
		const response = await axios.post(url + 'books', {
			author: book.author,
			title: book.title,
			description: book.description,
		});
		console.log('new book:', response.data);
		return true;
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
};

const sendPatchBookRequest = async (book) => {
	try {
		const response = await axios.patch(url + 'books/' + book.id, {
			author: book.author,
			title: book.title,
			description: book.description,
		});
		console.log('patching book: ', response.data);
	} catch (err) {
		// Handle Error Here
		console.error(err);
	}
};

const sendDeleteBookRequest = async (id) => {
	try {
		const response = await axios.delete(url + 'books/' + id, { id: id });
		console.log('Deleted book: ', response.data);
	} catch (err) {
		console.log(err);
	}
};

export {
	sendGetBookListRequest,
	sendPostBookRequest,
	sendPatchBookRequest,
	sendDeleteBookRequest,
};
