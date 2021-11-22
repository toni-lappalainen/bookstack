const mongoose = require('mongoose');
const app = require('./app');

const port = 3002;

const mongoUrl = 'mongodb://localhost:27017/bookstack';

const connectDB = async () => {
	try {
		console.log(mongoUrl);
		await mongoose.connect(`${mongoUrl}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

connectDB();

app.listen(port, () => {
	console.log(`App running on port ${port}.`);
});
