const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
	{
		Title: String,
		Author: String,
		Description: String,
	},
	{ timestamps: true }
);
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
