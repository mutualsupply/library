import { SvgProps } from "./Logo";

export default function ArrowLeft(props: SvgProps) {
	return (
		<svg
			viewBox="0 0 24 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Arrow Left</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M2.34545 6.43736L24 6.51671L24 5.29831L2.60893 5.2717L6.90474 0.953772L5.95601 -7.88728e-07L-2.61686e-07 5.98668L-2.62849e-07 6.01328L0.948726 6.94045L5.98235 12L6.93108 11.0462L2.34545 6.43736Z"
				fill="currentColor"
			/>
		</svg>
	);
}
