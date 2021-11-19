const mongoose = require('mongoose');
const app = require('./app');

const port = 3002;

// TODO: create mongo atlas
const url =
	'mongodb+srv://nelson:c6DVw8V2RnH87PHA@cluster0.q9lmo.mongodb.net/healtcarerc?retryWrites=true&w=majority';

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => 'You are now connected to Mongo!')
	.catch((err) => console.error('Something went wrong', err));

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
