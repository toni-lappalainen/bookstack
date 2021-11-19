const mongoose = require('mongoose');

// LogItems are usually Customers. They reside in the customer property.
// socialSecurityNumber is saved so we can find the correct LogItem with them.
// content is array for all the phrases from both player and the customer AI
const BookSchema = new mongoose.Schema(
	{
		problem: {
			type: Boolean,
			default: false,
		},
		phone: String,
		firstName: String,
		lastName: String,
		gender: String,
		socialSecurityNumber: String,
		customer: Object,
		content: Array,
	},
	{ timestamps: true }
);
const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
