import axios from 'axios';

const url = 'http://localhost:3002/';

const sendGetBookListRequest = async () => {
	try {
		const response = await axios.get(`${url}books`);
		return response.data;
	} catch (err) {
		console.error(err);
	}
};

const sendPostBookRequest = async (book) => {
	const { author, title, description } = book;

	try {
		const response = await axios.post(`${url}books`, {
			author,
			title,
			description,
		});
		return true;
	} catch (err) {
		console.error(err);
	}
};

const sendPatchBookRequest = async (id, book) => {
	const { author, title, description } = book;
	try {
		const response = await axios.patch(`${url}books/${id.toString()}`, {
			author,
			title,
			description,
		});
	} catch (err) {
		console.error(err);
	}
};

const sendDeleteBookRequest = async (id) => {
	try {
		const response = await axios.delete(`${url}books/${id.toString()}`, {
			id,
		});
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
