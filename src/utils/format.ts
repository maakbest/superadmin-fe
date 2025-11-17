export function formatUSD(value: string | number) {
	return `${Number(value).toLocaleString('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})}`
}
