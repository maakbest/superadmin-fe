import React from 'react'

type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

interface DrawerProps {
	open: boolean
	onClose: () => void
	side?: DrawerSide
	width?: string // custom width (for left/right)
	height?: string // custom height (for top/bottom)
	children: React.ReactNode
}

const Drawer: React.FC<DrawerProps> = ({
	open,
	onClose,
	side = 'right',
	width = '20rem', // default 320px (w-80)
	height = '16rem', // default 256px (h-64)
	children,
}) => {
	const sideClasses: Record<DrawerSide, string> = {
		right: 'right-0 top-0 h-full',
		left: 'left-0 top-0 h-full',
		top: 'top-0 left-0 w-full',
		bottom: 'bottom-0 left-0 w-full',
	}

	const hiddenTransform: Record<DrawerSide, string> = {
		right: 'translate-x-full',
		left: '-translate-x-full',
		top: '-translate-y-full',
		bottom: 'translate-y-full',
	}

	const showTransform: Record<DrawerSide, string> = {
		right: 'translate-x-0',
		left: 'translate-x-0',
		top: 'translate-y-0',
		bottom: 'translate-y-0',
	}

	return (
		<>
			{/* BACKDROP */}
			<div
				onClick={onClose}
				className={`
					fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-[900]
					${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
				`}
			/>

			{/* DRAWER PANEL */}
			<div
				className={`
					fixed bg-white shadow-2xl p-4 transition-transform duration-300 z-[999]
					${sideClasses[side]}
					${open ? showTransform[side] : hiddenTransform[side]}
				`}
				style={{
					width: side === 'left' || side === 'right' ? width : '100%',
					height: side === 'top' || side === 'bottom' ? height : '100%',
				}}
			>
				{children}
			</div>
		</>
	)
}

export default Drawer
