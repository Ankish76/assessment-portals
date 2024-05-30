import { IconType } from "react-icons/lib";

export type SideNav = {
	icon: IconType;
	label: string;
	target?: string;
	link?: `http${string}`;
};
export type SideNavConfig = {
	title: string;
	items: SideNav[];
};

export type ParamValue<T = Record<string, any>> = {
	Param: keyof T;
	Value: T[keyof T];
};

export type TableHeader<T = Record<string, any>> = {
	className: string;
	label: string;
	selector?: keyof T;
	sort?: boolean;
};

export type Page<
	P = {},
	S = { [key: string]: string | string[] | undefined },
> = React.FC<{
	params: P;
	searchParams: S;
}>;
