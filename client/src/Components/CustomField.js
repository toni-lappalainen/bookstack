import React, { useContext, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import { DataContext } from '../Contexts/ContextProvider';

// Custom field is used to take care of showing currently selected book's data in the form
// without making the values unmutable
const CustomField = (props) => {
	const { selectedBook } = useContext(DataContext);
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(props);
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

export default CustomField;
