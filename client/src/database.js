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

export { sendGetBookListRequest };
