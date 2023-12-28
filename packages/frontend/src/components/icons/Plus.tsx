import { SvgProps } from "./Logo";

const Plus = (props: SvgProps) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Plus</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13 2C11.8954 2 11 2.89543 11 4V11H4C2.89543 11 2 11.8954 2 13H11V22C12.1046 22 13 21.1046 13 20V13H20C21.1046 13 22 12.1046 22 11H13V2Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default Plus;
