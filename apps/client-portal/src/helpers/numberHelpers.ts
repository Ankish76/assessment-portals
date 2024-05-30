export const currencyLocaleFormat = (el: number, minimumDigits = 0) => {
	return Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: minimumDigits,
	}).format(el);
};

export const numberLocaleFormat = (el: number, minimumDigits = 0) => {
	return Intl.NumberFormat("en-US", {
		currency: "USD",
		minimumFractionDigits: minimumDigits,
	}).format(el);
};
