export interface Question {
	UniqueId: string;
	Question: string;
	ClientId: string;
}

export interface Selected {
	categoryId: string;
	categoryName: string;
	questions: {
		selected: Question[];
	};
}

export interface Added {
	category: string;
	questions: string[];
}

export interface FromValues {
	selected: Selected[];
	// added: Added[];
}
