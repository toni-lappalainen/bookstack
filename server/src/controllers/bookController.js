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
		const book = await Book.findOne({
			socialSecurityNumber: req.params.id,
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

// TODO: create proper update function
// this uses patch instead of update, so only partial data is needed
const updateBook = async (req, res) => {
	let changes;

	if (req.body.end !== undefined) {
		changes = {
			$set: {
				problem: req.body.end,
			},
		};
	} else {
		changes = {
			// $push adds new values to the LogItem. Here it's adding new elements to content array.
			$push: {
				content: {
					player: req.body.question,
					customer: req.body.answer,
				},
			},
		};
	}

	try {
		const book = await Book.updateOne(
			{ socialSecurityNumber: req.params.id },
			changes,
			{
				safe: true,
				upsert: false, //if there is no document, create new
				new: true, // return updated document
			}
		);

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
	updateBook,
	deleteBook,
};
