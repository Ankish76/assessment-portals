"use client";
import StoreProvider from "@lib/zustand/Provider";
import { PreloadedStoreInterface } from "@lib/zustand/store";

const PageWrapper: React.FC<
	React.PropsWithChildren<PreloadedStoreInterface>
> = ({ children, ...props }) => {
	return <StoreProvider {...props}>{children}</StoreProvider>;
};

export default PageWrapper;
