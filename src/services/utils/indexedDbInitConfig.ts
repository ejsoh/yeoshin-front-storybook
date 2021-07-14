import { AxiosResponse } from "axios";
import Dexie from "dexie";

type DbTypeItems = {
	id?: number;
	name: string;
	items?: AxiosResponse["data"];
};

type DbType = {
	skinMapEvents?: Dexie.Table<DbTypeItems, number>;
	mainEvents?: Dexie.Table<DbTypeItems, number>;
};

export const db = new Dexie("yeoshinDataStore");
db.version(1).stores({
	skinMapEvents: "++id,name,items",
	mainEvents: "++id,name,items",
}) as DbType;
