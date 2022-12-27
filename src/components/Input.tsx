import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField";

type PropsType = {
	callback: (newTitle: string) => void
}

export const Input = (props: PropsType) => {

	const [title, setTitle] = useState("")
	const [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null);
		if (e.key === "Enter") {
			addTask();
		}
	}

	const addTask = () => {
		if (title.trim() !== "") {
			props.callback(title.trim());
			setTitle("");
		} else {
			setError("Title is required");
		}
	}

	return (
		<div>
			<TextField
				size="small"
				id="outlined-basic"
				label={error ? "Enter text please" : "Your text"}
				variant="outlined"
				error={!!error}
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyPressHandler}
			/>

			<Button
				size="small"
				variant="contained"
				onClick={addTask}
				style={{maxWidth: "38px", maxHeight: "38px", minWidth: "38px", minHeight: "38px", background: "black"}}

			>+</Button>
			{/*{error && <div className="error-message">{error}</div>}*/}
		</div>
	);
};

