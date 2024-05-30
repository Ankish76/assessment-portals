import { TableHeader } from "@root/types";
import { RiskAssessmentType } from "./interfaces";

export const TableHeaders: TableHeader<RiskAssessmentType>[] = [
	{		
		label: "Category",	
	},
	{		
		label: "Risk Level",	
	},
	{		
		label: "Severity Level",	
	},

	{		
		label: "Priority Level",	
	},

	{		
		label: "Risk Descprition",	
	},

	{		
		label: "Mitigation",	
	},
	{		
		label: "Assessor Name",	
	},
	{		
		label: "Resolved By User",	
	},
	{		
		label: "Created Date",	
	},
];
