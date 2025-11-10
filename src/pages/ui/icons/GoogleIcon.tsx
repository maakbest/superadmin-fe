import React from 'react'

type GoogleIconProps = {
	width?: number
	height?: number
}
const GoogleIcon = ({ height = 24, width = 24 }: GoogleIconProps) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height}>
			<path fill="none" d="M0 0h24v24H0z" />
			<path fill="#4285F4" d="M21.35 11.1H12v2.9h5.35a4.63 4.63 0 0 1-2 3.05v2.55h3.25c1.9-1.75 2.95-4.35 2.95-7.25 0-.5-.05-1-.15-1.5z" />
			<path fill="#34A853" d="M12 22c2.7 0 4.95-.9 6.6-2.45l-3.25-2.55c-.9.6-2.05.95-3.35.95a5.83 5.83 0 0 1-5.5-3.95H3.1v2.6A10 10 0 0 0 12 22z" />
			<path fill="#FBBC05" d="M6.5 13.95a5.95 5.95 0 0 1 0-3.9V7.45H3.1a9.97 9.97 0 0 0 0 9.1l3.4-2.6z" />
			<path fill="#EA4335" d="M12 6.1c1.45 0 2.75.5 3.8 1.5l2.8-2.8A9.98 9.98 0 0 0 3.1 7.45l3.4 2.6A5.8 5.8 0 0 1 12 6.1z" />
		</svg>
	)
}

export default GoogleIcon
