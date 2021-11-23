import React, { useContext, useEffect } from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import { DataContext } from '../Contexts/ContextProvider';
import {
	sendPostBookRequest,
	sendPatchBookRequest,
	sendDeleteBookRequest,
} from '../database';

const initialFormData = {
	author: '',
	title: '',
	description: '',
};

// Custom field that keeps
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
	const { selectedBook } = useContext(DataContext);

	const [formData, setFormData] = React.useState(initialFormData);

	useEffect(() => {
		console.log('lol');
		if (selectedBook !== null) setFormData(selectedBook);
	}, [selectedBook]);

	const handleSave = async (values) => {
		try {
			await sendPostBookRequest(values);
		} catch (err) {
			console.log(err);
		}
	};
	const handleUpdate = async (values) => {
		console.log(values);
		try {
			await sendPatchBookRequest(selectedBook._id, values);
		} catch (err) {
			console.log(err);
		}
	};
	const handleDelete = async () => {
		console.log('lol');
		try {
			await sendDeleteBookRequest(selectedBook._id);
		} catch (err) {
			console.log(err);
		}
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
				if (document.activeElement.dataset.flag === 'save') {
					await handleSave(values);
					setSubmitting = false;
				} else if (document.activeElement.dataset.flag === 'update')
					handleUpdate(values);
				else if (document.activeElement.dataset.flag === 'delete')
					handleDelete();
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
