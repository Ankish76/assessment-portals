"use client";
import { useRef } from "react";
import type { PreloadedStoreInterface, StoreType } from "./store";
import { initializeStore, Provider } from "./store";

const StoreProvider: React.FC<
	React.PropsWithChildren<PreloadedStoreInterface>
> = ({ children, ...props }) => {
	const storeRef = useRef<StoreType>();
	if (!storeRef.current) {
		storeRef.current = initializeStore(props);
	}
	return <Provider value={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
