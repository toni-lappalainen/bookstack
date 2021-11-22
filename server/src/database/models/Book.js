const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
	{
		title: String,
		author: String,
		description: String,
	},
	{ timestamps: true }
);
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
