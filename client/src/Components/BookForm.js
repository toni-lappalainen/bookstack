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
	// boolean for checking if current field should be textarea
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
			{!!meta.touched && !!meta.error && <div>{meta.error}</div>}
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
			validateOnChange={false}
			validateOnBlur={false}
			validate={(values) => {
				const errors = {};

				if (!values.author) errors.author = 'Required!';
				if (!values.title) errors.title = 'Required!';
				if (!values.description) errors.description = 'Required!';
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
			{({ resetForm }) => (
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
							Update
						</button>
						<button type="submit" data-flag="delete">
							Delete
						</button>
						<button onClick={resetForm}>Reset</button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default BookForm;
