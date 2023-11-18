export function stringToColor(string) {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
}
export function stringAvatar(name) {
	if (typeof name !== "string" || name.trim() === "") {
		return (
			<div
				style={{
					backgroundColor: "#000",
					width: "100px",
					height: "100px",
					fontSize: 10,
				}}>
				{"?"}
			</div>
		);
	}

	const nameParts = name.split(" ");
	const avatarStyle = {
		width: "75px",
		height: "75px",
		fontWeight: "Bold",
		fontSize: 28,
		backgroundColor: stringToColor(name),
	};

	if (nameParts.length >= 2) {
		return (
			<div
				className="flex items-center justify-center rounded-full text-white"
				style={avatarStyle}>
				{nameParts[0][0]}
				{nameParts[1][0]}
			</div>
		);
	} else {
		return <div style={avatarStyle}>{name[0]}</div>;
	}
}
