import { SvgProps } from "./Logo"

const Close = ({ width = "24", className, fill = "#161615" }: SvgProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.50563 6.00009C5.83133 6.60257 5.83133 7.57937 6.50563 8.18185L10.7789 12L6.50563 15.8181C5.83133 16.4206 5.83133 17.3974 6.50563 17.9999L11.9999 13.0909L17.494 17.9998C18.1683 17.3973 18.1683 16.4205 17.494 15.818L13.2208 12L17.494 8.18197C18.1683 7.5795 18.1683 6.60269 17.494 6.00021L11.9999 10.9091L6.50563 6.00009Z"
        fill={fill}
      />
    </svg>
  )
}

export default Close
