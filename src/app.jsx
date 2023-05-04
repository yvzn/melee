import { useState } from "preact/hooks";
import { Melee } from "./melee";
import { Editor } from "./editor";

const initialSpeakers = [];

export function App() {
	const [speakerList, setSpeakerList] = useState(initialSpeakers);
	const [mode, setMode] = useState("editor");

	const displayEditor = () => setMode("editor");
	const displayMelee = () => setMode("melee");

	const onEditSpeakers = (newValue) => {
		setSpeakerList(newValue);
		displayMelee();
	};

	return (
		<main>
			<Header>
				{mode === "melee" && (
					<button onClick={displayEditor}>Edit team</button>
				)}
				{mode === "editor" && speakerList.length > 0 && (
					<button onClick={displayMelee}>Cancel</button>
				)}
			</Header>
			{mode === "melee" && <Melee speakers={speakerList} />}
			{mode === "editor" && (
				<Editor speakers={speakerList} onChange={onEditSpeakers} />
			)}
		</main>
	);
}

function Header(props) {
	return (
		<header>
			<h1>🗨 Daily scrum</h1>
			<aside>{props.children}</aside>
		</header>
	);
}
