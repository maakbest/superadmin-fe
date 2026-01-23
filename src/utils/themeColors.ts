/**
 * Theme-dependent color utilities
 * Returns colors based on the current layout theme (light/dark)
 */

export type ColorVariant = 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'muted' | 'text' | 'border' | 'bg'

export interface ThemeColors {
	text: {
		primary: string
		secondary: string
		muted: string
	}
	border: string
	background: {
		primary: string
		secondary: string
	}
	table: {
		headerBg: string
		rowBg: string
		rowHoverBg: string
		divider: string
	}
	variants: {
		success: string
		danger: string
		warning: string
		info: string
	}
}

export const lightThemeColors: ThemeColors = {
	text: {
		primary: 'text-gray-900',
		secondary: 'text-gray-700',
		muted: 'text-gray-600',
	},
	border: 'border-gray-200',
	background: {
		primary: 'bg-white',
		secondary: 'bg-gray-50',
	},
	table: {
		headerBg: 'bg-gray-50',
		rowBg: 'bg-white',
		rowHoverBg: 'hover:bg-gray-50',
		divider: 'divide-gray-200',
	},
	variants: {
		success: 'text-green-600',
		danger: 'text-red-600',
		warning: 'text-yellow-600',
		info: 'text-blue-600',
	},
}

export const darkThemeColors: ThemeColors = {
	text: {
		primary: 'text-gray-100',
		secondary: 'text-gray-300',
		muted: 'text-gray-400',
	},
	border: 'border-gray-700',
	background: {
		primary: 'bg-gray-900',
		secondary: 'bg-gray-800',
	},
	table: {
		headerBg: 'bg-gray-800',
		rowBg: 'bg-gray-900',
		rowHoverBg: 'hover:bg-gray-800',
		divider: 'divide-gray-700',
	},
	variants: {
		success: 'text-green-400',
		danger: 'text-red-400',
		warning: 'text-yellow-400',
		info: 'text-blue-400',
	},
}

/**
 * Get theme colors based on the current theme
 * @param theme - 'light' or 'dark'
 * @returns ThemeColors object
 */
export const getThemeColors = (theme: string): ThemeColors => {
	return theme === 'dark' ? darkThemeColors : lightThemeColors
}
