import React, { useContext, useEffect } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import { DataContext } from '../Contexts/ContextProvider';
import {
	sendGetBookListRequest,
	sendPostBookRequest,
	sendPatchBookRequest,
	sendDeleteBookRequest,
} from '../database';

const initialFormData = {
	author: '',
	title: '',
	description: '',
};

// Custom field for getting selections from list
const MyField = (props) => {
	const { selectedBook } = useContext(DataContext);
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(props);
	// boolean for checking if current field is textarea
	const isTextArea = props.name === 'description';

	useEffect(() => {
		// set the value of field based on selectedBook
		if (selectedBook !== null) {
			console.log(selectedBook[props.name]);
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

	const [formData, setFormData] = React.useState(initialFormData);

	useEffect(() => {
		console.log('lol');
		if (selectedBook !== null) setFormData(selectedBook);
	}, [selectedBook]);

	const retrieveBookList = async () => {
		try {
			const fetchData = await sendGetBookListRequest();
			setBooksArray(fetchData.data.books);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (values, type) => {
		try {
			if (type === 'save') await sendPostBookRequest(values);
			else if (type === 'update')
				await sendPatchBookRequest(selectedBook._id, values);
			else if (type === 'delete') sendDeleteBookRequest(selectedBook._id);
		} catch (err) {
			console.log(err);
		}
		retrieveBookList();
	};

	return (
		<Formik
			initialValues={formData}
			validate={(values) => {
				const errors = {};

				if (!values.author) {
					errors.author = 'Required';
				}
				return errors;
			}}
			onSubmit={async (values, { setSubmitting }) => {
				handleSubmit(values, document.activeElement.dataset.flag);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<label htmlFor="author">
						Author
						<MyField name="author" />
					</label>
					<label htmlFor="title">
						title
						<MyField name="title" />
					</label>
					<label htmlFor="description">
						description
						<MyField name="description" as="textarea" />
					</label>
					<button type="submit" data-flag="save">
						Save new
					</button>
					<button type="submit" data-flag="update">
						Update
					</button>
					<button type="submit" data-flag="delete">
						Delete
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default BookForm;
