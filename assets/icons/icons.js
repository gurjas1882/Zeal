import React from "react";
import Svg, { G, Mask, Path } from "react-native-svg";

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

const ImageSvg = ({ color1, color2 }) => (
	<svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="0.5" y="0.88501" width="100" height="100" rx="24" fill={color1} />
		<mask id="mask0_34_1008" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="34" y="37" width="33" height="28">
			<path
				d="M45.9625 46.5067C45.9625 48.3476 44.5299 49.8399 42.7627 49.8399C40.9954 49.8399 39.5628 48.3476 39.5628 46.5067C39.5628 44.6658 40.9954 43.1735 42.7627 43.1735C44.5299 43.1735 45.9625 44.6658 45.9625 46.5067Z"
				fill={color2}
			/>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M34.5007 40.8854C34.5007 39.0446 35.9334 37.5522 37.7006 37.5522H63.2996C65.0668 37.5522 66.4995 39.0446 66.4995 40.8854V60.8846C66.4995 62.7255 65.0669 64.2178 63.2996 64.2178H61.1874C61.1804 64.2179 61.1734 64.2179 61.1664 64.2179H38.4299C38.4239 64.2179 38.4178 64.2179 38.4118 64.2178H37.7006C35.9334 64.2178 34.5007 62.7255 34.5007 60.8846V40.8854ZM37.7006 40.0521H63.2996C63.7414 40.0521 64.0996 40.4252 64.0996 40.8854V51.2719L57.1474 44.2187L45.3198 56.2182L41.8357 52.6835L36.9006 57.6902V40.8854C36.9006 40.4252 37.2588 40.0521 37.7006 40.0521Z"
				fill={color2}
			/>
		</mask>
		<g mask="url(#mask0_34_1008)">
			<rect x="34.5005" y="34.8848" width="31.9987" height="31.9987" fill={color2} />
		</g>
	</svg>
);

const SearchSvg = ({ color }) => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="mask0_54_20" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M8.03371 0.416809C3.83017 0.416809 0.416626 3.79725 0.416626 7.97447C0.416626 12.1517 3.83017 15.5321 8.03371 15.5321C9.6009 15.5321 11.0587 15.0621 12.2703 14.2562L17.2396 19.1844C17.7757 19.7161 18.6436 19.7161 19.1797 19.1844C19.7178 18.6507 19.7178 17.7841 19.1797 17.2505L14.2423 12.3539C15.1289 11.1186 15.6508 9.60663 15.6508 7.97447C15.6508 3.79725 12.2373 0.416809 8.03371 0.416809ZM3.16392 7.97447C3.16392 5.31229 5.34094 3.14829 8.03371 3.14829C10.7265 3.14829 12.9035 5.31229 12.9035 7.97447C12.9035 10.6366 10.7265 12.8006 8.03371 12.8006C5.34094 12.8006 3.16392 10.6366 3.16392 7.97447Z"
				fill={color}
			/>
		</mask>
		<g mask="url(#mask0_54_20)">
			<rect y="0.00012207" width="20" height="19.9997" fill={color} />
		</g>
	</svg>
);

export { HomeSvg, NotesSvg, PlantSvg, NotificationSvg, PlusSvg, ImageSvg, SearchSvg };
