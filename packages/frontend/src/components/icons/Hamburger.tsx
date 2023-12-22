import { SvgProps } from "./Logo";

export default function Hamburger(props: SvgProps) {
  return <svg viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>Hamburger</title>
    <rect x="0.5" width="25" height="2" rx="1" fill="#47AAF6"/>
    <rect x="0.5" y="6" width="25" height="2" rx="1" fill="#47AAF6"/>
    <rect x="0.5" y="12" width="25" height="2" rx="1" fill="#47AAF6"/>
  </svg>
}
