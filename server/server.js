const mongoose = require('mongoose');
const app = require('./app');

const port = 3002;

const mongoUrl = 'mongodb://localhost:27017/bookstack';

mongoose
	.connect(mongoUrl, {
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
