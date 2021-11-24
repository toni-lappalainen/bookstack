import React, { useContext, useEffect } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import { DataContext } from '../Contexts/ContextProvider';
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

// Custom field that takes care of showing currently selected book's data in the form
// without making the values unmutable
const MyField = (props) => {
	const { selectedBook } = useContext(DataContext);
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(props);
	// boolean for checking if Field should be textarea
	const isTextArea = props.name === 'description';

	useEffect(() => {
		// set the value of field based on selectedBook
		if (selectedBook !== null) {
			setFieldValue(props.name, selectedBook[props.name]);
		}
	}, [selectedBook, setFieldValue, props.name]);

	return (
		<>
			{isTextArea ? (
				<textarea {...props} {...field} />
			) : (
				<input {...props} {...field} />
			)}
			{
				// show error messages after validation
				!!meta.touched && !!meta.error && (
					<div className="error">{meta.error}</div>
				)
			}
		</>
	);
};

const BookForm = () => {
	const { setBooksArray, selectedBook } = useContext(DataContext);

	// function for retrieving the books from database after making changes
	const retrieveBookList = async () => {
		try {
			const fetchData = await sendGetBookListRequest();
			setBooksArray(fetchData.data.books);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (values, submitType, resetForm) => {
		try {
			if (submitType === 'save') await sendPostBookRequest(values);
			else if (submitType === 'update')
				await sendPatchBookRequest(selectedBook._id, values);
			else if (submitType === 'delete') {
				await sendDeleteBookRequest(selectedBook._id);
				resetForm();
			}
		} catch (err) {
			console.log(err);
		}
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
				// check that all fields have values and that they are not too long
				for (var key in values) {
					if (values.hasOwnProperty(key)) {
						if (!values[key]) errors[key] = 'Required!';
						if (key !== 'description' && values[key].length > 50) {
							errors[key] = 'Too long!';
						} else if (values[key].length > 800)
							errors[key] = 'Too long!';
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
						<MyField name="author" />
						<label htmlFor="title">Title</label>
						<MyField name="title" />
						<label htmlFor="description">Description</label>
						<MyField name="description" as="textarea" />
					</div>
					<div className="content__form--buttons">
						<button type="submit" data-flag="save">
							Save new
						</button>
						<button type="submit" data-flag="update">
							Save
						</button>
						<button type="submit" data-flag="delete">
							Delete
						</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default BookForm;
