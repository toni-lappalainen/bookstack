import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { DataContext } from '../Contexts/ContextProvider';
import CustomField from './CustomField';
import {
	sendGetBookListRequest,
	sendPostBookRequest,
	sendPatchBookRequest,
	sendDeleteBookRequest,
} from '../apiRequests';

// Component for editing and adding books to the database

const initialFormData = {
	author: '',
	title: '',
	description: '',
};

const BookForm = () => {
	const { setBooksArray, selectedBook, setSelectedBook } =
		useContext(DataContext);
	const [success, setSuccess] = useState('');
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		// Enable save&delete buttons when a book is selected
		if (selectedBook !== null) setDisabled(false);
		else setDisabled(true);
	}, [selectedBook]);

	// function for retrieving the books from database after making changes
	const retrieveBookList = async () => {
		try {
			const fetchData = await sendGetBookListRequest();
			setBooksArray(fetchData.data.books);
		} catch (err) {
			console.log(err);
		}
	};

	// Choose the right api function based on button pressed
	// Show success/error message
	const handleSubmit = async (values, submitType, resetForm) => {
		try {
			if (submitType === 'save') await sendPostBookRequest(values);
			else if (submitType === 'update')
				await sendPatchBookRequest(selectedBook._id, values);
			else if (submitType === 'delete') {
				await sendDeleteBookRequest(selectedBook._id);
				resetForm();
				setSelectedBook(null);
			}
			setSuccess(`${submitType} successful!`);
		} catch (err) {
			setSuccess(`${submitType} failed. error: ${err}.`);
		}
		setTimeout(() => {
			setSuccess('');
		}, 5000);
		retrieveBookList();
	};

	return (
		<Formik
			initialValues={initialFormData}
			// Only validate fields when submitting
			validateOnChange={false}
			validateOnBlur={false}
			validate={(values) => {
				const errors = {};
				const textLength = 50;
				const textAreaLength = 800;
				// check that all fields have values and that they are not too long
				for (var key in values) {
					if (values.hasOwnProperty(key)) {
						const len = values[key].length;
						if (!values[key]) errors[key] = 'Required!';
						if (key !== 'description' && len > textLength) {
							errors[
								key
							] = `Too long! max characters: ${textLength}. Current length: ${len}.`;
						} else if (len > textAreaLength)
							errors[
								key
							] = `Too long! max characters: ${textAreaLength}. Current length: ${len}.`;
					}
				}
				return errors;
			}}
			onSubmit={async (values, { resetForm }) => {
				// Flag is used to get right submitType by button pressed
				handleSubmit(
					values,
					document.activeElement.dataset.flag,
					resetForm
				);
			}}
		>
			{() => (
				<Form className="content content__form">
					<div className="content__form--inputs">
						<label htmlFor="author">Author</label>
						<CustomField name="author" />
						<label htmlFor="title">Title</label>
						<CustomField name="title" />
						<label htmlFor="description">Description</label>
						<CustomField name="description" as="textarea" />
					</div>
					<div className="content__form--buttons">
						<button type="submit" data-flag="save">
							Save new
						</button>
						<button
							type="submit"
							data-flag="update"
							disabled={disabled}
						>
							Save
						</button>
						<button
							type="submit"
							data-flag="delete"
							disabled={disabled}
						>
							Delete
						</button>
					</div>
					<div className="success">{success}</div>
				</Form>
			)}
		</Formik>
	);
};

export default BookForm;
