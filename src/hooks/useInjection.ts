import { RootStoreModel } from "../models/RootStore";
import { useStore } from "./useStore";

// 스토어와 mapping할 타입을 정의한다.
export type mapState<T> = (store: RootStoreModel) => T;

const useInjection = <T>(mapState: mapState<T>) => {
	const store = useStore();

	//  root store를 parameter에 실어서 리턴하여, 반환값을 훅을 불러올 컴포넌트에 주입한다.
	return mapState(store);
};

export default useInjection;
