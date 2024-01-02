import { SvgProps } from "./Logo";

const Minus = (props: SvgProps) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Minus</title>
			<path
				d="M2 13C2 11.8954 2.89543 11 4 11H22C22 12.1046 21.1046 13 20 13H2Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default Minus;
