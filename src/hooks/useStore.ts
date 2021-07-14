import { createContext, useContext } from "react";
import { RootStoreModel } from "../models/RootStore";

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

// context object를 받아 context의 현재값을 반환
export const useStore = () => {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error("this value is undefined");
	}
	return context;
};

// provider로 반환 된 값을 보낸다.
export const StoreProvider = StoreContext.Provider;
