export const removeUndefined = (obj: Record<string, any>) => {
	for (const key in obj) {
		if (obj[key] === undefined) {
			delete obj[key];
		} else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
			removeUndefined(obj[key]);
			// If the object becomes empty after removing undefined properties, delete the key as well
			if (Object.keys(obj[key]).length === 0) {
				delete obj[key];
			}
		}
	}
	return obj;
};
