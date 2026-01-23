export const currencySymbols: Record<string, string> = {
	INR: '₹',
	USD: '$',
	EUR: '€',
	GBP: '£',
	QAR: '﷼',
	AED: 'د.إ',
	SAR: '﷼',
}

export const getCurrencySymbol = (currency?: string) => {
	if (!currency) return ''
	return currencySymbols[currency.toUpperCase()] || currency
}

export const formatCurrency = (amount: number, currency: string, locale = 'en-IN') => {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		maximumFractionDigits: 2,
	}).format(amount)
}

const formatValue = (value: any): string => {
	if (value === null || value === undefined || value === '') return '—'
	if (Array.isArray(value)) return `${value.length} item(s)`
	if (typeof value === 'boolean') return value ? 'Yes' : 'No'
	return String(value)
}
