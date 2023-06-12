import * as Realm from "realm-web";
import { NewEmployeeData } from "../types";

const app = new Realm.App({ id: 'hrnet-npxzf' });
const loginAnonymous = async () => {
	return await app.logIn(Realm.Credentials.anonymous());
};
const mongo = app.currentUser?.mongoClient("mongodb-atlas");
const dbName = mongo?.db("mock");
loginAnonymous()

export const collectionListAll = async (collectionName: string) => {
	const collection = dbName?.collection(collectionName);
	return await collection?.find({});
};

export const createDocument = async (
	collectionName: string,
	data: NewEmployeeData
) => {
	const collection = dbName?.collection(collectionName);
	await collection?.insertOne(data);
};
