const Book = require('../database/models/Book');

// functions for manipulating the database.

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find();

		res.status(200).json({
			status: 'success',
			results: books.length,
			data: {
				books,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

const getBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);

		res.status(200).json({
			status: 'success',
			data: {
				book,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

const createBook = async (req, res) => {
	try {
		const newBook = await Book.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				book: newBook,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

const deleteBook = async (req, res) => {
	try {
		await Book.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

// this is called by patch instead of update, so only partial data is needed
// but since the old data is already in the form, it will update them all.
const updateBook = async (req, res) => {
	console.log(req.params.id);
	const changes = {
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
	};

	try {
		const book = await Book.findByIdAndUpdate(req.params.id, changes, {
			safe: true,
			new: true, // return updated document
		});

		res.status(200).json({
			status: 'success',
			data: {
				book,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};

module.exports = {
	getAllBooks,
	getBook,
	createBook,
	updateBook,
	deleteBook,
};
