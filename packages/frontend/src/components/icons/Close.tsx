import { SvgProps } from "./Logo";

const Close = (props: SvgProps) => {
	return (
		<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<title>Close</title>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M0.708265 16.2481C0.3171 16.6484 0.3171 17.2975 0.708265 17.6979C1.09943 18.0982 1.73363 18.0982 2.1248 17.6979L8.99849 10.6627L15.8752 17.701C16.2664 18.1013 16.9006 18.1013 17.2917 17.701C17.6829 17.3006 17.6829 16.6515 17.2917 16.2512L10.415 9.21293L17.7066 1.75006C18.0978 1.34971 18.0978 0.700615 17.7066 0.300263C17.3155 -0.100089 16.6813 -0.100087 16.2901 0.300264L8.99849 7.76313L1.7099 0.303347C1.31874 -0.0970047 0.684536 -0.0970047 0.293372 0.303347C-0.0977917 0.703698 -0.0977903 1.3528 0.293374 1.75315L7.58196 9.21293L0.708265 16.2481Z" fill="#47AAF6"/>
		</svg>

	);
};

export default Close;
