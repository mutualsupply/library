import { SvgProps } from "./Logo";

export default function Search({
	width = 20,
	fill = "#0064FB",
	className,
}: SvgProps) {
	return (
		<svg
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M11.2242 11.2252C13.2161 9.23334 13.2161 6.00386 11.2242 4.01197C9.23236 2.02009 6.00288 2.02009 4.01099 4.01197C2.01911 6.00386 2.01911 9.23334 4.01099 11.2252C6.00288 13.2171 9.23236 13.2171 11.2242 11.2252ZM11.8253 3.41087C14.0483 5.63382 14.1448 9.17795 12.1149 11.5156L13.3275 12.7282L13.9472 12.1085C14.1034 11.9523 14.3567 11.9523 14.513 12.1085L17.8367 15.4322C18.5007 16.0962 18.5007 17.1727 17.8367 17.8367C17.1727 18.5006 16.0963 18.5006 15.4323 17.8367L12.1085 14.5129C11.9523 14.3567 11.9523 14.1034 12.1085 13.9472L12.7264 13.3293L11.5138 12.1167C9.17608 14.1458 5.63256 14.049 3.40989 11.8263C1.08603 9.50246 1.08603 5.73473 3.40989 3.41087C5.73376 1.087 9.50148 1.087 11.8253 3.41087ZM13.3275 13.9304L13.0279 14.23L16.0334 17.2356C16.3654 17.5675 16.9036 17.5675 17.2356 17.2356C17.5676 16.9036 17.5676 16.3653 17.2356 16.0333L14.2301 13.0278L13.9286 13.3293L13.9296 13.3303L13.3285 13.9314L13.3275 13.9304Z"
				fill="#0C89E9"
			/>
		</svg>
	);
}
