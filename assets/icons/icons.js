import React from "react";
import Svg, { Circle, Defs, G, Mask, Path, Rect } from "react-native-svg";

const HomeSvg = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M19.017 7.142A2 2 0 0 1 20 8.864V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8.864a2 2 0 0 1 .983-1.722l6-3.542a2 2 0 0 1 2.034 0l6 3.542Z"
		/>
	</Svg>
);

const NotesSvg = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
		<Path
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M9 15V12.5L17.75 3.75C18.4404 3.05964 19.5596 3.05964 20.25 3.75V3.75C20.9404 4.44036 20.9404 5.55964 20.25 6.25L15.5 11L11.5 15H9Z"
		/>
	</Svg>
);

const PlantSvg = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
		<Path
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 13V21M12 12.8573C12 8.466 15.5381 4.9011 19.919 4.85767C19.9724 5.2308 20 5.61224 20 6.00012C20 10.3914 16.4619 13.9563 12.081 13.9997C12.0276 13.6266 12 13.2451 12 12.8573ZM12 12.8573C12 8.466 8.46195 4.9011 4.08096 4.85767C4.02761 5.2308 4 5.61224 4 6.00012C4 10.3914 7.53805 13.9563 11.919 13.9997C11.9724 13.6266 12 13.2451 12 12.8573Z"
		/>
	</Svg>
);

const NotificationSvg = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={18} height={20} fill="none">
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9 3.5a5 5 0 0 1 5 5v2.24a2 2 0 0 0 .505 1.328l1.276 1.436c.86.967.173 2.496-1.121 2.496H3.34c-1.294 0-1.98-1.53-1.12-2.496l1.275-1.436A2 2 0 0 0 4 10.74V8.5a5 5 0 0 1 5-5Zm0 0V1M8 19h2"
		/>
	</Svg>
);

const PlusSvg = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
		<Mask
			id="a"
			width={24}
			height={24}
			x={0}
			y={0}
			maskUnits="userSpaceOnUse"
			style={{
				maskType: "alpha",
			}}
		>
			<Path fill={color} d="M13.5 2a1.5 1.5 0 0 0-3 0v8.5H2a1.5 1.5 0 0 0 0 3h8.5V22a1.5 1.5 0 0 0 3 0v-8.5H22a1.5 1.5 0 0 0 0-3h-8.5V2Z" />
		</Mask>
		<G mask="url(#a)">
			<Path fill={color} d="M0 0h24v24H0z" />
		</G>
	</Svg>
);
const notRecording = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
		<Circle cx={35} cy={35} r={35} fill="#FF5B5B" />
	</Svg>
);

const amRecording = ({ color }) => (
	<Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
		<G filter="url(#a)">
			<Circle cx={39} cy={35} r={33.5} fill="#fff" stroke="#FF5B5B" strokeWidth={3} />
			<Rect width={20} height={20} x={29} y={25} fill="#FF5B5B" rx={4} />
		</G>
		<Defs></Defs>
	</Svg>
);

export { HomeSvg, NotesSvg, PlantSvg, NotificationSvg, PlusSvg, notRecording, amRecording };
