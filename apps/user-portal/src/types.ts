export type Page<
	P = {},
	S = { [key: string]: string | string[] | undefined },
> = React.FC<{
	params: P;
	searchParams: S;
}>;

export type TableHeader<T = Record<string, any>> = {
	className?: string;
	label: string;
	selector?: keyof T;
	sort?: boolean;
};