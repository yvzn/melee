import { Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

export function Editor(props) {
	const cloneOfSpeakerList = props.speakers.map(({ id, name }) => ({
		id,
		name,
	}));
	const [speakerList, setSpeakerList] = useState(cloneOfSpeakerList);

	const updateSpeaker = (id, name) => {
		const updatedList = [...speakerList];
		for (const speaker of updatedList) {
			if (speaker.id === id) {
				speaker.name = name;
			}
		}
		setSpeakerList(updatedList);
	};

	const addSpeaker = (name) => {
		const id = Math.random();
		const updatedList = [...speakerList, { id, name }];
		setSpeakerList(updatedList);
	};

	const removeSpeaker = (id) => {
		const updatedList = speakerList.filter((speaker) => speaker.id !== id);
		setSpeakerList(updatedList);
	};

	const resetSpeakers = () => {
		const cloneOfOriginalList = props.speakers.map(({ name }) => ({
			id: Math.random(),
			name,
		}));
		setSpeakerList(cloneOfOriginalList);
	};

	const saveSpeakers = () => {
		props.onChange(speakerList);
	};

	return (
		<Fragment>
			<form>
				<fieldset id="editor-speakers">
					<legend>Team members:</legend>
					<ol>
						{speakerList.map((speaker) => (
							<li>
								<SpeakerEditor
									key={speaker.id}
									value={speaker.name}
									onChange={(name) =>
										updateSpeaker(speaker.id, name)
									}
									onRemove={() => removeSpeaker(speaker.id)}
								/>
							</li>
						))}
						<li>
							<NewSpeaker onChange={(name) => addSpeaker(name)} />
						</li>
					</ol>
					<input type="text" name="prevent-implicit-submit" hidden />
				</fieldset>
			</form>
			<form>
				<fieldset>
					<button type="reset" onClick={resetSpeakers}>
						Reset
					</button>
					{speakerList.length > 0 && (
						<button type="submit" onClick={saveSpeakers}>
							Save
						</button>
					)}
				</fieldset>
			</form>
		</Fragment>
	);
}

function SpeakerEditor(props) {
	const [value, setValue] = useState(props.value);

	const onInput = (e) => {
		setValue(e.target.value);
	};

	const onBlur = (e) => {
		const inputValue = e.target.value.trim();
		if (!inputValue) {
			props.onRemove();
		} else if (inputValue !== props.value) {
			props.onChange(inputValue);
		}
	};

	return (
		<label>
			<input
				type="text"
				value={value}
				onFocus={(e) => e.target.select()}
				onInput={onInput}
				onBlur={onBlur}
				placeholder="Speaker name"
			/>
		</label>
	);
}

function NewSpeaker(props) {
	const [value, setValue] = useState("");
	const inputRef = useRef(null);

	useEffect(() => inputRef.current.focus(), []);

	const onInput = (e) => {
		setValue(e.target.value);
	};

	const saveChanges = (inputValue) => {
		const formattedValue = inputValue.trim();
		if (formattedValue) {
			props.onChange(formattedValue);
			inputRef.current.focus();
		}
		setValue("");
	};

	const onBlur = (e) => {
		saveChanges(e.target.value);
	};

	const onKeyUp = (e) => {
		if (e.code === "NumpadEnter" || e.code === "Enter") {
			saveChanges(e.target.value);
		}
	};

	return (
		<label>
			<input
				type="text"
				value={value}
				onFocus={(e) => e.target.select()}
				ref={inputRef}
				onInput={onInput}
				onBlur={onBlur}
				onKeyUp={onKeyUp}
				placeholder="New speaker name"
			/>
		</label>
	);
}
