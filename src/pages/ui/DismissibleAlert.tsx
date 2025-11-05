'use client'

type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

interface DismissibleAlertProps {
	variant?: AlertVariant
	isBG?: boolean
	message?: string
	className?: string
	isVisible: boolean
	onclose: () => void
}

export default function DismissibleAlert({ isVisible, variant = 'primary', isBG = true, message, className = '', onclose }: DismissibleAlertProps) {
	if (!isVisible) return null

	const baseClass = isBG ? `border-0 text-white bg-${variant}` : `bg-${variant}/10 text-${variant} border border-${variant}/20`

	return (
		<div className={`${baseClass} rounded-md py-3 px-5 flex justify-between items-center ${className} fixed top-[50px] left-1/2 -translate-x-1/2 w-1/2 cursor-pointer z-[999]`} id="test-alert">
			<p>
				<span className="font-bold capitalize">{variant}</span> – {message || 'A simple alert — check it out!'}
			</p>
			<button className="text-xl/[0] hover:opacity-70" onClick={onclose}>
				<i className="ri-close-line text-xl"></i>
			</button>
		</div>
	)
}
