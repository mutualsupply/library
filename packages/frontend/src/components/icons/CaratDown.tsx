import { SvgProps } from "./Logo";

export default function CaratDown(props: SvgProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Carat Down</title>
			<path
				d="M21.938 6L12.0757 16.3852L2.06205 6.23411L1 7.40515L12.1519 18.5714L23 7.09309L21.938 6Z"
				fill="currentColor"
			/>
		</svg>
	);
}
